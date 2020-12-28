ALTER TABLE partition.t_employees ADD COLUMN  fk_position int REfERENCES ref_postiions

CREATE TABLE partition.ref_postiions 
	(
    pk_id           serial NOT NULL,
	c_name		varchar NOT NULL,
		PRIMARY KEY (pk_id)
);

 UPDATE partition.t_employees SET t_employees.c_position=ref_postiions.c_name WHERE t_employees.pk_id = ref_postiions.pk_id;