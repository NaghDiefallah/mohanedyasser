
-- Create a function to update a review using the delete_token for ownership verification
CREATE OR REPLACE FUNCTION public.update_review(
  p_review_id uuid,
  p_delete_token text,
  p_name text,
  p_rating integer,
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
