import { EMPLOYEE_CONTEXT_MENU } from './CEmployeeTab.js'

// возвращает webix конфигурации таба для работы с сотрудникамиы
export function EmployeeTabView() {
    return {
        id: 'employeeTab',
        batch:"EmployeeTabView",
        rows: [
            {
                view: 'datatable',
                id: 'employeeTabDatatable',
                select: true,
                columns: [
                    { id: 'ID', header: ['', { content: 'textFilter' }], hidden: true },
                    { id: 'lastname', header: ['Фамилия', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'firstname', header: ['Имя', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'middlename', header: ['Отчество', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'position', header: ['Должность', { content:'selectFilter' }], sort: 'string', fillspace: true, },
                    { id: 'phone_number', header: ['Телефонный номер', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'email', header: ['Email', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                ],
                data: [],
                onContext: {},
            },
        ]
    }
}
// возвращает webix конфигурации контекстного меню таба
export function EmployeeTabContextMenu() {
    return {
        view: 'contextmenu',
        id: 'employeeTabDatatableContextMenu',
        data: [
            EMPLOYEE_CONTEXT_MENU.edit, 
            EMPLOYEE_CONTEXT_MENU.remove
        ],
    }
}

// элементы управления для таба
export function TabControllsView() {
    return {
        id: 'employeetab-controlls',
        batch:"EmployeeTabView",
        hidden:true,
        cols: [
            { view: "label",align:"center", label: "Сотрудники"},
            {
                id: 'employeetab-add-btn',
                view: 'icon',
                tooltip: 'Добавить',
                icon: 'mdi mdi-plus-circle',
                width: 30,
            },
            {
                id: 'employeetab-edit-btn',
                view: 'icon',
                tooltip: 'Редактировать',
                icon: 'mdi mdi-pencil-circle',
                width: 30,
            },
            {
                id: 'employeetab-remove-btn',
                view: 'icon',
                tooltip: 'Удалить',
                icon: 'mdi mdi-delete-circle',
                width: 30,
            },
            
        ]
    }
}