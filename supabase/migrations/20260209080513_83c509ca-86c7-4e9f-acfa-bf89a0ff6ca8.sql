
-- =============================================
-- SECURITY FIX: Reviews & Replies System
-- =============================================

-- 1. ADMIN ROLE SYSTEM
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
$$;

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. OWNER REPLIES: SERVER-SIDE OWNERSHIP + ADMIN-ONLY CRUD
ALTER TABLE public.owner_replies ADD COLUMN owner_user_id uuid REFERENCES auth.users(id);

CREATE OR REPLACE FUNCTION public.set_reply_owner()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.owner_user_id := auth.uid();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_reply_owner_on_insert
BEFORE INSERT ON public.owner_replies
FOR EACH ROW EXECUTE FUNCTION public.set_reply_owner();

CREATE TRIGGER preserve_reply_owner_on_update
BEFORE UPDATE ON public.owner_replies
FOR EACH ROW EXECUTE FUNCTION public.set_reply_owner();

-- Drop ALL old insecure policies
DROP POLICY IF EXISTS "Anyone can view owner replies" ON public.owner_replies;
DROP POLICY IF EXISTS "Owner can insert replies" ON public.owner_replies;
DROP POLICY IF EXISTS "Owner can update replies" ON public.owner_replies;

-- New secure policies: public read, admin-only write
CREATE POLICY "Public can read replies"
ON public.owner_replies FOR SELECT
USING (true);

CREATE POLICY "Admin can insert replies"
ON public.owner_replies FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update replies"
ON public.owner_replies FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete replies"
ON public.owner_replies FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. REVIEWS: DROP EMAIL, ADD VALIDATION, ADD ADMIN DELETE
ALTER TABLE public.reviews DROP COLUMN IF EXISTS email;

DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can submit a review" ON public.reviews;

CREATE POLICY "Anyone can view reviews"
ON public.reviews FOR SELECT
USING (true);

CREATE POLICY "Anyone can submit a review"
ON public.reviews FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin can delete reviews"
ON public.reviews FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. SERVER-SIDE INPUT VALIDATION
CREATE OR REPLACE FUNCTION public.validate_review()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.name := trim(NEW.name);
  IF length(NEW.name) = 0 THEN
    RAISE EXCEPTION 'Review name cannot be empty';
  END IF;
  IF length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Review name too long (max 100 characters)';
  END IF;

  NEW.comment := trim(NEW.comment);
  IF length(NEW.comment) = 0 THEN
    RAISE EXCEPTION 'Review comment cannot be empty';
  END IF;
  IF length(NEW.comment) > 2000 THEN
    RAISE EXCEPTION 'Review comment too long (max 2000 characters)';
  END IF;

  IF NEW.rating < 1 OR NEW.rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_review_before_insert
BEFORE INSERT ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.validate_review();

-- 5. BOOTSTRAP: Grant admin role to first registered user
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
ORDER BY created_at ASC
LIMIT 1
ON CONFLICT DO NOTHING;
