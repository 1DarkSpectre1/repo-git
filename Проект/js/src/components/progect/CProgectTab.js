import { ProgectTabView,  ProgectTabContextMenu, TabControllsView } from './ProgectTabView.js';
import { CProgectWindow, PROGECT_WINDOW_TYPE } from './ProgectWindow/CProgectWindow.js';
import { Progect } from '../../models/entities/progect.js'
// класс таба 'Сотрудники'
export class CProgectTab {
    constructor() {
        this.refreshControlls   // функция обновления элементов управления в header'е
        this.view               // объект для быстрого доступа к представлениям
        this.window             // экземпляр окна для работы с книгами 
    }
    init( refreshControlls) {
        this.refreshControlls = refreshControlls // функция обновления элементов управления в header'е

         this.window = new CProgectWindow(); // инициализация компонента окна
         this.window.init(
             () => { this.refreshTable() }
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
    //     this.refreshTable()

        // обработка события нажатия на пункт контекстного меню
        this.view.datatableContextMenu.attachEvent('onMenuItemClick', (id) => {
            // получение значения пункта, на которое произошло нажатие
            let item = this.view.datatableContextMenu.getItem(id).value
            this.handleContextMenu(item)
        });

     }
    
    switchControlls() {
        switch (this.view.controlls.isVisible()) {
            case true:
                this.hidControlls()
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
      // // функция создания сотрудника
    createProgect() {
        this.window.parse(new Progect())
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
        // employeeModel.getEmployeeByID(selected.ID).then((employee) => {
        //     // проверка наличия данных
        //     if (!employee) {
        //         return
        //     }

            this.window.parse(selected)
            this.window.switch(PROGECT_WINDOW_TYPE.update)
       // })
    }
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
        // employeeModel.getEmployeeByID(selected.ID).then((employee) => {
        //     // проверка наличия данных
        //     if (!employee) {
        //         return
        //     }

            this.window.parse(selected)
            this.window.switch(PROGECT_WINDOW_TYPE.delete)
      //  })
    }
}
export const PROGECT_CONTEXT_MENU = {
    add: 'Добавить',
    edit: 'Изменить',
    remove: 'Удалить'
}