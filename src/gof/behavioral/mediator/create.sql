drop schema design_patterns cascade;
create schema design_patterns;

create table design_patterns.grade (
	student_id integer,
	exam text,
	value numeric
);

create table design_patterns.average (
	student_id integer,
	value numeric
);
