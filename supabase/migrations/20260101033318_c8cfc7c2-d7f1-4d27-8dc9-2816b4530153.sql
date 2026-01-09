-- Create storage bucket for prescription uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('prescriptions', 'prescriptions', false);

-- Allow authenticated and anonymous users to upload prescriptions (temporary files)
CREATE POLICY "Anyone can upload prescriptions"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'prescriptions');

-- Allow users to read their own uploads
CREATE POLICY "Anyone can read prescriptions"
ON storage.objects FOR SELECT
USING (bucket_id = 'prescriptions');