INSERT INTO partition.ref_postiions (c_name)  SELECT DISTINCT t_employees.c_position FROM partition.t_employees