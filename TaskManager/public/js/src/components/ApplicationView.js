// возвращает webix конфигурацию рабочего пространства приложения



export default function WorkedPlaceView(taskTab, employeeTab, progectTab, userInfo) {
    return {
        id: 'workedPlace',
        
        rows: [
          userInfo.config(),
          {
                cols:[
                    {
                      view: "sidebar",
                     
                      id:"main-tabbar",
                      data: menu_data,
                      collapsed:true,
                      
                    },
                    {id:"form1",visibleBatch:"ProgectTabView", rows:[
                        {
                            id: 'main',         
                            height:35,
                            cols: [                             
                                {
                                    id: "tab-controlls",view:"toolbar", rows: [
                                        taskTab.configTabControlls(),
                                        employeeTab.configTabControlls(),
                                        progectTab.configTabControlls(),
                                    ]
                                },
                                 // элементы управления табов
                            ],
                        },
                        taskTab.config(),
                        employeeTab.config(),
                        progectTab.config(),
                    ]
                    },
                ]},]
    }
}

