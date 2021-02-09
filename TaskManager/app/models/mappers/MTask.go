package mappers

import (
	"task_manager/app/models/entities"
	"database/sql"

	"github.com/revel/revel"
)

// TaskDBType тип сущности "задача" бд
type TaskDBType struct {
	Pk_id        int64   // идентификатор
	Fk_status    int64   // статус задачи
	Fk_progect   int64   // проект
	Fk_employee  *int64   // сотрудник
	C_name       string  // название задачи
	C_description *string //описание задачи
	C_sch_hours  *float32 // автор
	C_fact_hours *float32 // издательство
}

// ToType функция преобразования типа бд к типу сущности
func (dbt *TaskDBType) ToType() (b *entities.Task, err error) {
	b = new(entities.Task)

	b.ID = dbt.Pk_id
	b.Name = dbt.C_name
	b.Description=dbt.C_description
	b.Sch_hours = dbt.C_sch_hours
	b.Fact_hours = dbt.C_fact_hours
	b.Fk_employee=dbt.Fk_employee
	return
}

// FromType функция преобразования типа сущности к типу бд
// допускается, что dbt is nil
func (_ *TaskDBType) FromType(b entities.Task) (dbt *TaskDBType, err error) {
	dbt = &TaskDBType{
		Pk_id:          b.ID,
		C_name:         b.Name,
		C_description:  b.Description,
		C_sch_hours:    b.Sch_hours,
		C_fact_hours:   b.Fact_hours,
		Fk_employee:    b.Fk_employee,
		Fk_progect:     b.FK_progect,
	}

	return
}

// MTask маппер задач
type MTask struct {
	db *sql.DB
}

// Init инициализация
func (m *MTask) Init(db *sql.DB) {
	m.db = db
}

// SelectAllByProgectID получение всех задач проекта
func (m *MTask) SelectAllByProgectID(id int64) (bs []*TaskDBType, err error) {
	var (
		query string    // строка запроса
		rows  *sql.Rows // выборка данных
	)

	// запрос
	query = `
		SELECT 
			pk_id,
			fk_status,
			fk_employee,
			c_name,
			c_description,
			c_sch_hours,
			c_fact_hours
		FROM task_manager.t_tasks
		WHERE fk_progect=$1 and fk_status!=7 and is_archive=0
		ORDER BY pk_id;
	`

	// выполнение запроса
	rows, err = m.db.Query(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MTask.SelectAll : m.db.query, %s\n", err)
		return
	}

	// обработка строк выборки
	for rows.Next() {
		// создание экземпляра сущности для считывания строки выборки
		b := new(TaskDBType)

		// считывание строки выборки
		err = rows.Scan(&b.Pk_id, &b.Fk_status, &b.Fk_employee, &b.C_name,&b.C_description, &b.C_sch_hours, &b.C_fact_hours)
		if err != nil {
			revel.AppLog.Errorf("MTask.SelectAll : rows.Scan, %s\n", err)
			continue
		}

		// добавление сущности в массив
		bs = append(bs, b)
	}

	return
}
// SelectAllByProgectID получение всех задач проекта
func (m *MTask) SelectAllCompletedlTasksByProgectID(id int64) (bs []*TaskDBType, err error) {
	var (
		query string    // строка запроса
		rows  *sql.Rows // выборка данных
	)

	// запрос
	query = `
		SELECT 
			pk_id,
			fk_status,
			fk_employee,
			c_name,
			c_description,
			c_sch_hours,
			c_fact_hours
		FROM task_manager.t_tasks
		WHERE fk_progect=$1 and fk_status=7 and is_archive=0
		ORDER BY pk_id;
	`

	// выполнение запроса
	rows, err = m.db.Query(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MTask.SelectAll : m.db.query, %s\n", err)
		return
	}

	// обработка строк выборки
	for rows.Next() {
		// создание экземпляра сущности для считывания строки выборки
		b := new(TaskDBType)

		// считывание строки выборки
		err = rows.Scan(&b.Pk_id, &b.Fk_status, &b.Fk_employee, &b.C_name,&b.C_description, &b.C_sch_hours, &b.C_fact_hours)
		if err != nil {
			revel.AppLog.Errorf("MTask.SelectAll : rows.Scan, %s\n", err)
			continue
		}

		// добавление сущности в массив
		bs = append(bs, b)
	}

	return
}

