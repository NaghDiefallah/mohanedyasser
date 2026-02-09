-- Fix rating column type to support half-star values
ALTER TABLE public.reviews ALTER COLUMN rating TYPE numeric USING rating::numeric;

-- Recreate functions with numeric type
DROP FUNCTION IF EXISTS public.get_public_reviews();
CREATE OR REPLACE FUNCTION public.get_public_reviews()
RETURNS TABLE(id uuid, name text, rating numeric, comment text, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT id, name, rating, comment, created_at
  FROM public.reviews
  ORDER BY created_at DESC
$$;

DROP FUNCTION IF EXISTS public.get_review_ratings();
CREATE OR REPLACE FUNCTION public.get_review_ratings()
RETURNS TABLE(rating numeric)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT rating FROM public.reviews
$$;

DROP FUNCTION IF EXISTS public.update_review(uuid, text, text, numeric, text);
DROP FUNCTION IF EXISTS public.update_review(uuid, text, text, integer, text);
CREATE OR REPLACE FUNCTION public.update_review(p_review_id uuid, p_delete_token text, p_name text, p_rating numeric, p_comment text)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.reviews
  SET name = p_name, rating = p_rating, comment = p_comment
  WHERE id = p_review_id AND delete_token = p_delete_token;
  RETURN FOUND;
END;
$$;

-- Update validation trigger to allow 0.5 increments
CREATE OR REPLACE FUNCTION public.validate_review()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public'
AS $$
BEGIN
  NEW.name := trim(NEW.name);
  IF length(NEW.name) = 0 THEN RAISE EXCEPTION 'Review name cannot be empty'; END IF;
  IF length(NEW.name) > 100 THEN RAISE EXCEPTION 'Review name too long (max 100 characters)'; END IF;
  NEW.comment := trim(NEW.comment);
  IF length(NEW.comment) = 0 THEN RAISE EXCEPTION 'Review comment cannot be empty'; END IF;
  IF length(NEW.comment) > 2000 THEN RAISE EXCEPTION 'Review comment too long (max 2000 characters)'; END IF;
  IF NEW.rating < 0.5 OR NEW.rating > 5 THEN RAISE EXCEPTION 'Rating must be between 0.5 and 5'; END IF;
  IF (NEW.rating * 2) != floor(NEW.rating * 2) THEN RAISE EXCEPTION 'Rating must be in 0.5 increments'; END IF;
  RETURN NEW;
END;
$$;