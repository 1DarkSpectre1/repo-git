import WorkedPlaceView from './ApplicationView.js'
import {
    deleteCookie
} from './../../helpers/cookies.js'
import {
    checkAuth
} from './../../helpers/checkAuth.js'
import {
    CEmployeeTab
} from './employee/CEmployeeTab.js'
import {
    CProgectTab
} from './progect/CProgectTab.js'
import {
    CTaskTab
} from './task/CTaskTab.js'
import {
    CToolbar
} from './toolbar/CToolbar.js'
import {
    CMainWindow
} from './mainWindow/CMainWindow.js'

// галвный компонент приложения
export class Application {
    constructor() {
        this.view // быстрый доступ к объектам представлений
        this.userInfo = new CToolbar()
        this.taskTab = new CTaskTab() // экземпляр контроллера книг
        this.employeeTab = new CEmployeeTab() // экземпляр контроллера сотрудников
        this.progectTab = new CProgectTab() // экземпляр контроллера событий
        this.mainWindow = new CMainWindow() // окно входа в приложение
    }
    init() {
        // инициализация компонента информации о пользователе
        this.userInfo.init(
            () => {
                deleteCookie('auth-token')
                location.replace('/user/logout')
            }, // onLogout
        )

        // инициализация компонента вкладки событий
        this.progectTab.init( 
        (selected)=>{
            this.taskTab.refreshSelectProgect(selected)
           //this.refreshSelectProgect()
        },
        )
        // инициализация компонента вкладки книг
        this.taskTab.init()
        // инициализация компонента вкладки сотрудников
        this.employeeTab.init(
            () => {
                this.taskTab.refreshEmployees()
            }
        )


        // инициализация компонента окна входа в приложение
        //    this.mainWindow.init(false)
        this.mainWindow.init(
            () => {
                location.replace('/')
            }, // onLogin
        )
    }
    // метод отрисовки главной конфигурации представления
    config() {
        webix.ui(this.mainWindow.config())

        return WorkedPlaceView(this.taskTab, this.employeeTab, this.progectTab, this.userInfo)
    }

    attachEvents() {
        this.view = {
            main: $$('main'),
            tabbar: $$('main-tabbar'),
            multiviews: $$('main-views'),
            workedPlace: $$('workedPlace'),
            tabControllsContainer: $$("tab-controlls"),
        }

        // компоненты требующие авторизации
        // вызываются через проверку авторизации
        // если клиент не авторизован, то эти
        // компоненты не будут отрисованы
        checkAuth((isAuth) => {
            if (isAuth) {


                // отрисовать рабочее пространство
                this.view.workedPlace.show()

                // обработчики событий компонентов
                this.userInfo.attachEvents()
                this.employeeTab.attachEvents()
                this.progectTab.attachEvents()
                this.taskTab.attachEvents()
				this.view.tabbar.select(MENU.progectsTab);
               // this.taskTab.setDatatableProgect(this.progectTab.view.datatable)

                // переключение таба
                this.view.tabbar.attachEvent('onAfterSelect', (id) => {
                        switch (id) {
                            case MENU.progectsTab:
                                this.view.main.showBatch(id);
                                this.view.tabControllsContainer.showBatch(id);
                                break;
                            case MENU.tasksTab:
                                if (!this.progectTab.view.datatable.getSelectedItem()) {
                                    this.view.tabbar.select(MENU.progectsTab);
                                    webix.message("Выберите проект")
                                    return
                                }
                                this.taskTab.refreshTable()
                                this.view.main.showBatch(id);
                                this.view.tabControllsContainer.showBatch(id);
                                break;
                            case MENU.employeeTab:
                                this.view.main.showBatch(id);
                                this.view.tabControllsContainer.showBatch(id);
                                break;
                            default:
                                break;
                        }



                    }

                )
            } else {
                this.view.workedPlace.hide()
            }
        })

        // вызов обработки событий окна входа в приложение
        this.mainWindow.attachEvents(this.view.workedPlace)

        // первоночальное состояние приложения
        this.view.workedPlace.hide()
        this.mainWindow.switch(this.view.workedPlace)
    }
    // refreshSelectProgect() {
    //     var selected = this.progectTab.view.datatable.getSelectedItem()
    //     this.taskTab.refreshSelectProgect(selected)
    // }
}
export const MENU = {
    progectsTab: "ProgectTabView",
    tasksTab: "TaskTabView",
    employeeTab: "EmployeeTabView",
}