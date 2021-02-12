import progectModel from './../../../models/progectModel.js'
import ProgectWindowView from './ProgectWindowView.js';

// компонент окна для работы с сущностью сотрудника
export class CProgectWindow {
    constructor() {
        this.view       // объект для быстрого доступа к представлениям
        this.type       // тип текущего отображения окна
        this.onChange   // callback функция при CUD операциях над сотрудником
    }

    // метод инициализации компонента
    init(onChange) {
        this.onChange = onChange
    }

    // метод получения webix конфигурации компонента
    config() {
        return ProgectWindowView()
    }

    // метод инициализации обработчиков событий компонента
    attachEvents() {
        // инициализация используемых представлений
        this.view = {
            window: $$('progectWindow'),
            windowLabel: $$('progectWindowLabel'),
            windowCancelBtn: $$('progectWindowCancelBtn'),
            windowConfirmBtn: $$('progectWindowConfirmBtn'),
            form: $$('progectWindowForm'),
            formfields: {
                name: $$('progectWindowFormName'),
                description:$$('progectWindowFormDescription'),
                employee: $$('progectWindowFormEmployee'),              
            }
        }
        

        // обработка закрытия окна
        this.view.windowCancelBtn.attachEvent('onItemClick', () => {
            this.view.window.hide()
        })

        this.view.windowConfirmBtn.attachEvent('onItemClick', () => {
            // при удалении не требуется валидировать данные формы
            // валидация введенных данных по обязательным полям
            if (this.type !== PROGECT_WINDOW_TYPE.delete && !this.validate()) {
                webix.message('Заполните поля отмеченные *', 'error')
                return;
            }

             switch (this.type) {
                 case PROGECT_WINDOW_TYPE.create:
                     progectModel.createProgect(this.fetch()).then(() => {
                        this.onChange()
        //                webix.message("Создание проетка")
                         this.hide()
                     })
                     break;
                 case PROGECT_WINDOW_TYPE.update:
                     progectModel.updateProgect(this.fetch()).then(() => {
                         this.onChange()
                    //    webix.message("Изменение проекта")
                         this.hide()
                     })
                     break;
                case PROGECT_WINDOW_TYPE.delete:
                         // удаление сотрудника
                         progectModel.deleteProgect(this.fetch()).then(() => {
                             this.onChange()
         //                   webix.message("Удаление проекта")
                             this.hide()
                         })
        //             })
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

    // метод отображения окна
    show(type) {
        switch (type) {
            case PROGECT_WINDOW_TYPE.create:
                this.view.windowLabel.setHTML('Добавление проекта')
                this.view.formfields.employee.disable()
                this.view.formfields.name.enable()
                this.view.formfields.description.enable()
                break;
            case PROGECT_WINDOW_TYPE.update:
                this.view.windowLabel.setHTML('Редактирование проекта')
                this.view.formfields.name.enable()
                this.view.formfields.description.enable()
                this.view.formfields.employee.disable()
                break;
            case PROGECT_WINDOW_TYPE.delete:
                this.view.formfields.name.disable()
                this.view.formfields.description.disable()
                this.view.formfields.employee.disable()
                this.view.windowLabel.setHTML('Удаление проекта')
                this.view.window.resize()
                break;
            default:
                console.error('Неизвестный тип отображения окна для работы с сущностью проекта');
                break;
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
        this.view.formfields.employee.setValue(this.view.formfields.employee.getValue().trim())
        // валидация webix
        isValid = this.view.form.validate()

        return isValid
    }
}

// типы отображения модального окна для работы с сущностью книги
export const PROGECT_WINDOW_TYPE = {
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETe',
}

