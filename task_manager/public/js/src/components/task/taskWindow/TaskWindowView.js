import { TASK_WINDOW_TYPE } from './CTaskWindow.js';

// возвращает webix конфигурацию окна для работы с сущностью книги
export default function TaskWindowView(type) {
    let headText = 'Задача' // текст заголовка модального окна

    switch (type) {
        case TASK_WINDOW_TYPE.create:
            headText = 'Добавление задачи'
            break;
        case TASK_WINDOW_TYPE.update:
            headText = 'Редактирование задачи'
            break;
        case TASK_WINDOW_TYPE.delete:
            headText = 'Удаление задачи'
            break;
    }

    return {
        view: 'window',
        id: 'taskWindow',
        head: {
            view: 'template',
            id: 'taskWindowLabel',
            template: headText,
            css: 'webix_template'
        },
        modal: true,
        position: 'center',
        width: 400,
        body: {
            view: 'form',
            id: 'taskWindowForm',
            elements: [
                
                {
                    view: 'text',
                    id: 'taskWindowFormName',
                    label: 'Название',
                    name: 'name',
                    required: true,
                    labelWidth: 150,
                },
                {
                    view: 'textarea',
                    id: 'taskWindowFormDescription',
                    label: 'Описание',
                    name: 'description',
                   
                    labelWidth: 150,
                },
                {
                    view: 'richselect',
                    id: 'taskWindowFormEmployee',
                    label: 'Сотрудник',
                    name: 'fk_employee',
                    labelWidth: 150,
                    options:[]
                },
                {
                    view: 'text',
                    id: 'taskWindowFormStatus',
                    label: 'Статус',
                    name: 'status',
                    labelWidth: 150,
                },
                {
                    view: 'text',
                    id: 'taskWindowFormSchHours',
                    label: 'План часы',
                    name: 'sch_hours',
                   
                    labelWidth: 150,
                },
                {
                    view: 'text',
                    id: 'taskWindowFormFactHours',
                    label: 'Факт часы',
                    name: 'fact_hours',
                    
                    labelWidth: 150,
                },
                {
                    cols: [
                        {
                            view: 'button',
                            id: 'taskWindowConfirmBtn',
                            value: 'Применить',
                        },
                        {
                            view: 'button',
                            id: 'taskWindowCancelBtn',
                            value: 'Отмена',
                        },
                    ]
                },
            ]
        }
    }
}