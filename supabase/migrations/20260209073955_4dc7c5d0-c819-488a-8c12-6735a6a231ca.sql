
-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create owner replies table
CREATE TABLE public.owner_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE UNIQUE,
  reply TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.owner_replies ENABLE ROW LEVEL SECURITY;

-- Reviews: anyone can read
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

-- Reviews: anyone can insert (public form)
CREATE POLICY "Anyone can submit a review"
  ON public.reviews FOR INSERT
  WITH CHECK (true);

-- Owner replies: anyone can read
CREATE POLICY "Anyone can view owner replies"
  ON public.owner_replies FOR SELECT
  USING (true);

-- Owner replies: only authenticated owner can insert
CREATE POLICY "Owner can insert replies"
  ON public.owner_replies FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Owner replies: only authenticated owner can update
CREATE POLICY "Owner can update replies"
  ON public.owner_replies FOR UPDATE
  TO authenticated
  USING (true);

-- Trigger for updated_at on owner_replies
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_owner_replies_updated_at
  BEFORE UPDATE ON public.owner_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for reviews
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.owner_replies;
