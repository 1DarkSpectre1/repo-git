(SELECT  t_employees.c_firstname `Имя сотрудника`,t_employees.c_lastname `Фамилия сотрудника`,t_employees.c_midlename `Отчество сотрудника`,t_employees.c_email `Почта`
FROM partition.t_employees)
UNION
(SELECT  t_clients.c_firstname `Имя сотрудника`,t_clients.c_lastname `Фамилия сотрудника`,t_clients.c_midlename `Отчество сотрудника`,t_clients.c_email `Почта`
FROM partition.t_clients)