-- S-Tier — tenant columns on clients + RLS hardening
-- Run in the `stier` Supabase SQL Editor. Safe to re-run.

-- Routing/identity columns: subdomain is the routing key; brain_user_id links
-- the CRM client to their agent identity in the brain; site_published gates
-- whether their public subdomain renders.
alter table public.clients
  add column if not exists subdomain      text unique,
  add column if not exists brain_user_id  uuid,
  add column if not exists site_published boolean not null default false;

-- Map The Porch Kitchen to its subdomain and publish its site.
update public.clients
  set subdomain = 'porchkitchen', site_published = true
  where business = 'The Porch Kitchen';

-- Security (the reviewer's flag): clients holds Chris's whole book of business.
-- Remove the open "authenticated" policy so that if a customer ever gets an auth
-- account on THIS project they cannot read it. The dashboard reads via the
-- service_role admin client (bypasses RLS), so it is unaffected.
drop policy if exists "authenticated full access" on public.clients;
-- RLS remains enabled with no permissive policy => only service_role has access.
