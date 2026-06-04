-- S-Tier Business Group — clients table (CRM)
-- Run this in the Supabase SQL Editor for the `stier` project.
-- Safe to re-run: table creation is idempotent; seed only inserts if empty.

create table if not exists public.clients (
  id               uuid primary key default gen_random_uuid(),
  business         text not null,
  location         text,
  status           text not null default 'lead'
                     check (status in ('lead','closing','onboarding','active','paused')),
  plan             text not null default 'TBD'
                     check (plan in ('Foundational','Growth','Custom','TBD')),
  mrr              integer,            -- monthly recurring, whole dollars; null if unknown
  onboarding_stage text,
  start_date       date,               -- null until the engagement starts
  contact_name     text,
  contact_email    text,
  equity_intent    text,               -- private notes on any equity conversation
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Row-level security. The dashboard reads server-side via the service_role key
-- (which bypasses RLS), but we enable it as defense-in-depth and allow the
-- authenticated owner full access for any future client-side use.
alter table public.clients enable row level security;

drop policy if exists "authenticated full access" on public.clients;
create policy "authenticated full access" on public.clients
  for all to authenticated using (true) with check (true);

-- Seed the current book of business (only when the table is empty).
insert into public.clients (business, location, status, plan, mrr, onboarding_stage, start_date)
select * from (values
  ('The Porch Kitchen',      'Sebastopol, CA',  'onboarding', 'Foundational', 250,  'Closing',         date '2026-06-02'),
  ('Rosso Brewing Co.',      'Santa Rosa, CA',  'lead',       'TBD',          null, 'Discovery call',  null::date),
  ('Healdsburg Running Co.', 'Healdsburg, CA',  'closing',    'Foundational', 250,  'Proposal sent',   null::date),
  ('Valley Ford Cheese',     'Valley Ford, CA', 'lead',       'TBD',          null, 'Initial contact', null::date)
) as seed(business, location, status, plan, mrr, onboarding_stage, start_date)
where not exists (select 1 from public.clients);
