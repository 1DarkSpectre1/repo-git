import { ProgectTabView,  ProgectTabContextMenu, TabControllsView } from './ProgectTabView.js';

// класс таба 'Сотрудники'
export class CProgectTab {
    constructor() {
        this.refreshControlls   // функция обновления элементов управления в header'е
        this.view               // объект для быстрого доступа к представлениям
        this.window             // экземпляр окна для работы с книгами 
    }
    init( refreshControlls) {
        this.refreshControlls = refreshControlls // функция обновления элементов управления в header'е

        // this.window = new CEmployeeWindow(); // инициализация компонента окна
        // this.window.init(
        //     () => { this.refreshTable() }
        // ) // вызова инициализации компонента окна

    }

    // метод получения webix конфигурации компонента
    config() {
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


    //     // создание сотрудника
    //     this.view.btns.createBtn.attachEvent('onItemClick', () => {
    //         this.createEmployee()
    //     })

    //     // изменение сотрудника
    //     this.view.btns.updateBtn.attachEvent('onItemClick', () => {
    //         this.updateEmployee()
    //     })

    //     // удаление сотрудника
    //     this.view.btns.deleteBtn.attachEvent('onItemClick', () => {
    //         this.deleteEmployee()
    //     })
    //     // инициализация обработчиков событий модального окна
    //     this.window.attachEvents()

        // прикрепление контекстного меню к таблице
        this.view.datatableContextMenu.attachTo(this.view.datatable)
    //     // загрузка первичных данных в таблицу
    //     this.refreshTable()

    //     // обработка события нажатия на пункт контекстного меню
    //     this.view.datatableContextMenu.attachEvent('onMenuItemClick', (id) => {
    //         // получение значения пункта, на которое произошло нажатие
    //         let item = this.view.datatableContextMenu.getItem(id).value
    //         this.handleContextMenu(item)
    //     });
     }
}
export const PROGECT_CONTEXT_MENU = {
    add: 'Добавить',
    edit: 'Изменить',
    remove: 'Удалить'
}