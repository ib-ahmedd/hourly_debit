# SQL Table Creations.

* Customers Table:
    * create table public.customers (
    id uuid not null default gen_random_uuid (),
  user_id uuid not null default gen_random_uuid (),
  name text not null,
  balance double precision not null default '10000'::double precision,
  hourly_debit_amount double precision not null default '10'::double precision,
  last_debited_at timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
  constraint customers_pkey primary key (id),
  constraint customers_user_id_fkey1 foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;

* Debit_logs Table:
    * create table public.debit_logs (
  id uuid not null default gen_random_uuid (),
  customer_id uuid not null default gen_random_uuid (),
  status public.status not null,
  amount double precision not null,
  created_at timestamp without time zone not null default (now() AT TIME ZONE 'utc'::text),
  constraint debit_logs_pkey primary key (id)
) TABLESPACE pg_default; 

* Hourly cron job:
     * create table cron.job (
  jobid bigint not null default nextval('cron.jobid_seq'::regclass),
  schedule text not null,
  command text not null,
  nodename text not null default 'localhost'::text,
  nodeport integer not null default inet_server_port(),
  database text not null default current_database(),
  username text not null default CURRENT_USER,
  active boolean not null default true,
  jobname text null,
  constraint job_pkey primary key (jobid),
  constraint jobname_username_uniq unique (jobname, username)
) TABLESPACE pg_default;

   * create trigger cron_job_cache_invalidate
after INSERT
or DELETE
or
update
or
truncate on cron.job for EACH STATEMENT
execute FUNCTION cron.job_cache_invalidate ();
