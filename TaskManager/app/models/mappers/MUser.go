package mappers

import (
	"database/sql"
	"task_manager/app/models/entities"

	"github.com/revel/revel"
)

// UserDBType тип сущности "пользователь" бд
type UserDBType struct {
	Pk_id       int64  // идентификатор
	Fk_employee int64  // ключ на сотрудника
	C_login     string // логин
}

// ToType функция преобразования типа бд к типу сущности
func (dbt *UserDBType) ToType() (u *entities.User, err error) {
	u = new(entities.User)
	u.ID = dbt.Pk_id
	u.Login = dbt.C_login
	return
}

// FromType функция преобразования типа сущности к типу бд
// допускается, что dbt is nil
func (_ *UserDBType) FromType(u entities.User) (dbt *UserDBType, err error) {
	dbt = &UserDBType{
		Pk_id:   u.ID,
		C_login: u.Login,
	}

	return
}

// MUser маппер пользователей
type MUser struct {
	db *sql.DB
}

// Init
func (m *MUser) Init(db *sql.DB) {
	m.db = db
}


// SelectUserByID получение пользователя по id
func (m *MUser) SelectUserByID(id int64) (u *UserDBType, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)
	u = new(UserDBType)

	// запрос
	query = `
		SELECT
			pk_id,
			fk_employee,
			c_login
		FROM "task_manager".t_users
		WHERE pk_id = $1
		ORDER BY pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, id)

	// считывание строки выборки
	err = row.Scan(&u.Pk_id, &u.Fk_employee, &u.C_login)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MUser.SelectUser : row.Scan, %s\n", err)
		return
	}

	return
}

// SelectUserByLogin получение пользователя по логину
func (m *MUser) SelectUserByLogin(login string) (u *UserDBType, err error) {
	var (
		query string   // строка запроса
		row   *sql.Row // выборка данных
	)

	u = new(UserDBType)

	// запрос
	query = `
		SELECT
			pk_id,
			fk_employee,
			c_login
		FROM "task_manager".t_users
		WHERE c_login = $1
		ORDER BY pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, login)

	// считывание строки выборки
	err = row.Scan(&u.Pk_id, &u.Fk_employee, &u.C_login)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MUser.SelectUser : row.Scan, %s\n", err)
		return
	}

	return
}

// CheckPassword проверка пароля пользователя
func (m *MUser) CheckPassword(user *UserDBType, password string) (f bool, err error) {
	var (
		query string                        // строка запроса
		row   *sql.Row                      // выборка данных
		u     *UserDBType = new(UserDBType) //
	)

	// запрос
	query = `
		SELECT
			pk_id
		FROM "task_manager".t_users
		WHERE
			pk_id = $1 and
			c_login = $2 and
			c_password = $3
		ORDER BY pk_id;
	`

	// выполнение запроса
	row = m.db.QueryRow(query, user.Pk_id, user.C_login, password)

	// считывание строки выборки
	err = row.Scan(&u.Pk_id)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			return
		}

		revel.AppLog.Errorf("MUser.CheckPassword : row.Scan, %s\n", err)
		return
	}

	return true, nil
}
