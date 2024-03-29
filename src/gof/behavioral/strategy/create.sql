drop schema design_patterns cascade;
create schema design_patterns;

create table design_patterns.parking_ticket (
	plate text,
	checkin_date timestamp,
	checkout_date timestamp,
	fare numeric,
	location text
);
