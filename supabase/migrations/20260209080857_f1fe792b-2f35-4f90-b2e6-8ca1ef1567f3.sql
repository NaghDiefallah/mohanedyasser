
-- Fix: Hide delete_token from public queries
-- Create SECURITY DEFINER functions for public access (bypasses RLS safely)

CREATE OR REPLACE FUNCTION public.get_public_reviews()
RETURNS TABLE(id uuid, name text, rating integer, comment text, created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name, rating, comment, created_at
  FROM public.reviews
  ORDER BY created_at DESC
$$;

CREATE OR REPLACE FUNCTION public.get_review_ratings()
RETURNS TABLE(rating integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT rating FROM public.reviews
$$;

-- Restrict direct SELECT to admin only (hides delete_token from public API)
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;

CREATE POLICY "Admin can view all reviews"
ON public.reviews FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
