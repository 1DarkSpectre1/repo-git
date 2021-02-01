package controllers

import (
	"encoding/json"
	"io/ioutil"
	"task_manager/app/helpers"
	"task_manager/app/models/entities"
	"task_manager/app/models/providers/progect_provider"

	"github.com/revel/revel"
)

// CProgect
type CProgect struct {
	*revel.Controller
	provider *progect_provider.PProgect
}

// Init интерцептор контроллера CProgect
func (c *CProgect) Init() revel.Result {
	var (
		cache helpers.ICache // экземпляр кэша
		err   error          // ошибка в ходе выполнения функции
	)

	// инициализация кэша
	cache, err = helpers.GetCache()
	if err != nil {
		revel.AppLog.Errorf("CProgect.Init : helpers.GetCache, %s\n", err)
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
	c.provider = new(progect_provider.PProgect)
	err = c.provider.Init()
	if err != nil {
		revel.AppLog.Errorf("CProgect.Init : c.provider.Init, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	return nil
}

// Destroy контроллера CProgect
func (c *CProgect) Destroy() {
	c.Controller.Destroy()

	// удаление ссылки на провайдер
	c.provider = nil
}

// GetAll получение всех проектов
func (c *CProgect) GetAll() revel.Result {
	// получение отрудников
	progects, err := c.provider.GetProgects()
	if err != nil {
		revel.AppLog.Errorf("CProgect.GetAll : c.provider.GetProgects, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CProgect.GetAll, progects: %+v\n", progects)

	// рендер положительного результата
	return c.RenderJSON(Succes(progects))
}

// GetByID получение проекта по id
func (c *CProgect) GetByID(id int64) revel.Result {
	// получение проекта
	progect, err := c.provider.GetProgectByID(id)
	if err != nil {
		revel.AppLog.Errorf("CProgect.GetByID : c.provider.GetProgectByID, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// рендер положительного результата
	return c.RenderJSON(Succes(progect))
}

// Create создание проекта
func (c *CProgect) Create() revel.Result {
	var (
		progect *entities.Progect // экземпляр сущности для создания
		err      error              // ошибка в ходе выполнения функции
	)

	// формирование сущности для создания из post параметров
	progect, err = c.fetchPostProgect()
	if err != nil {
		revel.AppLog.Errorf("CProgect.Create : c.fetchPostProgect, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// создание сущности
	progect, err = c.provider.CreateProgect(progect)
	if err != nil {
		revel.AppLog.Errorf("CProgect.Create : c.provider.CreateProgect, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CProgect.Create, progect: %+v\n", progect)

	// рендер положительного результата
	return c.RenderJSON(Succes(progect))
}

// UpdateProgect изменение проекта
func (c *CProgect) Update() revel.Result {
	var (
		progect *entities.Progect // экземпляр сущности для обновления
		err      error              // ошибка в ходе выполнения функции
	)

	// формирование сущности для обновления из post параметров
	progect, err = c.fetchPostProgect()
	if err != nil {
		revel.AppLog.Errorf("CProgect.Update : c.fetchPostProgect, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// обновление сущности
	progect, err = c.provider.UpdateProgect(progect)
	if err != nil {
		revel.AppLog.Errorf("CProgect.Update : c.provider.UpdateProgect, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CProgect.Update, progect: %+v\n", progect)

	// рендер положительного результата
	return c.RenderJSON(Succes(progect))
}

// DeleteProgect удаление проекта
func (c *CProgect) Delete() revel.Result {
	var (
		progect *entities.Progect // экземпляр сущности для удаления
		err      error              // ошибка в ходе выполнения функции
	)

	// формирование сущности для удаления из post параметров
	progect, err = c.fetchPostProgect()
	if err != nil {
		revel.AppLog.Errorf("CProgect.Delete : c.fetchPostProgect, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}

	// удаление сущности
	err = c.provider.DeleteProgect(progect)
	if err != nil {
		revel.AppLog.Errorf("CProgect.Delete : c.provider.DeleteProgect, %s\n", err)
		return c.RenderJSON(Failed(err.Error()))
	}
	revel.AppLog.Debugf("CProgect.Delete , progect: %+v\n", progect)

	// рендер положительного результата
	return c.RenderJSON(Succes(nil))
}

// fetchPostProgect метод получения сущности из post параметров
func (c *CProgect) fetchPostProgect() (e *entities.Progect, err error) {
	var (
		rawRequest []byte // байтовое представление тела запроса
	)

	// получение тела запроса
	rawRequest, err = ioutil.ReadAll(c.Request.GetBody())
	if err != nil {
		revel.AppLog.Errorf("CProgect.fetchPostProgect : ioutil.ReadAll, %s\n", err)
		return
	}

	// преобразование тела запроса в структуру сущности
	err = json.Unmarshal(rawRequest, &e)
	if err != nil {
		revel.AppLog.Errorf("CProgect.fetchPostProgect : json.Unmarshal, %s\n", err)
		return
	}

	revel.AppLog.Debugf("CProgect.fetchPostProgect, progects: %+v\n", e)

	return
}
