package task_provider

import (
	"database/sql"
	"task_manager/app/helpers"
	"task_manager/app/models/entities"
	"task_manager/app/models/mappers"
	"github.com/revel/revel"
)

// PTAsk провайдер контроллера книг
type PTask struct {
	taskMapper       *mappers.MTask
	taskStatusMapper *mappers.MTaskStatus
}

// Init
func (p *PTask) Init() (err error) {
	var db *sql.DB // экземпляр подключения к бд

	// получение экземпляра подключения к бд
	db, err = helpers.GetDBConnection()
	if err != nil {
		revel.AppLog.Errorf("PTask.Init : helpers.GetDBConnection, %s\n", err)
		return err
	}

	// инициализация маппера книг
	p.taskMapper = new(mappers.MTask)
	p.taskMapper.Init(db)

	// инициализация маппера статусов книг
	p.taskStatusMapper = new(mappers.MTaskStatus)
	p.taskStatusMapper.Init(db)

	return
}

// GetTAskByID метод получения книги по id
func (p *PTask) GetTaskByID(id int64) (b *entities.Task, err error) {
	var (
		bdbt *mappers.TaskDBType
	)

	// получение данных книги
	bdbt, err = p.taskMapper.SelectByID(id)
	if err != nil {
		revel.AppLog.Errorf("PTask.GetTaskByID : p.taskMapper.SelectByID, %s\n", err)
		return
	}

	// преобразование к типу сущности
	b, err = bdbt.ToType()
	if err != nil {
		revel.AppLog.Errorf("PTask.GetTaskByID : bdbt.ToType, %s\n", err)
		return
	}

	// получение значения статуса по ключу
	b.Status, err = p.taskStatusMapper.StatusByID(bdbt.Fk_status)
	if err != nil {
		revel.AppLog.Errorf("PTask.GetTaskByID : p.taskStatusMapper.StatusByID, %s\n", err)
		return
	}

	return
}

// GetTAsks метод получения книг
func (p *PTask) GetTasksByProgectID(id int64) (bs []*entities.Task, err error) {
	var (
		bdbts []*mappers.TaskDBType
		b     *entities.Task
	)

	// получение данных книг
	bdbts, err = p.taskMapper.SelectAllByProgectID(id )
	if err != nil {
		revel.AppLog.Errorf("PTask.GetTasksByProgectID : p.taskMapper.SelectAll, %s\n", err)
		return
	}

	for _, bdbt := range bdbts {
		// преобразование к типу сущности
		b, err = bdbt.ToType()
		if err != nil {
			revel.AppLog.Errorf("PTask.GetTasksByProgectID : bdbt.ToType, %s\n", err)
			return
		}

		// получение значения статуса по ключу
		b.Status, err = p.taskStatusMapper.StatusByID(bdbt.Fk_status)
		if err != nil {
			revel.AppLog.Errorf("PTask.GetTasksByProgectID : p.taskStatusMapper.StatusByID, %s\n", err)
			return
		}
		
		bs = append(bs, b)
	}

	return
}

// GetTAsks метод получения книг
func (p *PTask) GetTasksByEmployeeID(id int64) (bs []*entities.Task, err error) {
	var (
		bdbts []*mappers.TaskDBType
		b     *entities.Task
	)

	// получение данных книг
	bdbts, err = p.taskMapper.SelectAllByEmployeeID(id )
	if err != nil {
		revel.AppLog.Errorf("PTask.GetTasksByEmployeeID : p.taskMapper.SelectAllByEmployeeID, %s\n", err)
		return
	}

	for _, bdbt := range bdbts {
		// преобразование к типу сущности
		b, err = bdbt.ToType()
		if err != nil {
			revel.AppLog.Errorf("PTask.GetTasksByEmployeeID : bdbt.ToType, %s\n", err)
			return
		}

		// получение значения статуса по ключу
		b.Status, err = p.taskStatusMapper.StatusByID(bdbt.Fk_status)
		if err != nil {
			revel.AppLog.Errorf("PTask.GetTasksByEmployeeID : p.taskStatusMapper.StatusByID, %s\n", err)
			return
		}
		
		bs = append(bs, b)
	}

	return
}

// CreateTAsk метод создания книги
func (p *PTask) CreateTask(task *entities.Task) (b *entities.Task, err error) {
	var (
		bdbt *mappers.TaskDBType
	)

	// инициализация структуры бд из струткуры сущности
	bdbt, err = bdbt.FromType(*task)
	if err != nil {
		revel.AppLog.Errorf("PTask.CreateTask : bdbt.FromType, %s\n", err)
		return
	}
	
	// получение внешнего ключа на статус
	bdbt.Fk_status, err = p.taskStatusMapper.IDByStatus(task.Status)
	if err != nil {
		revel.AppLog.Errorf("PTask.UpdateTask : p.taskStatusMapper.IDByStatus, %s\n", err)
		return
	}
	
	// добавление книги
	task.ID, err = p.taskMapper.Insert(bdbt)
	if err != nil {
		revel.AppLog.Errorf("PTask.CreateTask : p.taskMapper.Insert, %s\n", err)
		return
	}

	return task, nil
}

// UpdateTAsk метод обновления книги
func (p *PTask) UpdateTask(task *entities.Task) (b *entities.Task, err error) {
	var (
		bdbt *mappers.TaskDBType
	)

	// инициализация структуры бд из струткуры сущности
	bdbt, err = bdbt.FromType(*task)
	if err != nil {
		revel.AppLog.Errorf("PTask.UpdateTask : bdbt.FromType, %s\n", err)
		return
	}

	// получение внешнего ключа на статус
	bdbt.Fk_status, err = p.taskStatusMapper.IDByStatus(task.Status)
	if err != nil {
		revel.AppLog.Errorf("PTask.UpdateTask : p.taskStatusMapper.IDByStatus, %s\n", err)
		return
	}

	// обновление книги
	err = p.taskMapper.Update(bdbt)
	if err != nil {
		revel.AppLog.Errorf("PTask.UpdateTask : p.taskMapper.Update, %s\n", err)
		return
	}

	return task, nil
}

// DeleteTAsk метод удаления книги
func (p *PTask) DeleteTask(task *entities.Task) (err error) {
	var (
		bdbt *mappers.TaskDBType
	)

	// инициализация структуры бд из струткуры сущности
	bdbt, err = bdbt.FromType(*task)
	if err != nil {
		revel.AppLog.Errorf("PTask.DeleteTask : bdbt.FromType, %s\n", err)
		return
	}

	// удаление книги
	err = p.taskMapper.Delete(bdbt)
	if err != nil {
		revel.AppLog.Errorf("PTask.DeleteTask : p.taskMapper.Delete, %s\n", err)
		return
	}

	return
}
