-- Allow public uploads to prognose-documents bucket
create policy "Allow public upload to prognose-documents"
on storage.objects
for insert
to public
with check (bucket_id = 'prognose-documents');