import { PROGECT_CONTEXT_MENU } from './CProgectTab.js'

// возвращает webix конфигурации таба для работы с сотрудникамиы
export function ProgectTabView() {
    return {
        id: 'progectTab',
        batch:"ProgectTabView",
        rows: [
            {
                view: 'datatable',
                id: 'progectTabDatatable',
                select: true,
                columns: [
                    { id: 'ID', header: ['', { content: 'textFilter' }], hidden: true },
                    { id: 'name', header: ['Описание', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'employee', header: ['Сотрудник', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                ],
                data: progects,
                onContext: {},
            },
        ]
    }
}

// возвращает webix конфигурации контекстного меню таба
export function ProgectTabContextMenu() {
    return {
        view: 'contextmenu',
        id: 'progectTabDatatableContextMenu',
        data: [
            PROGECT_CONTEXT_MENU.edit, 
            PROGECT_CONTEXT_MENU.remove
        ],
    }
}

// элементы управления для таба
export function TabControllsView() {
    return {
        id: 'progecttab-controlls',
        
        
        cols: [
            {
                id: 'progecttab-add-btn',
                view: 'icon',
                tooltip: 'Добавить',
                icon: 'mdi mdi-plus',
                width: 30,
            },
            {
                id: 'progecttab-edit-btn',
                view: 'icon',
                tooltip: 'Редактировать',
                icon: 'mdi mdi-pencil',
                width: 30,
            },
            {
                id: 'progecttab-remove-btn',
                view: 'icon',
                tooltip: 'Удалить',
                icon: 'mdi mdi-trash',
                width: 30,
            },
            { width: 30 },
        ]
    }
}