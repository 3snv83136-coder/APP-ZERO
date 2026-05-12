-- =====================================================================
-- APP-ZERO — Schéma Supabase (modèle vierge)
-- À exécuter dans : Supabase Dashboard → SQL Editor → New query → Run
-- =====================================================================

-- Extensions utiles
create extension if not exists "pgcrypto";

-- =====================================================================
-- CLIENTS
-- =====================================================================
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text,
  telephone text,
  adresse text,
  code_postal text,
  ville text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists clients_nom_idx on clients (nom);
create index if not exists clients_email_idx on clients (email);

-- =====================================================================
-- INTERVENTIONS (ou toute autre table métier — adaptez selon vos besoins)
-- =====================================================================
create table if not exists interventions (
  id uuid primary key default gen_random_uuid(),
  reference text unique,
  client_id uuid references clients(id) on delete set null,
  type text,
  description text,
  adresse text,
  ville text,
  code_postal text,
  date_prevue date,
  date_realisee date,
  statut text not null default 'planifiee'
    check (statut in ('planifiee','en_cours','terminee','annulee')),
  prix numeric,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists interventions_date_idx on interventions (date_prevue);
create index if not exists interventions_statut_idx on interventions (statut);
create index if not exists interventions_client_idx on interventions (client_id);

-- =====================================================================
-- TRIGGERS — updated_at auto
-- =====================================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists clients_set_updated_at on clients;
create trigger clients_set_updated_at before update on clients
  for each row execute function set_updated_at();

drop trigger if exists interventions_set_updated_at on interventions;
create trigger interventions_set_updated_at before update on interventions
  for each row execute function set_updated_at();

-- =====================================================================
-- RLS — désactivé (l'app utilise la service role key côté serveur uniquement)
-- =====================================================================
alter table clients       disable row level security;
alter table interventions disable row level security;
