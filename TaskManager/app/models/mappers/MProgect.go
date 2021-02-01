package mappers

import (
	"task_manager/app/models/entities"
	"database/sql"

	"github.com/revel/revel"
)

// ProgectDBType тип сущности "сотрудник" бд
type ProgectDBType struct {
	Pk_id         int64  // идентификатор
	Fk_employee    int64  // FK на сотрудника
	C_name        string // Название
	C_description string // Описание
}

// ToType функция преобразования типа бд к типу сущности
func (dbt *ProgectDBType) ToType() (e *entities.Progect, err error) {
	e = new(entities.Progect)
	e.Fk_employee=dbt.Fk_employee 
	e.ID = dbt.Pk_id
	e.Name = dbt.C_name
	e.Description = dbt.C_description
	return
}

// FromType функция преобразования типа сущности к типу бд
// допускается, что dbt is nil
func (_ *ProgectDBType) FromType(e entities.Progect) (dbt *ProgectDBType, err error) {
	dbt = &ProgectDBType{
		Pk_id:         e.ID,
		Fk_employee:   e.Fk_employee,
		C_name:        e.Name,
		C_description: e.Description,
	}

	return
}

// MProgect маппер сотрудников
type MProgect struct {
	db *sql.DB
}

// Init
func (m *MProgect) Init(db *sql.DB) {
	m.db = db
}

// SelectAll получение всех сотрудников
func (m *MProgect) SelectAll() (es []*ProgectDBType, err error) {
	var (
		query string    // строка запроса
		rows  *sql.Rows // выборка данных
	)

	// запрос
	query = `
		SELECT
			pk_id,
			fk_employee,
			c_name,
			c_description		
		FROM "task_manager".t_progects
		ORDER BY pk_id;
	`

	// выполнение запроса
	rows, err = m.db.Query(query)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MProgect.SelectAll : m.db.query, %s\n", err)
		return
	}

	// обработка строк выборки
	for rows.Next() {
		// создание экземпляра сущности для считывания строки выборки
		e := new(ProgectDBType)

		// считывание строки выборки
		err = rows.Scan(
			&e.Pk_id,          
			&e.Fk_employee,   
			&e.C_name,    
			&e.C_description,     
			)
		if err != nil {
			revel.AppLog.Errorf("MProgect.SelectAll : rows.Scan, %s\n", err)
			continue
		}

		// добавление сущности в массив
		es = append(es, e)
	}

	return
}

// SelectByID получение сотрудника по ID
func (m *MProgect) SelectByID(id int64) (e *ProgectDBType, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)

	e = new(ProgectDBType)

	// запрос
	query = `	
	SELECT
		pk_id,
		fk_employee,
		c_name,
		c_description			
	FROM "task_manager".t_progects3
		WHERE pk_id = $1
		ORDER BY pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, id)

	// считывание строки выборки
	err = row.Scan(
		&e.Pk_id,          // pk_id
		&e.Fk_employee,    // fk_position
		&e.C_name,    	   // c_name
		&e.C_description,  // c_description
	)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MProgect.SelectByID : row.Scan, %s\n", err)
		return
	}

	return
}

// Insert добавление сотрудника
func (m *MProgect) Insert(edbt *ProgectDBType) (id int64, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)

	// запрос
	query = `
		INSERT INTO "task_manager".t_Progects(
			fk_employee,
			c_name,
			c_description
		)
		VALUES(
			$1,	-- fk_employee
			$2,	-- c_name
			$3	-- c_description
		)
		returning pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query,
		edbt.Fk_employee,    // fk_position
		edbt.C_name,    	 // c_firstname
		edbt.C_description,  // c_lastname
	)

	// считывание id
	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MProgect.Insert : row.Scan, %s\n", err)
		return
	}

	return
}

// Update изменение сотрудника
func (m *MProgect) Update(edbt *ProgectDBType) (err error) {
	var (
		query string // строка запроса
	)

	revel.AppLog.Debugf("MProgect.Update, edbt: %+v\n", edbt)

	// запрос
	query = `
		UPDATE "task_manager".t_Progects
		SET 
			fk_employee = $2,
			c_name = $3,
			c_description = $4
		WHERE pk_id = $1;
	`

	// выполнение запроса
	_, err = m.db.Exec(query,
		edbt.Pk_id,          // pk_id
		edbt.Fk_employee,    // fk_employee
		edbt.C_name,    // c_name
		edbt.C_description,     // c_description
	)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MProgect.Update : m.db.Exec, %s\n", err)
		return
	}

	return
}

// Delete удаление сотрудника
func (m *MProgect) Delete(edbt *ProgectDBType) (err error) {
	var (
		query string // строка запроса
	)

	// запрос
	query = `
	DELETE FROM task_manager.t_progects 
		WHERE pk_id = $1;
	`

	// выполнение запроса
	_, err = m.db.Exec(query, edbt.Pk_id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MProgect.Delete : m.db.Exec, %s\n", err)
		return
	}

	return
}
