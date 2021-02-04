import TaskWindowView from './TaskWindowView.js'
import taskModel from './../../../models/taskModel.js'

// компонент окна для работы с сущностью книги
export class CTaskWindow {
    constructor() {
        this.view       // объект для быстрого доступа к представлениям
        this.type       // тип текущего отображения окна
        this.onChange   // callback функция при CUD операциях над книгой
        this.names
    }

    // метод инициализации компонента
    init(onChange,names) {
        this.onChange = onChange // callback функция при CUD операциях над книгой
        this.names=names
    }

    // метод получения webix конфигурации компонента
    config() {
        return TaskWindowView()
    }

    // метод инициализации обработчиков событий компонента
    attachEvents() {
        // инициализация используемых представлений
        this.view = {
            progectdatatable:$$('progectTabDatatable'),
            window: $$('taskWindow'),
            windowLabel: $$('taskWindowLabel'),
            windowCancelBtn: $$('taskWindowCancelBtn'),
            windowConfirmBtn: $$('taskWindowConfirmBtn'),
            form: $$('taskWindowForm'),
            formfields: {
                name: $$('taskWindowFormName'),
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
                webix.message('Заполните поля отмеченные *', 'error')
                return;
            }
            var selected =this.view.progectdatatable.getSelectedItem()
            switch (this.type) {
                case TASK_WINDOW_TYPE.create:
                    taskModel.createTask(this.fetch(),selected.ID).then(() => {
                        this.onChange()
                  //webix.message("Создание задачи")
                        this.hide()
                    })
                    break;
                case TASK_WINDOW_TYPE.update:
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
    switch(type) {
        switch (this.view.window.isVisible()) {
            case true:
                this.hide()
                break;
            case false:
                this.show(type)
                break;
        }
    }
    RefreshNames(names){
        this.names=names
    }
    // метод отображения окна
    show(type) {
      // console.log(this.names)
        this.view.formfields.employee.define('options', this.names)
        this.view.formfields.employee.refresh()
        switch (type) {
            case TASK_WINDOW_TYPE.create:
                this.view.windowLabel.setHTML('Добавление задачи')
                this.view.formfields.status.hide()
                this.view.formfields.fact_hours.hide()
                this.view.formfields.name.enable()
                this.view.formfields.employee.enable()
                this.view.formfields.sch_hours.enable()
                this.view.window.resize()
                break;
            case TASK_WINDOW_TYPE.update:
                this.view.windowLabel.setHTML('Редактирование задачи')
                this.view.formfields.status.show()
                this.view.formfields.fact_hours.show()
                this.view.formfields.name.enable()
                this.view.formfields.employee.enable()
                this.view.formfields.status.enable()
                this.view.formfields.sch_hours.enable()
                this.view.formfields.fact_hours.enable()
                this.view.window.resize()
                break;
            case TASK_WINDOW_TYPE.delete:
                this.view.windowLabel.setHTML('Удаление задачи')
                this.view.formfields.fact_hours.show()     
                this.view.formfields.status.show()
                this.view.formfields.name.disable()
                this.view.formfields.employee.disable()
                this.view.formfields.status.disable()
                this.view.formfields.sch_hours.disable()
                this.view.formfields.fact_hours.disable()
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

    // метод получения сущности из формы окна
    fetch() {
        return this.view.form.getValues()
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
        this.view.formfields.fact_hours.setValue(this.view.formfields.fact_hours.getValue().trim())

        // валидация webix
        isValid = this.view.form.validate()

        return isValid
    }
}

// типы отображения модального окна для работы с сущностью книги
export const TASK_WINDOW_TYPE = {
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETe',
}

