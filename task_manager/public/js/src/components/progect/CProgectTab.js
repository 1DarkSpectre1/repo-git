import {
    ProgectTabView,
    ProgectTabContextMenu,
    TabControllsView
} from './ProgectTabView.js';
import {
    CProgectWindow,
    PROGECT_WINDOW_TYPE
} from './ProgectWindow/CProgectWindow.js';
import {
    Progect
} from './../../models/entities/progect.js'
import progectModel from './../../models/progectModel.js';
import employeeModel from './../../models/employeeModel.js';
import taskModel from './../../models/taskModel.js';
import {
    CTaskTab
} from './../task/CTaskTab.js'
import authModel from '../../models/authModel.js'
// класс таба 'Сотрудники'
export class CProgectTab {
    constructor() {
        this.view // объект для быстрого доступа к представлениям
        this.window // экземпляр окна для работы с книгами 
        this.refreshTableTask
        this.refreshSelectProgect
        this.currentEmployee
        this.currentProgect
        this.setCurrentProgect
    }
    init(setCurrentProgect) {
        this.setCurrentProgect=setCurrentProgect// передача текущего выделенного элемента в таблице проектов
        this.window = new CProgectWindow(); // инициализация компонента окна
        this.window.init(
            () => {
                this.refreshTable()
            }
        ) // вызова инициализации компонента окна

    }

    // метод получения webix конфигурации компонента
    config() {
        webix.ui(this.window.config())
        webix.ui(ProgectTabContextMenu())

        // вызов функции представления
        return ProgectTabView()
    }

    // метод получения webix конфигурации элементов управления таба
    configTabControlls() {
        return TabControllsView()
    }

    attachEvents() {
        // инициализация используемых представлений
        this.view = {
            datatable: $$('progectTabDatatable'),
            datatableContextMenu: $$('progectTabDatatableContextMenu'),
            controlls: $$('progecttab-controlls'),
            btns: {
                createBtn: $$('progecttab-add-btn'),
                updateBtn: $$('progecttab-edit-btn'),
                deleteBtn: $$('progecttab-remove-btn'),
            }
        }

        webix.extend(this.view.datatable, webix.ProgressBar);
        //обновление таблицы задач при изменении проекта
        this.view.datatable.attachEvent('onSelectChange', () => {
            this.setCurrentProgect(this.getCurrentProgect())
        })
        // создание сотрудника
        this.view.btns.createBtn.attachEvent('onItemClick', () => {
            this.createProgect()
        })

        // изменение сотрудника
        this.view.btns.updateBtn.attachEvent('onItemClick', () => {
            this.updateProgect()
        })

        // удаление сотрудника
        this.view.btns.deleteBtn.attachEvent('onItemClick', () => {
            this.deleteProgect()
        })
        // инициализация обработчиков событий модального окна
        this.window.attachEvents()

        // прикрепление контекстного меню к таблице
        this.view.datatableContextMenu.attachTo(this.view.datatable)
        // загрузка первичных данных в таблицу
        this.refreshTable()

        // обработка события нажатия на пункт контекстного меню
        this.view.datatableContextMenu.attachEvent('onMenuItemClick', (id) => {
            // получение значения пункта, на которое произошло нажатие
            let item = this.view.datatableContextMenu.getItem(id).value
            this.handleContextMenu(item)
        });
        authModel.getCurrentEmployee().then((emp) => {
            // проверка наличия данных
            if (!emp) {
                return
            }

            this.currentEmployee = emp
        })
    }
    // получение текущего  выбранного проекта
     getCurrentProgect(){
         return this.view.datatable.getSelectedItem()
     }
    //обновление таблицы проектов
    refreshTable() {
        this.view.datatable.disable();
        this.view.datatable.showProgress({
            type:"top",
          delay:10000,
          hide:true
        });
        progectModel.getProgects().then((progects) => {
            progects.forEach(progect => {
                employeeModel.getEmployeeByID(progect.fk_employee).then((employee) => {
                    progect.employee = `${employee.lastname} ${employee.firstname}`
                    this.view.datatable.refresh()
                })
            });
            this.view.datatable.clearAll()
            this.view.datatable.parse(progects)
            this.view.datatable.enable();
        })
        // }
    }

     // функция создания сотрудника
    createProgect() {
        var newProgect = new Progect()
        newProgect.fk_employee = this.currentEmployee.id
        newProgect.employee = `${this.currentEmployee.lastname} ${this.currentEmployee.firstname}`

        this.window.parse(newProgect)
        this.window.switch(PROGECT_WINDOW_TYPE.create)
    }

    // функция изменения сотрудника
    updateProgect() {
        // получение выделенного элемента
        let selected = this.view.datatable.getSelectedItem()

        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.ID) {
            console.error('Incorrect ID of item:', selected.ID)
            return
        }
        this.window.parse(selected)
        this.window.switch(PROGECT_WINDOW_TYPE.update)
    }
    //выбор в контекстном меню
    handleContextMenu(item) {
        switch (item) {
            case PROGECT_CONTEXT_MENU.edit: // редактирование проекта
                this.updateProgect()
                break;
            case PROGECT_CONTEXT_MENU.remove: // удаление проекта
                this.deleteProgect()
                break;
            default:
                console.error(`Неизвестное значение пункта меню: ${item}.`);
                break;
        }
    }
    // функция удаления сотрудника
    deleteProgect() {
        // получение выделенного элемента
        let selected = this.view.datatable.getSelectedItem()

        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.ID) {
            console.error('Incorrect ID of item:', selected.ID)
            return
        }

        taskModel.getTasksByIDProgect(selected.ID).then((tasks) => {
            // заполнение таблицы окна данными книги
            if (tasks) {
                webix.message('Невозможно удалить проект в котором есть задачи')
                return
            }
            this.window.parse(selected)
            this.window.switch(PROGECT_WINDOW_TYPE.delete)
        })

    }
}
export const PROGECT_CONTEXT_MENU = {
    add: 'Добавить',
    edit: 'Изменить',
    remove: 'Удалить'
}