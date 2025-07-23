-- Create storage bucket for CVs
INSERT INTO storage.buckets (id, name, public) VALUES ('cvs', 'cvs', true);

-- Create storage policies for CV uploads
CREATE POLICY "CV files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cvs');

CREATE POLICY "Admin can upload CV files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cvs' AND EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Admin can update CV files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cvs' AND EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Admin can delete CV files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'cvs' AND EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Add CV URL to contact_info table
ALTER TABLE contact_info ADD COLUMN cv_url text;