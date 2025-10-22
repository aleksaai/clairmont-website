-- Storage Bucket für Prognose-Dokumente (permanente Speicherung)
insert into storage.buckets (id, name, public)
values ('prognose-documents', 'prognose-documents', false);

-- RLS Policy: Service Role hat vollen Zugriff
create policy "Service role can do anything"
on storage.objects for all
to service_role
using (bucket_id = 'prognose-documents');