-- Run once only if contact_inquiries was created with the earlier schema.
ALTER TABLE contact_inquiries DROP COLUMN service_interested_in;
