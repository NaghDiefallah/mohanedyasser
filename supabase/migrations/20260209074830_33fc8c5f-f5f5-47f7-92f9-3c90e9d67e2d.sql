
-- Add delete_token column to reviews
ALTER TABLE public.reviews ADD COLUMN delete_token TEXT;

-- Create a secure function to delete a review by matching its token
CREATE OR REPLACE FUNCTION public.delete_review(p_review_id UUID, p_delete_token TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.reviews
  WHERE id = p_review_id AND delete_token = p_delete_token;
  RETURN FOUND;
END;
$$;
