import {
    TaskTabView,
    TaskTabContextMenu,
    TabControllsView
} from './TaskTabView.js'
import {
    CTaskWindow,
    TASK_WINDOW_TYPE
} from './taskWindow/CTaskWindow.js'
import taskModel from './../../models/taskModel.js'
import employeeModel from './../../models/employeeModel.js'
import {
    Task,
    TASK_STATUS
} from './../../models/entities/task.js'
//import { error } from 'console'


// класс таба 'Задачи'
export class CTaskTab {
    constructor() {
        this.view // объект для быстрого доступа к представлениям
        this.window // экземпляр окна для работы с задачами
        this.names // массив сотрудников в сабменю
        this.viewProgectDatatable //таблица проектов
        this.selectProgect
    }

    // метод инициализации компонента
    init() {
        
        this.names = []
        this.window = new CTaskWindow() // инициализация компонента окна
        this.window.init(
            () => {
                this.refreshTable()
            },
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
            progectdatatable: $$('progectTabDatatable'),
            datatable: $$('taskTabDatatable'),
            datatableContextMenu: $$('taskTabDatatableContextMenu'),
            controlls: $$('tasktab-controlls'),
            label:{
                tasks: $$("task-tab-label-tasks"),
                completedTasks:$$("task-tab-label-completed-tasks"),
            },
            btns: {
                viewingTask: $$('tasktab-viewing-btn'),
                backTasksbtn: $$('tasktab-backtasks-btn'),
                completedbtn: $$('tasktab-completed-btn'),
                checktaskbtn: $$('tasktab-checktask-btn'),
                finishbtn: $$('tasktab-finish-btn'),
                playBtn: $$('tasktab-play-btn'),
                pauseBtn: $$('tasktab-pause-btn'),
                createBtn: $$('tasktab-add-btn'),
                updateBtn: $$('tasktab-edit-btn'),
                deleteBtn: $$('tasktab-remove-btn'),
            }
        }
        //console.log(this.view) 
        webix.extend(this.view.datatable, webix.ProgressBar);

        this.view.datatable.attachEvent('onSelectChange', () => {

            var selected = this.view.datatable.getSelectedItem()
            if (selected) {
                switch (selected.status) {
                    case TASK_STATUS.work:
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.give)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.playBtn.hide()
                        this.view.datatableContextMenu.enableItem(TASK_CONTEXT_MENU.pause)
                        this.view.btns.pauseBtn.show()
                        this.view.btns.finishbtn.show()
                        this.view.btns.checktaskbtn.show()
                        break
                    case TASK_STATUS.pause:
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.give)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.pause)
                        this.view.btns.playBtn.show()
                        this.view.btns.finishbtn.show()
                        this.view.btns.checktaskbtn.show()
                        this.view.datatableContextMenu.enableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.pauseBtn.hide()
                        break
                    case TASK_STATUS.appointed:
                        this.view.datatableContextMenu.enableItem(TASK_CONTEXT_MENU.give)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.pause)
                        this.view.btns.playBtn.show()
                        this.view.datatableContextMenu.enableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.pauseBtn.hide()
                        this.view.btns.finishbtn.hide()
                        this.view.btns.checktaskbtn.hide()
                        break
                    case TASK_STATUS.not_assigned:
                        this.view.datatableContextMenu.enableItem(TASK_CONTEXT_MENU.give)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.pause)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.pauseBtn.hide()
                        this.view.btns.playBtn.hide()
                        this.view.btns.finishbtn.hide()
                        this.view.btns.checktaskbtn.hide()
                        break
                    case TASK_STATUS.new_task:
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.give)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.pause)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.pauseBtn.hide()
                        this.view.btns.playBtn.hide()
                        this.view.btns.finishbtn.hide()
                        this.view.btns.checktaskbtn.hide()
                        break
                    case TASK_STATUS.finish:
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.give)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.pause)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.pauseBtn.hide()
                        this.view.btns.playBtn.hide()
                        this.view.btns.finishbtn.hide()
                        this.view.btns.checktaskbtn.hide()
                        break
                    case TASK_STATUS.approval:
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.give)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.pause)
                        this.view.datatableContextMenu.disableItem(TASK_CONTEXT_MENU.start)
                        this.view.btns.pauseBtn.hide()
                        this.view.btns.playBtn.hide()
                        this.view.btns.finishbtn.hide()
                        this.view.btns.checktaskbtn.hide()
                        break
                    default:
                        break
                }
            }
        })
        //просмотр задачи
        this.view.btns.viewingTask.attachEvent('onItemClick', () => {
            this.viewingTask()
        })
        // возврат к текущим задачам
        this.view.btns.backTasksbtn.attachEvent('onItemClick', () => {
            this.refreshTable()
        })
        // Показ завершенных задачи
        this.view.btns.completedbtn.attachEvent('onItemClick', () => {
            this.showCompletedTasks()
        })
        // Завершение задачи
        this.view.btns.finishbtn.attachEvent('onItemClick', () => {
            this.finishTask()
        })
        // На согласование 
        this.view.btns.checktaskbtn.attachEvent('onItemClick', () => {
            this.approvalTask()
        })
        // Начало работы задачи
        this.view.btns.playBtn.attachEvent('onItemClick', () => {
            this.startTask()
        })
        // Приостановление задачи
        this.view.btns.pauseBtn.attachEvent('onItemClick', () => {
            this.pauseTask()
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
                this.names.push({
                    ID: employee.id,
                    id: employee.id,
                    value: `${employee.lastname} ${employee.firstname}`
                })
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
    //функция обновление выделенного элемента проекта
    refreshSelectProgect(selected){
      //  console.log(selected)
        this.selectProgect=selected
    }
    //обновление масива содрудников
    refreshEmployees() {
        employeeModel.getEmployees().then((employees) => {
            // проверка наличия данных
            if (!employees) {
                return
            }
            this.names = []
            employees.map((employee) => {
                this.names.push({
                    ID: employee.id,
                    id: employee.id,
                    value: `${employee.lastname} ${employee.firstname}`
                })
            })
            this.view.datatableContextMenu.getItem(TASK_CONTEXT_MENU.give).submenu = this.names
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
                this.pauseTask()
                break
            case TASK_CONTEXT_MENU.start: // Начало работы задачи
                this.startTask()
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

        task.fk_employee = employee.id
        //  проверка статуса задачи
        if (task.status === TASK_STATUS.not_assigned) {
            task.status = TASK_STATUS.appointed
        }
        taskModel.updateTask(task).then(() => {
            this.refreshTable()
        })
    }

    

    // функция обновления таблицы задач
    refreshTable() {
        if (!this.selectProgect) {
            console.error('Не выбран проект')
            webix.message('Не выбран проект','error')
            return
        } else {
            //запрещаем действия с таблицей пока не получены данные
            this.view.datatable.disable();
            this.view.datatable.showProgress({
            type:"top",
          delay:10000,
          hide:true
        });
        //обновление видимости кнопок
            this.view.btns.pauseBtn.hide()
            this.view.btns.playBtn.hide()
            this.view.btns.finishbtn.hide()
            this.view.btns.checktaskbtn.hide()
            this.view.btns.backTasksbtn.hide()
            this.view.btns.viewingTask.hide()
            this.view.label.completedTasks.hide()
            this.view.label.tasks.show()
            this.view.btns.completedbtn.show()
            this.view.btns.createBtn.show()
            this.view.btns.updateBtn.show()
            this.view.btns.deleteBtn.show()
            taskModel.getTasksByIDProgect(this.selectProgect.ID).then((tasks) => {
                // заполнение таблицы окна данными задачи
                if (tasks) {
                    tasks.forEach(task => {
                        task.fk_progect = this.selectProgect.ID
                        task.id = task.ID
                        employeeModel.getEmployeeByID(task.fk_employee).then((employee) => {
                            task.employee = `${employee.lastname} ${employee.firstname}`
                            this.view.datatable.refresh()
                        })
                    });
                }

                this.view.datatable.clearAll()
                this.view.datatable.parse(tasks)
                this.view.datatable.enable();
            })
        }
    }

    showCompletedTasks() {
        var selected = this.selectProgect
        if (!selected) {
            console.log('Не выбран проект')
            return
        } else {
            this.view.btns.pauseBtn.hide()
            this.view.btns.playBtn.hide()
            this.view.btns.finishbtn.hide()
            this.view.btns.checktaskbtn.hide()
            this.view.btns.createBtn.hide()
            this.view.btns.updateBtn.hide()
            this.view.btns.completedbtn.hide()
            this.view.label.tasks.hide()
            this.view.label.completedTasks.show()
            this.view.btns.backTasksbtn.show()
            this.view.btns.viewingTask.show()
            taskModel.getCompletedTasksByIDProgect(selected.ID).then((tasks) => {
                // заполнение таблицы окна данными задачи
                if (tasks) {
                    tasks.forEach(task => {
                        task.fk_progect = selected.ID
                        task.id = task.ID
                        employeeModel.getEmployeeByID(task.fk_employee).then((employee) => {
                            task.employee = `${employee.lastname} ${employee.firstname}`
                            this.view.datatable.refresh()
                        })
                    });
                }

                this.view.datatable.clearAll()
                this.view.datatable.parse(tasks)
            })
        }
    }
    //функция просмотра задачи
    viewingTask() {
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
        // заполнение полей окна данными задачи
        this.window.parse(selected)
        this.window.switch(TASK_WINDOW_TYPE.viewing)
        // })
    }
    //функция завершения задачи
    finishTask() {
        let selected = this.view.datatable.getSelectedItem()
        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.id) {
            console.error('Incorrect ID of item:', selected.id)
            return
        }
        //console.log(selected.fact_hours)
        if (selected.fact_hours===0||selected.fact_hours===null) {
            webix.message('Заполните факт часы')
            return
        }
        selected.status = TASK_STATUS.finish
        taskModel.updateTask(selected).then(() => {
            this.refreshTable()
        })
    }
    //функция отравления задачи на согласование
    approvalTask() {
        let selected = this.view.datatable.getSelectedItem()
        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.id) {
            console.error('Incorrect ID of item:', selected.id)
            return
        }
        selected.status = TASK_STATUS.approval
        taskModel.updateTask(selected).then(() => {
            this.refreshTable()
        })
    }
    //функция начала работы задачи
    startTask() {
        let selected = this.view.datatable.getSelectedItem()
        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.id) {
            console.error('Incorrect ID of item:', selected.id)
            return
        }
        selected.status = TASK_STATUS.work
        taskModel.updateTask(selected).then(() => {
            this.refreshTable()
        })
    }
    //функция приостановления работы задачи
    pauseTask() {
        let selected = this.view.datatable.getSelectedItem()
        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.id) {
            console.error('Incorrect ID of item:', selected.id)
            return
        }
        selected.status = TASK_STATUS.pause
        taskModel.updateTask(selected).then(() => {
            this.refreshTable()
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
            this.window.parse(selected)
            this.window.switch(TASK_WINDOW_TYPE.update, selected.status)
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
        //selected.employee=selected.fk_employee
        // заполнение полей окна данными задачи
        this.window.parse(selected)
        this.window.switch(TASK_WINDOW_TYPE.delete)
        // })
    }

}

// допустимые значения пунктов контекстного меню таба задачи
export const TASK_CONTEXT_MENU = {
    give: 'Назначить',
    start: 'Начать работу',
    pause: 'Приостановить',
    add: 'Добавить',
    edit: 'Изменить',
    remove: 'Удалить'
}