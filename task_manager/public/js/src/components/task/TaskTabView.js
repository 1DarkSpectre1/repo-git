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
                    { id: 'name', header: ['Название', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'description', header: ['Описание', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'employee', header: ['Сотрудник', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                    { id: 'status', header: ['Статус', { content: 'selectFilter' }], sort: 'string', width: 150, },
                    { id: 'sch_hours', header: ['План часы', { content: 'textFilter' }], sort: 'number', },
                    { id: 'fact_hours', header: ['Факт часы', { content: 'textFilter' }], sort: 'number',  },
                ],
                data: [],
                onContext: {},
            },
        ]
    }
}
export function TaskTabContextMenu(employees) {
    return {
        view: 'contextmenu',
        id: 'taskTabDatatableContextMenu',
        width: 155,
        data: [
            {
                view: 'icon',
                icon: 'wxi-user',
                value: TASK_CONTEXT_MENU.give,
                id: TASK_CONTEXT_MENU.give,
                submenu: employees,
            },
            {
                view: 'icon',
                value:TASK_CONTEXT_MENU.start,
                id:TASK_CONTEXT_MENU.start,
                icon: 'mdi mdi-play',
            },
            {                
                view: 'icon',
                icon: 'mdi mdi-pause',
                value:TASK_CONTEXT_MENU.pause,
                id:TASK_CONTEXT_MENU.pause,
            },
            {
                view: 'icon',
            icon: 'mdi mdi-pencil',
            value:TASK_CONTEXT_MENU.edit,
            id:TASK_CONTEXT_MENU.edit,
            },
            {
                view: 'icon',
            icon: 'wxi-trash',
            value:TASK_CONTEXT_MENU.remove,
            id:TASK_CONTEXT_MENU.remove,
            },
            
            
        ],
    }
}

export function TabControllsView() {
    return {
        id: 'tasktab-controlls',
        batch:"TaskTabView",
       hidden:true,
        cols: [
            
            {width: 60,},
            {  view: "label",align:"center", label: "Задачи",id:"task-tab-label-tasks",},
            { hidden:true, view: "label",align:"center", label: "Завершённые задачи",id:"task-tab-label-completed-tasks",},
            {
                id: 'tasktab-backtasks-btn',
                view: 'icon',
                hidden:true,
                tooltip: 'Возврат к текущим задачам',
                icon: 'mdi mdi-backup-restore',
                width: 30,
            },
            {
                id: 'tasktab-viewing-btn',
                view: 'icon',
                hidden:true,
                tooltip: 'Просмотр задачи',
                icon: 'mdi mdi-movie',
                width: 30,
            },
            {
                id: 'tasktab-completed-btn',
                view: 'icon',
               // hidden:true,
                tooltip: 'Завершенные',
                icon: 'mdi mdi-podium',
                width: 30,
            },
            {
                id: 'tasktab-checktask-btn',
                view: 'icon',
                hidden:true,
                tooltip: 'На согласование',
                icon: 'mdi mdi-clipboard',
                width: 30,
            },
            {
                id: 'tasktab-finish-btn',
                view: 'icon',
                hidden:true,
                tooltip: 'Завершить задачу',
                icon: 'mdi mdi-check-circle',
                width: 30,
            },
            {
                id: 'tasktab-play-btn',
                view: 'icon',
                hidden:true,
                tooltip: 'Начать работу',
                icon: 'mdi mdi-play-circle',
                width: 30,
            },
            {
                id: 'tasktab-pause-btn',
                view: 'icon',
                icon: 'mdi mdi-pause-circle',
                hidden:true,
                tooltip: 'Приостановить',
                width: 30,
            },
            {
                id: 'tasktab-add-btn',
                view: 'icon',
                tooltip: 'Добавить',
                icon: 'mdi mdi-plus-circle',
                width: 30,
            },
            {
                id: 'tasktab-edit-btn',
                view: 'icon',
                tooltip: 'Редактировать',
                icon: 'mdi mdi-pencil-circle',
                width: 30,
            },
            {
                id: 'tasktab-remove-btn',
                view: 'icon',
                tooltip: 'Удалить',
                icon: 'mdi mdi-delete-circle',
                width: 30,
            },
            
        ]
    }
}
