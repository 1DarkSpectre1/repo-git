import { TASK_CONTEXT_MENU } from './CTaskTab.js';


// возвращает webix конфигурацию таба для работы с задачами
export function TaskTabView() {
    return {
        id: 'taskTab',
        batch:"TaskTabView",
        rows: [
            {
                view: 'datatable',
                id: 'taskTabDatatable',
                select: true,
                columns: [
                    { id: 'ID', header: ['', { content: 'textFilter' }], hidden: true },
                    { id: 'name', header: ['Описание', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'employee', header: ['Сотрудник', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'status', header: ['Статус', { content: 'selectFilter' }], sort: 'string', fillspace: true, },
                    { id: 'sch_hours', header: ['План часы', { content: 'textFilter' }], sort: 'number', },
                    { id: 'fact_hours', header: ['Факт часы', { content: 'textFilter' }], sort: 'number',  },
                ],
                data: [],
                onContext: {},
            },
        ]
    }
}
export function TaskTabContextMenu() {
    return {
        view: 'contextmenu',
        id: 'taskTabDatatableContextMenu',
        data: [
            {
                value: TASK_CONTEXT_MENU.give,
                id: TASK_CONTEXT_MENU.give,
                submenu: employ,
            },
            TASK_CONTEXT_MENU.edit,
            TASK_CONTEXT_MENU.remove
        ],
    }
}

export function TabControllsView() {
    return {
        id: 'tasktab-controlls',
        batch:"TaskTabView",
       hidden:true,
        cols: [
            {
                id: 'tasktab-add-btn',
                view: 'icon',
                tooltip: 'Добавить',
                icon: 'mdi mdi-plus',
                width: 30,
            },
            {
                id: 'tasktab-edit-btn',
                view: 'icon',
                tooltip: 'Редактировать',
                icon: 'mdi mdi-pencil',
                width: 30,
            },
            {
                id: 'tasktab-remove-btn',
                view: 'icon',
                tooltip: 'Удалить',
                icon: 'mdi mdi-trash',
                width: 30,
            },
            { width: 30,  },
        ]
    }
}
