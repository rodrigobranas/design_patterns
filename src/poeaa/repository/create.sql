drop schema design_patterns cascade;

create schema design_patterns;

create table design_patterns.user (
	name text,
	email text,
	password text,
	status text
);
