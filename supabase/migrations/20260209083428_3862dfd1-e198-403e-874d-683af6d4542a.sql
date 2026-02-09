
-- Drop functions that need return type changes
DROP FUNCTION IF EXISTS public.get_public_reviews();
DROP FUNCTION IF EXISTS public.get_review_ratings();
DROP FUNCTION IF EXISTS public.update_review(uuid, text, text, integer, text);

-- Recreate get_public_reviews with numeric rating
CREATE OR REPLACE FUNCTION public.get_public_reviews()
RETURNS TABLE(id uuid, name text, rating numeric, comment text, created_at timestamp with time zone)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT id, name, rating, comment, created_at
  FROM public.reviews
  ORDER BY created_at DESC
$$;

-- Recreate get_review_ratings with numeric rating
CREATE OR REPLACE FUNCTION public.get_review_ratings()
RETURNS TABLE(rating numeric)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT rating FROM public.reviews
$$;

-- Recreate update_review with numeric rating
CREATE OR REPLACE FUNCTION public.update_review(
  p_review_id uuid,
  p_delete_token text,
  p_name text,
  p_rating numeric,
  p_comment text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.reviews
  SET name = p_name, rating = p_rating, comment = p_comment
  WHERE id = p_review_id AND delete_token = p_delete_token;
  RETURN FOUND;
END;
$$;
