import { TaskTabView,TaskTabContextMenu,  TabControllsView } from './TaskTabView.js'
import { CTaskWindow, TASK_WINDOW_TYPE } from './taskWindow/CTaskWindow.js'
import taskModel from '../../models/taskModel.js'
 import employeeModel from '../../models/employeeModel.js'
 import { Task, TASK_STATUS } from '../../models/entities/task.js'

// класс таба 'Задачи'
export class CTaskTab {
    constructor() {
        this.refreshControlls       // функция обновления элементов управления в header'е
        this.view                   // объект для быстрого доступа к представлениям
        this.window                 // экземпляр окна для работы с книгами
        this.updateEventsDatatable  // функция обновления таблицы событий
        this.names                  // массив сотрудников в сабменю
    }

    // метод инициализации компонента
    init( refreshControlls) {
        this.refreshControlls = refreshControlls            // функция обновления элементов управления в header'е

         this.window = new CTaskWindow() // инициализация компонента окна
         this.window.init(
             () => { this.refreshTable() }
         ) // вызова инициализации компонента окна

        this.names = [] // массив сотрудников в сабменю
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
                createBtn: $$('tasktab-add-btn'),
                updateBtn: $$('tasktab-edit-btn'),
                deleteBtn: $$('tasktab-remove-btn'),
            }
        }

        // создание книги
        this.view.btns.createBtn.attachEvent('onItemClick', () => {
            this.createTask()
        })

        // изменение книги
        this.view.btns.updateBtn.attachEvent('onItemClick', () => {
            this.updateTask()
        })

        // удаление книги
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
                this.names.push({ ID: employee.ID, value: `${employee.lastname} ${employee.firstname}` })
            })
        })

         // инициализация обработчиков событий модального окна
         this.window.attachEvents()

        // прикрепление контекстного меню к таблице
         this.view.datatableContextMenu.attachTo(this.view.datatable)

         // загрузка первичных данных в таблицу
         this.refreshTable()

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

    // обработка выбора в контекстном меню
    handleContextMenu(item) {
        switch (item) {
            case TASK_CONTEXT_MENU.edit: // редактирование выделленой книгиbreak
                this.updateTask()
                break
            case TASK_CONTEXT_MENU.remove: // удаление выделенной книгиbreak
                this.deleteTask()
                break
            case TASK_CONTEXT_MENU.take: // добавление книги
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

                // проверка статуса книги
                if (task.status === TASK_STATUS.available) {
                    webix.message('Задача не выдана')
                    return
                }

                eventModel.createTakeEvent(task.ID).then(() => {
                    this.refreshTable()
                })
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
        
        task.employee=employee.value
        // проверка статуса книги
        // if (task.status === TASK_STATUS.notAvailable) {
        //     webix.message('Задача уже выдана')
        //     return
        // }

        // eventModel.createGiveEvent(task.ID, employee.ID).then(() => {
           //  this.refreshTable()
        // })
    }
    
    // функция обновления таблицы книг
    refreshTable() {
        var selected =this.view.progectdatatable.getSelectedItem()
         if (!selected) {
         //   this.view.datatable.clearAll()
         //   this.view.datatable.parse(tasks)
             return
         } else {
          
       taskModel.getTasksByIDProgect(selected.ID).then((tasks) => {
                // заполнение таблицы окна данными книги
                if (tasks) {
                    tasks.forEach(task => {
                        task.fk_progect=selected.ID
                        employeeModel.getEmployeeByID(task.fk_employee).then((employee)=>{
                            task.employee=`${employee.lastname} ${employee.firstname}`
                        })
                    });
                }

                 this.view.datatable.clearAll()
                 this.view.datatable.parse(tasks)
        })
    }
}
    

//     // метод отображения таба с фильтрацией по книге
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

    // функция создания книги
    createTask() {
        this.window.parse(new Task())
        this.window.switch(TASK_WINDOW_TYPE.create)
    }

    // функция изменения книги
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
        
        // taskModel.getTaskByID(selected.ID).then((task) => {
        //     // проверка наличия данных
        //     if (!task) {
        //         return
        //     }

        //     // преобразование даты издания
        //     let time = new Date(task.year)
        //     task.year = time.getFullYear()

        //     // заполнение полей окна данными книги
             this.window.parse(selected)
             this.window.switch(TASK_WINDOW_TYPE.update)
        // })
    }

    // функция удаления книги
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
       
        // taskModel.getTaskByID(selected.ID).then((task) => {
        //     // проверка наличия данных
        //     if (!task) {
        //         return
        //     }
        //     // проверка выданности книги
        //     if (task.status === TASK_STATUS.notAvailable) {
        //         webix.message('Нельзя удалить выданную книгу')
        //         return
        //     }

        //     // преобразование даты издания
        //     let time = new Date(task.year)
        //     task.year = time.getFullYear()

             // заполнение полей окна данными книги
             this.window.parse(selected)
             this.window.switch(TASK_WINDOW_TYPE.delete)
        // })
    }
 }

// допустимые значения пунктов контекстного меню таба Книги
export const TASK_CONTEXT_MENU = {
    give: 'Назначить',
    add: 'Добавить',
    edit: 'Изменить',
    remove: 'Удалить'
 }