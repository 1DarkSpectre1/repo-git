
import WorkedPlaceView from './ApplicationView.js'
import { deleteCookie } from './../../helpers/cookies.js'
import { checkAuth } from './../../helpers/checkAuth.js'
import { CEmployeeTab } from './employee/CEmployeeTab.js'
import { CProgectTab } from './progect/CProgectTab.js'
import { CTaskTab } from './task/CTaskTab.js'
import { CToolbar } from './toolbar/CToolbar.js'
import { CMainWindow } from './mainWindow/CMainWindow.js'

// галвный компонент приложения
export class Application {
    constructor() {
        this.view                               // быстрый доступ к объектам представлений
        this.userInfo = new CToolbar()
        this.taskTab = new CTaskTab()           // экземпляр контроллера книг
        this.employeeTab = new CEmployeeTab()   // экземпляр контроллера сотрудников
        this.progectTab = new CProgectTab()     // экземпляр контроллера событий
        this.mainWindow = new CMainWindow()    // окно входа в приложение
        this.selectProgect
    }
    init() {
         // инициализация компонента информации о пользователе
        this.userInfo.init(
            () => {
                deleteCookie('auth-token')
                location.replace('/user/logout')
             }, // onLogout
         )
         var f=this.refreshSelectProgect
        // инициализация компонента вкладки событий
        this.progectTab.init(
            (config) => { this.refreshControlls(config) }, // refreshControlls
            ()=>{this.taskTab.refreshTable()},
            
        )
         // инициализация компонента вкладки книг
        this.taskTab.init(
            (config) => { this.refreshControlls(config) }, // refreshControll
            f
        )
        // инициализация компонента вкладки сотрудников
        this.employeeTab.init(
            (config) => { this.refreshControlls(config) }, // refreshControlls
            ()=>{this.taskTab.ChangeEmployees()}
        )

        
        // инициализация компонента окна входа в приложение
      //    this.mainWindow.init(false)
        this.mainWindow.init(
            () => { location.replace('/') }, // onLogin
        )
    }
    // метод отрисовки главной конфигурации представления
    config() {
        webix.ui(this.mainWindow.config())
       
        return WorkedPlaceView(this.taskTab, this.employeeTab, this.progectTab, this. userInfo)
    }

    attachEvents() {
        this.view = {
            tabbar: $$('main-tabbar'),
            multiviews: $$('main-views'),
            workedPlace: $$('workedPlace'),
            tabControllsContainer: $$('main'),
            datatable: $$('progectTabDatatable'),
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
                 this.taskTab.attachEvents()
                 this.employeeTab.attachEvents()
                 this.progectTab.attachEvents()
                 // переключение таба
                this.view.tabbar.attachEvent('onAfterSelect', (id) =>{
                        
                        if (!this.view.datatable.getSelectedItem()) {
                            if(!(id=='ProgectTabView')){
                                $$(this.view.tabbar).select('ProgectTabView');  
                                webix.message("Выберите проект")                     
                            }
                            
                            return 
                        }
                        
                        $$("form1").showBatch(id);
                        $$("tab-controlls").showBatch(id);
                      }
                    
                )
            } else {
                this.view.workedPlace.hide()
            }
         })

        // вызов обработки событий окна входа в приложение
        this.mainWindow.attachEvents( this.view.workedPlace)

        // первоночальное состояние приложения
         this.view.workedPlace.hide()
         this.mainWindow.switch(this.view.workedPlace)
    }
   refreshSelectProgect(){
     //console.log( this.progectTab.GetSelectProgect())
       return  'progectTabDatatable'

   }

    refreshControlls(config) {
        webix.ui(config, this.view.tabControllsContainer, $$('tab-controlls'))
    }
}
// константы перечисления табов(id представления)
export const APP_TAB = {
    tasksTab: 'taskTab',
    employeesTab: 'employeeTab',
    progectsTab: 'progectTab',
}