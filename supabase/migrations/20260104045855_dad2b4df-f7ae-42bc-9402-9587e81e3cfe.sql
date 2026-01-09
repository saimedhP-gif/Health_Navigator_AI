-- Create bookmarked_leaves table
CREATE TABLE public.bookmarked_leaves (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    leaf_id text NOT NULL,
    leaf_name text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, leaf_id)
);

-- Enable Row Level Security
ALTER TABLE public.bookmarked_leaves ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own bookmarked leaves"
ON public.bookmarked_leaves
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarked leaves"
ON public.bookmarked_leaves
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarked leaves"
ON public.bookmarked_leaves
FOR DELETE
USING (auth.uid() = user_id);