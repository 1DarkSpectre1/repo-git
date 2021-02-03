import { PROGECT_WINDOW_TYPE } from './CProgectWindow.js';

// возвращает webix конфигурации окна для работы с сущностью сотрудника
export default function ProgectWindowView(type) {
    let headText = 'Сотрудник' // текст заголовка модального окна

    switch (type) {
        case PROGECT_WINDOW_TYPE.create:
            headText = 'Добавление сотрудника'
            break;
        case PROGECT_WINDOW_TYPE.update:
            headText = 'Редактирование сотрудника'
            break;
        case PROGECT_WINDOW_TYPE.delete:
            headText = 'Удаление сотрудника'
            break;
    }

    return {
        view: 'window',
        id: 'progectWindow',
        head: {
            view: 'template',
            id: 'progectWindowLabel',
            template: headText,
            css: 'webix_template'
        },
        modal: true,
        position: 'center',
        width: 400,
        body: {
            view: 'form',
            id: 'progectWindowForm',
            elements: [
                {
                    view: 'text',
                    id: 'progectWindowFormName',
                    label: 'Название',
                    name: 'name',
                    required: true,
                    labelWidth: 150,
                },
                {
                    view: 'textarea',
                    id: 'progectWindowFormDescription',
                    label: 'Описание',
                    name: 'description',
                    required: true,
                    labelWidth: 150,
                },
                {
                    view: 'text',
                    id: 'progectWindowFormEmployee',
                    label: 'Создатель проекта',
                    name: 'employee',
                    required: true,
                    labelWidth: 150,
                },
                {
                    cols: [
                        {
                            view: 'button',
                            id: 'progectWindowConfirmBtn',
                            value: 'Применить',
                        },
                        {
                            view: 'button',
                            id: 'progectWindowCancelBtn',
                            value: 'Отмена',
                        },
                    ]
                },
            ]
        }
    }
}