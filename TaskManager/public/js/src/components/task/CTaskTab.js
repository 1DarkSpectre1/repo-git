import { TaskTabView,TaskTabContextMenu,  TabControllsView } from './TaskTabView.js'
import { CTaskWindow, TASK_WINDOW_TYPE } from './taskWindow/CTaskWindow.js'
import taskModel from './../../models/taskModel.js'
 import employeeModel from './../../models/employeeModel.js'
 import { Task, TASK_STATUS } from './../../models/entities/task.js'


// класс таба 'Задачи'
export class CTaskTab {
    constructor() {
        this.refreshControlls       // функция обновления элементов управления в header'е
        this.view                   // объект для быстрого доступа к представлениям
        this.window                 // экземпляр окна для работы с задачами
        this.updateEventsDatatable  // функция обновления таблицы событий
        this.names                  // массив сотрудников в сабменю
        this.GetSelectProgect
        
    }

    // метод инициализации компонента
    init( refreshControlls,f) {
        this.GetSelectProgect=f;
        this.refreshControlls = refreshControlls            // функция обновления элементов управления в header'е
        this.names = []
        this.window = new CTaskWindow() // инициализация компонента окна
         this.window.init(
             () => { this.refreshTable() },
             this.names
         ) // вызова инициализации компонента окна
      //  this.names = [] // массив сотрудников в сабменю
    }

    // метод получения webix конфигурации компонента
    config() {
        // т.к. window и popup расположены не в дереве приложения, а поверх слоев, его нужно отрисовывать отдельно
        webix.ui(this.window.config())
        webix.ui(TaskTabContextMenu(this.names))

        // вызов функции представления
        return TaskTabView()
    }

    // метод получения webix конфигурации элементов управления таба
    configTabControlls() {
        return TabControllsView()
    }

    // метод инициализации обработчиков событий компонента
    attachEvents() {
        // инициализация используемых представлений
        this.view = {
            progectdatatable:$$('progectTabDatatable'),
            datatable: $$('taskTabDatatable'),
            datatableContextMenu: $$('taskTabDatatableContextMenu'),
            controlls: $$('tasktab-controlls'),
            btns: {
                playBtn:   $$('tasktab-play-btn'),
                pauseBtn:  $$('tasktab-pause-btn'),
                createBtn: $$('tasktab-add-btn'),
                updateBtn: $$('tasktab-edit-btn'),
                deleteBtn: $$('tasktab-remove-btn'),
            }
        }


        this.view.datatable.attachEvent('onSelectChange', () =>{
            ///switch()
            var selected =this.view.datatable.getSelectedItem()
            if (selected) {   
                switch (selected.status) {
                    case TASK_STATUS.work: // редактирование выделленой задачиbreak
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.playBtn.hide()
                        this.view.datatableContextMenu.enableItem(TASK_CONTEXT_MENU.pause)
                        this.view.btns.pauseBtn.show()
                        break
                    case TASK_STATUS.pause: // удаление выделенной задачиbreak
                    case TASK_STATUS.appointed:
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.pause)
                        this.view.btns.playBtn.show()
                        this.view.datatableContextMenu.enableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.pauseBtn.hide()
                        break
                    case TASK_STATUS.new_task:
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.pause)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.pauseBtn.hide()
                        this.view.btns.playBtn.hide()
                        break 
                    default:
                        break
                }
            }
        })
        // Начало работы задачи
        this.view.btns.playBtn.attachEvent('onItemClick', () => {
           
            this.StartTask()
        })
        // Приостановление задачи
        this.view.btns.pauseBtn.attachEvent('onItemClick', () => {          
            this.PauseTask()
        })
        // создание задачи
        this.view.btns.createBtn.attachEvent('onItemClick', () => {
            this.createTask()
        })

        // изменение задачи
        this.view.btns.updateBtn.attachEvent('onItemClick', () => {
            this.updateTask()
        })

        // удаление задачи
        this.view.btns.deleteBtn.attachEvent('onItemClick', () => {
            this.deleteTask()
        })

        // отложенное заполнение массива сотрудников в сабменю
        employeeModel.getEmployees().then((employees) => {
            // проверка наличия данных
            if (!employees) {
                return
            }

            employees.map((employee) => {
                this.names.push({ ID: employee.id,id: employee.id, value: `${employee.lastname} ${employee.firstname}` })
            })
        })

         // инициализация обработчиков событий модального окна
         this.window.attachEvents()

        // прикрепление контекстного меню к таблице
         this.view.datatableContextMenu.attachTo(this.view.datatable)
        
         // загрузка первичных данных в таблицу
        // this.refreshTable()

        // обработка события нажатия на пункт контекстного меню
        this.view.datatableContextMenu.attachEvent('onMenuItemClick', (itemID) => {
            // проверка вложенности выбранного пункта меню
            if (!this.view.datatableContextMenu.getItem(itemID)) {
                this.handleSubMenu(itemID)
            } else {
                // получение значения пункта, на которое произошло нажатие
                let item = this.view.datatableContextMenu.getItem(itemID).value
                this.handleContextMenu(item)
            }

        })
     }
