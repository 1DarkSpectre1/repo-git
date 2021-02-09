import TaskWindowView from './TaskWindowView.js'
import taskModel from './../../../models/taskModel.js'
import {TASK_STATUS} from '../../../models/entities/task.js'

// компонент окна для работы с сущностью книги
export class CTaskWindow {
    constructor() {
        this.view // объект для быстрого доступа к представлениям
        this.type // тип текущего отображения окна
        this.onChange // callback функция при CUD операциях над книгой
        this.names
    }

    // метод инициализации компонента
    init(onChange, names) {
        this.onChange = onChange // callback функция при CUD операциях над книгой
        this.names = names
    }

    // метод получения webix конфигурации компонента
    config() {
        return TaskWindowView()
    }

    // метод инициализации обработчиков событий компонента
    attachEvents() {
        // инициализация используемых представлений
        this.view = {
            progectdatatable: $$('progectTabDatatable'),
            window: $$('taskWindow'),
            windowLabel: $$('taskWindowLabel'),
            windowCancelBtn: $$('taskWindowCancelBtn'),
            windowConfirmBtn: $$('taskWindowConfirmBtn'),
            form: $$('taskWindowForm'),
            formfields: {
                name: $$('taskWindowFormName'),
                description: $$('taskWindowFormDescription'),
                employee: $$('taskWindowFormEmployee'),
                status: $$('taskWindowFormStatus'),
                sch_hours: $$('taskWindowFormSchHours'),
                fact_hours: $$('taskWindowFormFactHours'),
            }
        }


        // обработка закрытия окна
        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.window.hide()
        })

        // обработка события 'принять'
        this.view.windowConfirmBtn.attachEvent('onItemClick', () => {
            // валидация введенных данных по обязательным полям
            if (!this.validate()) {
                return;
            }
            var selected = this.view.progectdatatable.getSelectedItem()
            switch (this.type) {
                case TASK_WINDOW_TYPE.create:
                    task = this.view.form.getValues()
                    var task = this.createFromType(selected.ID, task)
                    taskModel.createTask(task).then(() => {
                        this.onChange()
                        //webix.message("Создание задачи")
                        this.hide()
                    })
                    break;
                case TASK_WINDOW_TYPE.update:
                    //ДОБАВИТЬ ИЗМЕНЕНИЯ//
                    taskModel.updateTask(this.fetch()).then(() => {
                        this.onChange()
                        // webix.message("Изменение задачи")
                        this.hide()
                    })
                    break;
                case TASK_WINDOW_TYPE.delete:
                    taskModel.deleteTask(this.fetch()).then(() => {
                        this.onChange()
                        // webix.message("Удаление задачи")
                        this.hide()
                    })
                    break;
            }
        })
    }

    // метод вызова модального окна
    switch (type, status) {
        switch (this.view.window.isVisible()) {
            case true:
                this.hide()
                break;
            case false:
                this.show(type, status)
                break;
        }
    }
    RefreshNames(names) {
        this.names = names
    }
    // метод отображения окна
    show(type, status) {
        // console.log(this.names)
        this.view.formfields.employee.define('options', this.names)
        this.view.formfields.employee.refresh()
        switch (type) {
            case TASK_WINDOW_TYPE.create:
                this.view.windowLabel.setHTML('Добавление задачи')
                this.view.formfields.status.hide()
                this.view.formfields.fact_hours.hide()
                this.view.formfields.name.enable()
                this.view.formfields.description.enable()
                this.view.formfields.employee.hide()
                this.view.formfields.sch_hours.enable()
                this.view.windowConfirmBtn.show()
                this.view.window.resize()
                break;
            case TASK_WINDOW_TYPE.update:
                this.view.windowLabel.setHTML('Редактирование задачи')
                this.updateShow(status)
                this.view.windowConfirmBtn.show()
                // this.view.formfields.status.show()
                // this.view.formfields.fact_hours.show()
                // this.view.formfields.employee.show()
                // this.view.formfields.name.enable()
                // this.view.formfields.employee.enable()
                // this.view.formfields.status.disable()
                // this.view.formfields.sch_hours.enable()
                // this.view.formfields.fact_hours.enable()
                // this.view.window.resize()
                break;
            case TASK_WINDOW_TYPE.delete:
                this.view.windowLabel.setHTML('Удаление задачи')
                this.view.formfields.fact_hours.show()
                this.view.formfields.status.show()
                this.view.formfields.employee.show()
                this.view.formfields.name.disable()
                this.view.formfields.description.disable()
                this.view.formfields.employee.disable()
                this.view.formfields.status.disable()
                this.view.formfields.sch_hours.disable()
                this.view.formfields.fact_hours.disable()
                this.view.windowConfirmBtn.show()
                this.view.window.resize()
                break;
                case TASK_WINDOW_TYPE.viewing:
                this.view.windowLabel.setHTML('Просмотр задачи')
                this.view.formfields.fact_hours.show()
                this.view.formfields.status.show()
                this.view.formfields.employee.show()
                this.view.formfields.name.disable()
                this.view.formfields.description.disable()
                this.view.formfields.employee.disable()
                this.view.formfields.status.disable()
                this.view.formfields.sch_hours.disable()
                this.view.formfields.fact_hours.disable()
                this.view.windowConfirmBtn.hide()
                this.view.window.resize()
                    break;
            default:
                console.error('Неизвестный тип отображения окна для работы с сущностью задачи');
                return;
        }

        this.type = type

        this.view.window.show()
    }

    // метод сокрытия окна
    hide() {
        this.view.window.hide()
    }
    // метод отображения в зависимости от статуса
    updateShow(status) {
        switch (status) {
            case TASK_STATUS.new_task:
                this.view.formfields.status.hide()
                this.view.formfields.fact_hours.hide()
                this.view.formfields.employee.hide()
                this.view.formfields.name.disable()
                this.view.formfields.description.enable()
                this.view.formfields.sch_hours.enable()
                this.view.window.resize()
                break;
            case TASK_STATUS.not_assigned:
                this.view.formfields.employee.show()
                this.view.formfields.fact_hours.hide()
                this.view.formfields.status.hide()
                this.view.formfields.description.enable()
                this.view.formfields.employee.enable()
                this.view.formfields.name.disable()
                this.view.formfields.sch_hours.disable()
                this.view.window.resize()
                break;
            case TASK_STATUS.appointed:
                this.view.formfields.employee.show()
                this.view.formfields.fact_hours.hide()
                this.view.formfields.status.hide()
                this.view.formfields.description.enable()
                this.view.formfields.employee.enable()
                this.view.formfields.name.disable()
                this.view.formfields.sch_hours.disable()
                this.view.window.resize()
                break;
            case TASK_STATUS.work:
                this.view.formfields.employee.show()
                this.view.formfields.fact_hours.show()
                this.view.formfields.status.hide()
                this.view.formfields.description.enable()
                this.view.formfields.fact_hours.enable()
                this.view.formfields.name.disable()
                this.view.formfields.employee.disable()
                this.view.formfields.sch_hours.disable()
                this.view.window.resize()
                break;
            case TASK_STATUS.pause:
                this.view.formfields.employee.show()
                this.view.formfields.fact_hours.show()
                this.view.formfields.status.hide()
                this.view.formfields.description.enable()
                this.view.formfields.fact_hours.enable()
                this.view.formfields.name.disable()
                this.view.formfields.employee.disable()
                this.view.formfields.sch_hours.disable()
                this.view.window.resize()
                break;
            case TASK_STATUS.finish:
                this.view.formfields.fact_hours.show()
                this.view.formfields.status.show()
                this.view.formfields.employee.show()
                this.view.formfields.name.disable()
                this.view.formfields.description.disable()
                this.view.formfields.employee.disable()
                this.view.formfields.status.disable()
                this.view.formfields.sch_hours.disable()
                this.view.formfields.fact_hours.disable()
                this.view.window.resize()
                break;
                break;
            case TASK_STATUS.approval:
                this.view.formfields.employee.show()
                this.view.formfields.fact_hours.show()
                this.view.formfields.status.hide()
                this.view.formfields.description.enable()
                this.view.formfields.fact_hours.disable()
                this.view.formfields.name.enable()
                this.view.formfields.employee.disable()
                this.view.formfields.sch_hours.enable()
                this.view.window.resize()
                break;
            default:
                console.log('Неизвестный статус: ', status)
                break;
        }
    }
    //метод подготовки данных   
    createFromType(id, task) {
        task.sch_hours = Number(task.sch_hours)
        task.fact_hours = Number(task.fact_hours)
        task.fk_employee = null;
        task.fk_progect = id;
        if (task.sch_hours === 0) {
            task.sch_hours = null;
            task.status = TASK_STATUS.new_task;
        } else {
            task.status = TASK_STATUS.not_assigned;
        }
        if (task.fact_hours === 0) {
            task.fact_hours = null;
        }
        console.log(task)
        return task
    }
    // метод получения сущности из формы окна
    fetch(id) {
        var task = this.view.form.getValues()
        if (task.status === TASK_STATUS.approval) {
            task.sch_hours = Number(task.sch_hours)
            task.fact_hours = null
            task.status=TASK_STATUS.appointed
            task.fk_employee = Number(task.fk_employee)

        } else {
            task.sch_hours = Number(task.sch_hours)
            task.fact_hours = Number(task.fact_hours)
            if (task.sch_hours === 0) {
                task.sch_hours = null;
            }
            if (task.fact_hours === 0) {
                task.fact_hours = null;
            }
            if (id) {
                task.fk_progect = id;
            }
            if (task.fk_employee === "") {
                task.fk_employee = null;
                task.status = TASK_STATUS.not_assigned
            } else {
                task.fk_employee = Number(task.fk_employee)
                task.status = TASK_STATUS.appointed
            }
        }
        console.log(task)
        return task
    }

    // метод размещения сущности в форме окна
    parse(values) {
        this.view.form.setValues(values)
    }

    // функция валидации формы
    validate() {
        let isValid = false
        // удаление пробелов в полях формы
        this.view.formfields.name.setValue(this.view.formfields.name.getValue().trim())
        this.view.formfields.sch_hours.setValue(this.view.formfields.sch_hours.getValue().trim())
        // валидация webix
        isValid = this.view.form.validate()
        if (isValid) {
            if (this.view.formfields.sch_hours.getValue()==="") {
                return isValid
            }
           if ((isNaN(this.view.formfields.sch_hours.getValue())||(Number(this.view.formfields.sch_hours.getValue())===0))) {
               webix.message('Введено некоректное значение поля "План часы"', 'error')
               isValid=false
           } 
           console.log(Number(this.view.formfields.sch_hours.getValue()))
        }else{
            webix.message('Заполните поля отмеченные *', 'error')
        }
        return isValid
    }
}

// типы отображения модального окна для работы с сущностью книги
export const TASK_WINDOW_TYPE = {
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETe',
    viewing: 'viewing',
}