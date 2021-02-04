// возвращает webix конфигурации таба для работы с событиями
export default function ToolbarView() {
    return {
        view: 'toolbar',
        padding:3,
        elements: [
            { view: "icon", icon: "menu", click: function(){
               $$("main-tabbar").toggle();
             }
            },
            { view: "label", label: "Task manager"},
            {},
            {
                view: 'label',
                id: 'userInfoLabel',
                label: 'загрузка...',
                width: 200,
            },
            {
                view: 'button',
                id: 'logoutBtn',
                css: 'webix_secondary',
                label: 'Выход',
                width: 150,
            },
          ],
    }
}