ChangeEmployees(){
    employeeModel.getEmployees().then((employees) => {
        // проверка наличия данных
        if (!employees) {
            return
        }
        this.names=[]
        employees.map((employee) => {
            this.names.push({ ID: employee.id,id: employee.id, value: `${employee.lastname} ${employee.firstname}` })
        })
        this.view.datatableContextMenu.getItem(TASK_CONTEXT_MENU.give).submenu=this.names
        this.window.RefreshNames(this.names)
    })
}
    // обработка выбора в контекстном меню
    handleContextMenu(item) {
        switch (item) {
            case TASK_CONTEXT_MENU.edit: // редактирование выделленой задачи
                this.updateTask()
                break
            case TASK_CONTEXT_MENU.remove: // удаление выделенной задачи
                this.deleteTask()
                break
            case TASK_CONTEXT_MENU.pause: // Приостановление задачи  
                this.PauseTask()
                break
            case TASK_CONTEXT_MENU.start: // Начало работы задачи
                this.StartTask()
                break
            default:
                console.error(`Неизвестное значение пункта меню: ${item}.`)
                break
        }
    }

    // обработка выбора в submenu
    handleSubMenu(empItem) {
        // получения сотрудника из submenu
        let submenu = $$(this.view.datatableContextMenu.getItem(TASK_CONTEXT_MENU.give).submenu)
        let employee = submenu.getItem(empItem)
        // получение выделенного элемента
        let task = this.view.datatable.getSelectedItem()
        if (!task) {
            webix.message('Выделите строку')
            return
        }
        if (!task.id) {
            console.error('Incorrect ID of item:', task.id)
            return
        }
        
        task.fk_employee=employee.id
      //  проверка статуса задачи
        if (task.status == TASK_STATUS.new_task) {
            task.status=TASK_STATUS.appointed
        }
        taskModel.updateTask(task).then(() => {
            this.refreshTable()
        })
    }
    
    // функция обновления таблицы задач
    refreshTable() {
        var selected =$$('progectTabDatatable').getSelectedItem()
       // console.log(this.GetSelectProgect()) 
         if (!selected) {
             return
         } else {
          
       taskModel.getTasksByIDProgect(selected.ID).then((tasks) => {
                // заполнение таблицы окна данными задачи
                if (tasks) {
                    tasks.forEach(task => {
                       // console.log(selected.ID)
                        task.fk_progect=selected.ID
                        task.id=task.ID
                        //console.log(task)
                        employeeModel.getEmployeeByID(task.fk_employee).then((employee)=>{
                            task.employee=`${employee.lastname} ${employee.firstname}`
                            this.view.datatable.refresh()
                        })
                    });
                }

                 this.view.datatable.clearAll()
                 this.view.datatable.parse(tasks)
        })
    }
}
    

//     // метод отображения таба с фильтрацией по задаче
//     showByTaskID(taskID) {
//         taskModel.getTaskByID(taskID).then((task) => {
//             // проверка наличия данных
//             if (!task) {
//                 return
//             }

//             // выделение нужной строки
//             for (let rowID = 0; rowID < this.view.datatable.serialize().length; rowID++) {
//                 let item = this.view.datatable.serialize()[rowID]

//                 if (item.ID === taskID) {
//                     this.view.datatable.select(item.id)
//                     break
//                 }
//             }
//         })
//     }

    // функция переключения оторбажения элементов управления таба
    switchControlls() {
        switch (this.view.controlls.isVisible()) {
            case true:
                this.hideControlls()
                break;
            case false:
                this.showControlls()
                break;
        }
    }

    // функция отображения элементов управления таба
    showControlls() {
        this.view.controlls.show()
    }

    // функция сокрытия элементов управления таба
    hideControlls() {
        this.view.controlls.hide()
    }

 //функция начала работы задачи
 StartTask(){
    let selected = this.view.datatable.getSelectedItem()
    if (!selected) {
        webix.message('Выделите строку')
        return
    }
    if (!selected.id) {
        console.error('Incorrect ID of item:', selected.id)
        return
    }
    selected.status=TASK_STATUS.work
    taskModel.updateTask(selected).then(() => {
        this.refreshTable()
        this.view.btns.playBtn.hide()
    })
}
//функция приостановления работы задачи
PauseTask(){
    let selected = this.view.datatable.getSelectedItem()
    if (!selected) {
        webix.message('Выделите строку')
        return
    }
    if (!selected.id) {
        console.error('Incorrect ID of item:', selected.id)
        return
    }
    selected.status=TASK_STATUS.pause
    taskModel.updateTask(selected).then(() => {
        this.refreshTable()
        this.view.btns.pauseBtn.hide()
    })
}
    // функция создания задачи
    createTask(id) {
        this.window.parse(new Task())
        this.window.switch(TASK_WINDOW_TYPE.create)
    }

    // функция изменения задачи
    updateTask() {
        // получение выделенного элемента
        let selected = this.view.datatable.getSelectedItem()
       
        // проверка выделенного элемента
        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        // проверка наличия поля ID у выделенного элемента
        if (!selected.ID) {
            console.error('Incorrect ID of item:', selected.ID)
            return
        }
        
        taskModel.getTaskByID(selected.ID).then((task) => {
            // проверка наличия данных
            if (!task) {
                return
            }
            
            // заполнение полей окна данными задачи
            
             selected.employee=selected.fk_employee
             this.window.parse(selected)
             this.window.switch(TASK_WINDOW_TYPE.update)
        })
    }
   
    // функция удаления задачи
    deleteTask() {
        // получение выделенного элемента
        let selected = this.view.datatable.getSelectedItem()

        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.ID) {
            console.error('id of item is ', selected.ID)
            return
        }
            selected.employee=selected.fk_employee
             // заполнение полей окна данными задачи
             this.window.parse(selected)
             this.window.switch(TASK_WINDOW_TYPE.delete)
        // })
    }
 }

// допустимые значения пунктов контекстного меню таба задачи
export const TASK_CONTEXT_MENU = {
    give: 'Назначить',
    start:'Начать работу',
    pause:'Приостановить',
    add: 'Добавить',
    edit: 'Изменить',
    remove: 'Удалить'
 }