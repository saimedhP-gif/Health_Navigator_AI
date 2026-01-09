-- Remove overly permissive storage policies for prescriptions bucket
-- The application processes images in-memory via Edge Functions, storage bucket is unused
-- These policies allow anyone to upload/read which is a security risk

DROP POLICY IF EXISTS "Anyone can upload prescriptions" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read prescriptions" ON storage.objects;

-- Delete the unused bucket (if empty)
DELETE FROM storage.buckets WHERE id = 'prescriptions';