package controllers

import (
	"encoding/json"
	"io/ioutil"
	"task_manager/app/helpers"
	"task_manager/app/models/entities"
	"task_manager/app/models/providers/task_provider"

	"github.com/revel/revel"
)

// CTask
type CTask struct {
	*revel.Controller
	provider *task_provider.PTask
}

// Init интерцептор контроллера CTask
func (c *CTask) Init() revel.Result {
	var (
		cache helpers.ICache // экземпляр кэша
		err   error          // ошибка в ходе выполнения функции
	)

	// инициализация кэша
	cache, err = helpers.GetCache()
	if err != nil {
		revel.AppLog.Errorf("CTask.Init : helpers.GetCache, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// получение токена клиента
	token, err := helpers.GetToken(c.Controller)
	if err != nil {
		revel.AppLog.Errorf("CAuth.Check : helpers.GetToken, %s\n", err)
		return c.Redirect((*CError).Unauthorized)
	}

	// проверка токена
	if isExist := cache.TokenIsActual(token); !isExist {
		return c.Redirect((*CError).Unauthorized)
	}

	// инициализация провайдера
	c.provider = new(task_provider.PTask)
	err = c.provider.Init()
	if err != nil {
		revel.AppLog.Errorf("CTask.Init : c.provider.Init, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	return nil
}

// Destroy контроллера CTask
func (c *CTask) Destroy() {
	c.Controller.Destroy()

	// удаление ссылки на провайдер
	c.provider = nil
}

// GetAllByIDProgect получение всех задач
func (c *CTask) GetAllByIDProgect(id int64) revel.Result {
	// получение задач
	tasks, err := c.provider.GetTasksByProgectID(id)
	if err != nil {
		revel.AppLog.Errorf("CTask.GetAllByIDProgect : c.provider.GetTasksByProgectID, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CTask.GetAllByIDProgect : c.provider.GetTasksByProgectID, tasks: %+v\n", tasks)

	// рендер положительного результата
	return c.RenderJSON(Succes(tasks))
}

// GetByID получение задачи по id
func (c *CTask) GetByID(id int64) revel.Result {
	// получение задач
	task, err := c.provider.GetTaskByID(id)
	if err != nil {
		revel.AppLog.Errorf("CTask.GetByID : c.provider.GetTaskByID, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CTask.GetByID : c.provider.GetTaskByID, task: %+v\n", task)

	// рендер положительного результата
	return c.RenderJSON(Succes(task))
}

// Create создание задачи
func (c *CTask) Create() revel.Result {
	var (
		task *entities.Task // экземпляр сущности для создания
		err  error          // ошибка в ходе выполнения функции
	)

	// формирование сущности для создания из post параметров
	task, err = c.fetchPostTask()
	if err != nil {
		revel.AppLog.Errorf("CTask.Create : c.fetchPostTask, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	// создание сущности
	task, err = c.provider.CreateTask(task)
	if err != nil {
		revel.AppLog.Errorf("CTask.Create : c.provider.CreateTask, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CTask.Create : c.provider.CreateTask, task: %+v\n", task)

	// рендер положительного результата
	return c.RenderJSON(Succes(task))
}

// Update обновление задачи
func (c *CTask) Update() revel.Result {
	var (
		task *entities.Task // экземпляр сущности для обновления
		err  error          // ошибка в ходе выполнения функции
	)

	// формирование сущности для обновления из post параметров
	task, err = c.fetchPostTask()
	if err != nil {
		revel.AppLog.Errorf("CTask.Create : c.fetchPostTask, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// обновление сущности
	task, err = c.provider.UpdateTask(task)
	if err != nil {
		revel.AppLog.Errorf("CTask.Create : c.provider.UpdateTask, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CTask.Update : c.provider.UpdateTask, task: %+v\n", task)

	// рендер положительного результата
	return c.RenderJSON(Succes(task))
}

// Delete удаление задачи
func (c *CTask) Delete() revel.Result {
	var (
		task *entities.Task // экземпляр сущности для удаления
		err  error          // ошибка в ходе выполнения функции
	)

	// формирование сущности для удаления из post параметров
	task, err = c.fetchPostTask()
	if err != nil {
		revel.AppLog.Errorf("CTask.Create : c.fetchPostTask, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// удаление сущности
	err = c.provider.DeleteTask(task)
	if err != nil {
		revel.AppLog.Errorf("CTask.Create : c.provider.DeleteTask, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CTask.Delete : c.provider.DeleteTask, task: %+v\n", task)

	// рендер положительного результата
	return c.RenderJSON(Succes(nil))
}

// fetchPostTask метод получения сущности из post параметров
func (c *CTask) fetchPostTask() (b *entities.Task, err error) {
	var (
		rawRequest []byte // байтовое представление тела запроса
	)

	// получение тела запроса
	rawRequest, err = ioutil.ReadAll(c.Request.GetBody())
	if err != nil {
		revel.AppLog.Errorf("CTask.fetchPostTask : ioutil.ReadAll, %s\n", err)
		return
	}

	// преобразование тела запроса в структуру сущности
	err = json.Unmarshal(rawRequest, &b)
	if err != nil {
		revel.AppLog.Errorf("CTask.fetchPostTask : json.Unmarshal, %s\n", err)
		return
	}

	revel.AppLog.Debugf("CTask.fetchPostTask, task: %+v\n", b)

	return
}
