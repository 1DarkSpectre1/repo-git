// возвращает webix конфигурации таба для работы с событиями
export default function ToolbarView() {
    return {
        view: 'toolbar',
        css:"webix_shadow_medium",
        padding:3,
        elements: [
            { view: "icon", icon: "mdi mdi-menu", click: function(){
               $$("main-tabbar").toggle();
             }
            },
            { view: "label", label: "Task manager",css:{"font-style": "italic"}},
            {},
            {
                view: 'label',
                id: 'userInfoLabel',
                label: 'загрузка...',
                css:{"font-style": "italic"},
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