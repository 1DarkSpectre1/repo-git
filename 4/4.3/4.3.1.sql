SELECT t_employees.c_firstname `Имя сотрудника`,t_employees.c_lastname `Фамилия сотрудника`,t_employees.c_midlename `Отчество сотрудника`,ref_postiions.c_name `Должность`
FROM t_employees LEFT JOIN ref_postiions ON t_employees.fk_position=ref_postiions.pk_id