package progect_provider

import (
	"database/sql"
	"task_manager/app/helpers"
	"task_manager/app/models/entities"
	"task_manager/app/models/mappers"

	"github.com/revel/revel"
)

// PProgect провайдер контроллера сотрудников
type PProgect struct {
	progectMapper    *mappers.MProgect
	employeeMapper   *mappers.MEmployee
}

// Init
func (p *PProgect) Init() (err error) {
	var db *sql.DB // экземпляр подключения к бд

	// получение экземпляра подключения к бд
	db, err = helpers.GetDBConnection()
	if err != nil {
		revel.AppLog.Errorf("PProgect.Init : helpers.GetDBConnection, %s\n", err)
		return err
	}

	// инициализация маппера сотрудников
	p.progectMapper = new(mappers.MProgect)
	p.progectMapper.Init(db)

	
	return
}

// GetProgectByID метод получения сотрудника по id
func (p *PProgect) GetProgectByID(id int64) (e *entities.Progect, err error) {
	var (
		edbt *mappers.ProgectDBType
	)

	// получение данных сотрудника
	edbt, err = p.progectMapper.SelectByID(id)
	if err != nil {
		revel.AppLog.Errorf("PProgect.GetProgectByID : p.progectMapper.SelectByID, %s\n", err)
		return
	}

	// преобразование типа бд к типу сущности
	e, err = edbt.ToType()
	if err != nil {
		revel.AppLog.Errorf("PProgect.GetProgectByID : edbt.ToType, %s\n", err)
		return
	}


	return
}

// GetProgects метод получения сотрудников
func (p *PProgect) GetProgects() (es []*entities.Progect, err error) {
	var (
		edbts []*mappers.ProgectDBType
		e     *entities.Progect
	)

	// получение данных книг
	edbts, err = p.progectMapper.SelectAll()
	if err != nil {
		revel.AppLog.Errorf("PProgect.GetProgects : p.progectMapper.SelectAll, %s\n", err)
		return
	}

	for _, edbt := range edbts {
		// преобразование к типу сущности
		e, err = edbt.ToType()
		if err != nil {
			revel.AppLog.Errorf("PProgect.GetProgects : edbt.ToType, %s\n", err)
			return
		}
		
		es = append(es, e)
	}

	return
}

// CreateProgect метод создания сотрудника
func (p *PProgect) CreateProgect(progect *entities.Progect) (e *entities.Progect, err error) {
	var (
		edbt *mappers.ProgectDBType
	)

	// инициализация структур бд из струткур сущности
	edbt, err = edbt.FromType(*progect)
	if err != nil {
		revel.AppLog.Errorf("PProgect.CreateProgect : edbt.FromType, %s\n", err)
		return
	}


	// добавление сотрудника
	progect.ID, err = p.progectMapper.Insert(edbt)
	if err != nil {
		revel.AppLog.Errorf("PProgect.CreateProgect : p.progectMapper.Create, %s\n", err)
		return
	}

	return progect, nil
}

// UpdateProgect метод обновления сотрудника
func (p *PProgect) UpdateProgect(progect *entities.Progect) (e *entities.Progect, err error) {
	var (
		edbt *mappers.ProgectDBType
	)

	// инициализация структуры бд из струткуры сущности
	edbt, err = edbt.FromType(*progect)
	if err != nil {
		revel.AppLog.Errorf("PProgect.UpdateProgect : edbt.FromType, %s\n", err)
		return
	}

	// обновление сотрудника
	err = p.progectMapper.Update(edbt)
	if err != nil {
		revel.AppLog.Errorf("PProgect.UpdateProgect : p.progectMapper.Update, %s\n", err)
		return
	}

	return progect, nil
}

// DeleteProgect метод удаления сотрудника
func (p *PProgect) DeleteProgect(progect *entities.Progect) (err error) {
	var (
		edbt *mappers.ProgectDBType
	)

	// инициализация структуры бд из струткуры сущности
	edbt, err = edbt.FromType(*progect)
	if err != nil {
		revel.AppLog.Errorf("PProgect.DeleteProgect : edbt.FromType, %s\n", err)
		return
	}

	// удаление сотрудника
	err = p.progectMapper.Delete(edbt)
	if err != nil {
		revel.AppLog.Errorf("PProgect.DeleteProgect : p.progectMapper.Update, %s\n", err)
		return
	}

	return
}
