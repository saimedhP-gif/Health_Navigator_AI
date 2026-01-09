-- Drop existing policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Recreate with both USING and WITH CHECK clauses
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);