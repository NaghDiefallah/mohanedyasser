
-- Bootstrap function: auto-assigns admin to the first authenticated user
-- Can only be called once (returns false if admin already exists)
CREATE OR REPLACE FUNCTION public.bootstrap_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only works if no admin exists yet
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN false;
  END IF;
  
  -- Assign the currently authenticated user as admin
  IF auth.uid() IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin');
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;
