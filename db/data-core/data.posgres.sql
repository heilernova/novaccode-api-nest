-- Base de datos para el registro de datos de los usuarios con acceso
-- Author: Johan Heile Nova Cardenas

-- Personas

drop type if exists sex cascade;
create type sex as enum('M', 'F');

drop table if exists "tb_persons_dni_types";
create table "tb_persons_dni_types"
(
	"id" varchar(6) primary key,
	"name" varchar(50) not null unique
);
insert into "tb_persons_dni_types" values('CC', 'Cédula de ciudadanía');

drop table if exists "tb_persons";
create table "tb_persons"
(
	"id" uuid primary key default gen_random_uuid(),
    "dni" varchar(15) not null,
	"dni_type" varchar(6) not null default 'CC' references "tb_persons_dni_types"("id"),
    "name" varchar(50) not null,
    "last_name" varchar(50) not null,
    "sex" sex not null,
    "birthdate" date,
    "birth_place" varchar(100) default null,
	"expedition_date" date default null,
	"expedition_place" varchar(100) default null
);

drop view if exists "vi_persons";
create view "vi_persons" as
select
id,
dni,
name,
last_name,
sex,
birthdate,
date_part('year', age(now(), birthdate))::int as age,
birth_place,
expedition_date,
expedition_place
from "tb_persons";

-- Locaciones de Colombia

-- Departamentos
drop table if exists "tb_locations_departaments" cascade;
create table "tb_locations_departaments"
(
	"code" char(2) primary key,
	"name" varchar(80) not null
);
create index "uni_name" on "tb_locations_departaments"("code");

-- Ciudades
drop table if exists "tb_locations_cities" cascade;
create table "tb_locations_cities"
(
	"code" char(5) primary key,
	"departament" char(2) not null references "tb_locations_departaments"("code"),
	"name" varchar(80) not null
);

drop type if exists neighborhoods_and_sidewalks cascade;
create type neighborhoods_and_sidewalks as enum('B', 'V');

drop table if exists "tb_locations_neighborhoods_and_sidewalks";
create table "tb_locations_neighborhoods_and_sidewalks"
(
	"id" uuid primary key,
	"city" char(5) not null references "tb_locations_cities"("code"),
	"type" neighborhoods_and_sidewalks,
	"name" varchar(100)
);