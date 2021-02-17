import { EmployeeTabView,EmployeeTabContextMenu,  TabControllsView } from './EmployeeTabView.js';
import { CEmployeeWindow, EMPLOYEE_WINDOW_TYPE } from './employeeWindow/CEmployeeWindow.js';
import { Employee } from './../../models/entities/employee.js';
import employeeModel from './../../models/employeeModel.js';
import taskModel from './../../models/taskModel.js';

// класс таба 'Сотрудники'
export class CEmployeeTab {
    constructor() {
        this.view               // объект для быстрого доступа к представлениям
        this.window             // экземпляр окна для работы с книгами
       }

    // метод инициализации компонента
    init(ChangeEmployees) {     
         this.window = new CEmployeeWindow(); // инициализация компонента окна
         this.window.init(
             () => { this.refreshTable() },
             ChangeEmployees
         ) // вызова инициализации компонента окна

    }

    // метод получения webix конфигурации компонента
    config() {
        // т.к. window и popup расположены не в дереве приложения, а поверх слоев, его нужно отрисовывать отдельно
         webix.ui(this.window.config())
         webix.ui(EmployeeTabContextMenu())

        // вызов функции представления
        return EmployeeTabView()
    }

    // метод получения webix конфигурации элементов управления таба
    configTabControlls() {
        return TabControllsView()
    }

    // // метод инициализации обработчиков событий компонента
    attachEvents() {
        // инициализация используемых представлений
        this.view = {
            datatable: $$('employeeTabDatatable'),
            datatableContextMenu: $$('employeeTabDatatableContextMenu'),
            controlls: $$('employeetab-controlls'),
            btns: {
                createBtn: $$('employeetab-add-btn'),
                updateBtn: $$('employeetab-edit-btn'),
                deleteBtn: $$('employeetab-remove-btn'),
            }
        }
        webix.extend(this.view.datatable, webix.ProgressBar);
        // создание сотрудника
        this.view.btns.createBtn.attachEvent('onItemClick', () => {
            this.createEmployee()
        })

        // изменение сотрудника
        this.view.btns.updateBtn.attachEvent('onItemClick', () => {
            this.updateEmployee()
        })

        // удаление сотрудника
        this.view.btns.deleteBtn.attachEvent('onItemClick', () => {
            this.deleteEmployee()
        })
        // инициализация обработчиков событий модального окна
        this.window.attachEvents()

        // прикрепление контекстного меню к таблице
        this.view.datatableContextMenu.attachTo(this.view.datatable)
    //     // загрузка первичных данных в таблицу
         this.refreshTable()

       // обработка события нажатия на пункт контекстного меню
     this.view.datatableContextMenu.attachEvent('onMenuItemClick', (id) => {
            // получение значения пункта, на которое произошло нажатие
            let item = this.view.datatableContextMenu.getItem(id).value
            this.handleContextMenu(item)
        });
     }

    // обработка выбора в контекстном меню
    handleContextMenu(item) {
        switch (item) {
            case EMPLOYEE_CONTEXT_MENU.edit: // редактирование сотрудника
                this.updateEmployee()
                break;
            case EMPLOYEE_CONTEXT_MENU.remove: // удаление сотрудника
                this.deleteEmployee()
                break;
            default:
                console.error(`Неизвестное значение пункта меню: ${item}.`);
                break;
        }
    }

    // функция обновления таблицы сотрудников
    refreshTable() {
        
            this.view.datatable.disable();
            this.view.datatable.showProgress({
                type:"top",
              delay:10000,
              hide:true
            });
            employeeModel.getEmployees().then((employees) => {
                this.view.datatable.clearAll()
                this.view.datatable.parse(employees)
                this.view.datatable.enable();
            })
    
    }

    

    // функция создания сотрудника
    createEmployee() {
        this.window.parse(new Employee())
        this.window.switch(EMPLOYEE_WINDOW_TYPE.create)
    }

    // функция изменения сотрудника
    updateEmployee() {
        // получение выделенного элемента
        let selected = this.view.datatable.getSelectedItem()
        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.id) {
            console.error('Incorrect ID of item:', selected.id)
            return
        }
        employeeModel.getEmployeeByID(selected.id).then((employee) => {
            // проверка наличия данных
            if (!employee) {
                return
            }
            
            this.window.parse(employee)
            this.window.switch(EMPLOYEE_WINDOW_TYPE.update)
        })
    }

    // функция удаления сотрудника
    deleteEmployee() {
        // получение выделенного элемента
        let selected = this.view.datatable.getSelectedItem()

        if (!selected) {
            webix.message('Выделите строку')
            return
        }
        if (!selected.id) {
            console.error('Incorrect ID of item:', selected.id)
            return
        }
         employeeModel.getEmployeeByID(selected.id).then((employee) => {
             // проверка наличия данных
             if (!employee) {
                 return
             }
             taskModel.getTaskByIDEmployee(selected.id).then((tasks)=>{
                 if (tasks) {
                    webix.message('Нельзя удалить сотрудника у которого есть задача')
                    return 
                 }
                this.window.parse(selected)
                this.window.switch(EMPLOYEE_WINDOW_TYPE.delete)
             })
        })
    }
}

// допустимые значения пунктов контекстного меню таба Книги
export const EMPLOYEE_CONTEXT_MENU = {
    add: 'Добавить',
    edit: 'Изменить',
    remove: 'Удалить'
}
