import authModel from './../../models/authModel.js'
import MainWindowView from './MainWindowView.js'
import { User } from './../../models/entities/user.js'
import { checkAuth } from './../../../helpers/checkAuth.js'

// компонент окна авторизации
export class CMainWindow {
    constructor() {
        this.view       // объект для быстрого доступа к представлениям
        this.onLogin    // callback функция авторизации пользователя
    }

    // метод инициализации компонента
    init(onLogin) {
        
        this.onLogin = onLogin
    }

    // метод получения webix конфигурации компонента
    config() {
        return MainWindowView()
    }

    // метод инициализации обработчиков событий компонента
    attachEvents() {
        // инициализация используемых представлений
        this.view = {
            window: $$('mainWindow'),
            form: {
                form: $$('mainWindowForm'),
                login: $$('mainWindowFormLogin'),
                password: $$('mainWindowFormPassword'),
                confirm: $$('mainWindowConfirmBtn'),
            }
        }

        // событие входа в приложение
        this.view.form.confirm.attachEvent('onItemClick', () => {
            let user = new User()
            user.login = this.view.form.login.getValue()
            user.password = this.view.form.password.getValue()


            // if((user.login=="1")&&(user.password=="1"))
            // this.onLogin=true
            // else
            // webix.message('Логин: 1 Пароль: 1')
            // this.switch(workedPlace)
            //авторизация пользователя
            authModel.login(user).then((isValid) => {
                if (isValid === true) {
                    this.switch()
                    this.onLogin()
                }
                else {
                    webix.message('Неверный логин или пароль')
                }
            })
        })
    }

    // метод переключения состояния окна входа в приложение
    // результат выполнения функции зависит от авторизованности пользователя
    switch() {

        checkAuth((isAuthorize) => {
            if (isAuthorize) {
                this.hide()
                
            } else {
               this.show()
            }
        })
    }

    // метод отображения окна
    show() {
        this.view.window.show()
    }

    // метод сокрытия окна
    hide() {
        this.view.window.hide()
    }

    // функция валидации формы
    validate() {
        let isValid = false

        // удаление пробелов в полях формы

        // валидация webix

        return isValid
    }
}
