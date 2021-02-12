package mappers

import (
	"database/sql"
	"task_manager/app/models/entities"

	"github.com/revel/revel"
)
type TaskStatusDBType struct {
	Pk_id  int64  // идентификатор
	C_name string // название должности
}

// ToType функция преобразования типа бд к типу сущности
func (dbt *TaskStatusDBType) ToType() (p *entities.TaskStatus, err error) {
	p = new(entities.TaskStatus)

	p.ID = dbt.Pk_id
	p.Name = dbt.C_name

	return
}

// FromType функция преобразования типа бд из типа сущности
func (_ *TaskStatusDBType) FromType(p *entities.TaskStatus) (dbt *TaskStatusDBType, err error) {
	dbt = &TaskStatusDBType{
		Pk_id:  p.ID,
		C_name: p.Name,
	}

	return
}
// MTaskStatus маппер стутусов книг
type MTaskStatus struct {
	db *sql.DB
}

// Init
func (m *MTaskStatus) Init(db *sql.DB) {
	m.db = db
}

// StatusByID получение статуса книги по id
func (m *MTaskStatus) StatusByID(id int64) (status string, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)

	// запрос
	query = `
		SELECT
			c_name
		FROM "task_manager".ref_statuses
		WHERE pk_id = $1;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, id)

	// считывание строки выборки
	err = row.Scan(&status)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MTaskStatus.StatusByID : row.Scan, %s\n", err)
		return
	}

	return
}

// IDByStatus получение id статуса по значению
func (m *MTaskStatus) IDByStatus(status string) (id int64, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)

	revel.AppLog.Debugf("MTaskStatus.IDByStatus, status: %+v\n", status)

	// запрос
	query = `
		SELECT
			pk_id
		FROM "task_manager".ref_statuses
		WHERE c_name = $1;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, status)

	// считывание строки выборки
	err = row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MTaskStatus.IDByStatus : row.Scan, %s\n", err)
		return
	}

	return
}
