package mappers

import (
	"Task_manager/app/models/entities"
	"database/sql"
	//"github.com/revel/revel"
)

// ProgectDBType тип сущности "сотрудник" бд
type ProgectDBType struct {
	Pk_id         int64  // идентификатор
	Fk_Progect    int64  // FK на сотрудника
	C_name        string // Название
	C_description string // Описание
}

// ToType функция преобразования типа бд к типу сущности
func (dbt *ProgectDBType) ToType() (e *entities.Progect, err error) {
	e = new(entities.Progect)

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
		C_name:        e.Lastname,
		C_description: e.Firstname,
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
			fk_position,
			c_firstname,
			c_lastname,
			c_middlename,
			c_phone_number,
			c_email
		FROM "library".t_progects
		WHERE c_is_archive = 0
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
			&e.Pk_id,          // pk_id
			&e.Fk_position,    // fk_position
			&e.C_firstname,    // c_firstname
			&e.C_lastname,     // c_lastname
			&e.C_middlename,   // c_middlename
			&e.C_phone_number, // c_phone_number
			&e.C_email,        // c_email
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
			fk_position,
			c_firstname,
			c_lastname,
			c_middlename,
			c_phone_number,
			c_email
		FROM "library".t_progects
		WHERE pk_id = $1 and
			c_is_archive = 0
		ORDER BY pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, id)

	// считывание строки выборки
	err = row.Scan(
		&e.Pk_id,          // pk_id
		&e.Fk_position,    // fk_position
		&e.C_firstname,    // c_firstname
		&e.C_lastname,     // c_lastname
		&e.C_middlename,   // c_middlename
		&e.C_phone_number, // c_phone_number
		&e.C_email,        // c_email
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
		INSERT INTO "library".t_Progects(
			fk_position,
			c_firstname,
			c_lastname,
			c_middlename,
			c_phone_number,
			c_email,
			c_is_archive
		)
		VALUES(
			$1,	-- fk_position
			$2,	-- c_firstname
			$3,	-- c_lastname
			$4,	-- c_middlename
			$5,	-- c_phone_number
			$6,	-- c_email
			0	-- c_is_archive
		)
		returning pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query,
		edbt.Fk_position,    // fk_position
		edbt.C_firstname,    // c_firstname
		edbt.C_lastname,     // c_lastname
		edbt.C_middlename,   // c_middlename
		edbt.C_phone_number, // c_phone_number
		edbt.C_email,        // c_email
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
		UPDATE "library".t_Progects
		SET 
			fk_position = $2,
			c_firstname = $3,
			c_lastname = $4,
			c_middlename = $5,
			c_phone_number = $6,
			c_email = $7
		WHERE pk_id = $1;
	`

	// выполнение запроса
	_, err = m.db.Exec(query,
		edbt.Pk_id,          // pk_id
		edbt.Fk_position,    // fk_position
		edbt.C_firstname,    // c_firstname
		edbt.C_lastname,     // c_lastname
		edbt.C_middlename,   // c_middlename
		edbt.C_phone_number, // c_phone_number
		edbt.C_email,        // c_email
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
		UPDATE "library".t_Progects
		SET c_is_archive = 1
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