func (m *MTask) SelectAllByEmployeeID(id int64) (bs []*TaskDBType, err error) {
	var (
		query string    // строка запроса
		rows  *sql.Rows // выборка данных
	)

	// запрос
	query = `
		SELECT 
			pk_id,
			fk_status,
			fk_employee,
			c_name,
			c_description,
			c_sch_hours,
			c_fact_hours
		FROM task_manager.t_tasks
		WHERE fk_employee=$1 and is_archive=0 and fk_status!=7
		ORDER BY pk_id;
	`

	// выполнение запроса
	rows, err = m.db.Query(query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MTask.SelectAllByEmployeeID : m.db.query, %s\n", err)
		return
	}

	// обработка строк выборки
	for rows.Next() {
		// создание экземпляра сущности для считывания строки выборки
		b := new(TaskDBType)

		// считывание строки выборки
		err = rows.Scan(&b.Pk_id, &b.Fk_status, &b.Fk_employee, &b.C_name,&b.C_description, &b.C_sch_hours, &b.C_fact_hours)
		if err != nil {
			revel.AppLog.Errorf("MTask.SelectAllByEmployeeID : rows.Scan, %s\n", err)
			continue
		}

		// добавление сущности в массив
		bs = append(bs, b)
	}

	return
}

// SelectByID получение задачи по ID
func (m *MTask) SelectByID(id int64) (b *TaskDBType, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)
	b = new(TaskDBType)

	// запрос
	query = `
		SELECT 
			pk_id,
			fk_status,
			fk_employee,
			c_name,
			c_description,
			c_sch_hours,
			c_fact_hours
		FROM task_manager.t_tasks
		WHERE pk_id = $1 
		ORDER BY pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, id)

	// считывание строки выборки
	err = row.Scan(&b.Pk_id, &b.Fk_status, &b.Fk_employee, &b.C_name,&b.C_description, &b.C_sch_hours, &b.C_fact_hours)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MTask.SelectByID : row.Scan, %s\n", err)
		return
	}

	return
}

// Insert добавление задачи
func (m *MTask) Insert(Task *TaskDBType) (id int64, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)

	revel.AppLog.Debugf("MTask.Insert, Task: %+v\n", Task)
	// запрос
	query = `
		INSERT INTO task_manager.t_tasks(
			fk_status,
			fk_progect,
			fk_employee,
			c_name,
			c_description,
			c_sch_hours,
			c_fact_hours,
			is_archive
		)
		values(
			$1,	-- fk_status
			$2,	-- fk_progect
			$3,	-- fk_employee
			$4,	-- c_name
			$5,  -- c_description
			$6,	-- c_sch_hours
			$7,	-- c_fact_hours
			0
		)
		returning pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, Task.Fk_status, Task.Fk_progect, Task.Fk_employee, Task.C_name, Task.C_description, Task.C_sch_hours, Task.C_fact_hours)

	// считывание id
	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MTask.Insert : row.Scan, %s\n", err)
		return
	}

	return
}

// Update изменение задачи
func (m *MTask) Update(Task *TaskDBType) (err error) {
	var (
		query string // строка запроса
	)

	revel.AppLog.Debugf("MTask.Update, Task: %+v\n", Task)

	// запрос
	query = `
		UPDATE "task_manager".t_tasks
			SET 
			fk_status = $2,
			fk_progect = $3,
			fk_employee = $4,
			c_name = $5,
			c_description = $6,
			c_sch_hours = $7,
			c_fact_hours = $8
		WHERE pk_id = $1;
	`

	// выполнение запроса
	_, err = m.db.Exec(query, Task.Pk_id, Task.Fk_status, Task.Fk_progect, Task.Fk_employee, Task.C_name,Task.C_description, Task.C_sch_hours, Task.C_fact_hours)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}
		
		revel.AppLog.Errorf("MTask.Update : m.db.Exec, %s\n", err)
		return
	}

	return
}

// Delete удаление задачи
func (m *MTask) Delete(Task *TaskDBType) (err error) {
	var (
		query string // строка запроса
	)
	revel.AppLog.Debugf("MTask.Delete, Task: %+v\n", Task)


	// запрос
	query = `
	UPDATE "task_manager".t_tasks
	SET 
	is_archive=1
	WHERE pk_id = $1;
	`

	// выполнение запроса
	_, err = m.db.Exec(query, Task.Pk_id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MTask.Delete : m.db.Exec, %s\n", err)
		return
	}

	return
}
