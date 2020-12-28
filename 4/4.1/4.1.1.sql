CREATE DATABASE "database"
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'



	CREATE SCHEMA partition
	AUTHORIZATION postgres;	

	CREATE TABLE partition.t_employees 
	(
    pk_id           serial NOT NULL,
    c_lastname      varchar NOT NULL,           
    c_firstname     varchar NOT NULL,            
    c_midlename		varchar,
	c_salary 		money NOT NULL,
	c_email 		varchar,
	c_position		varchar NOT NULL,
		PRIMARY KEY (pk_id)
);

CREATE TABLE partition.t_clients  (
    pk_id           serial NOT NULL,
    c_lastname      varchar NOT NULL,           
    c_firstname     varchar NOT NULL,            
    c_midlename		varchar,
	c_email 		varchar,
	PRIMARY KEY (pk_id)
);

	
CREATE SCHEMA auth
	AUTHORIZATION postgres;	
	
	CREATE TABLE auth.t_users  (
    pk_id           serial NOT NULL,
    c_login     varchar NOT NULL,           
    c_password     bytea NOT NULL,            
	c_last_in 		timestamp,
	PRIMARY KEY (pk_id)
);
