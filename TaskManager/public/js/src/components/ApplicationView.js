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
                      data: [
                        {id:"ProgectTabView", value:"Проекты",icon: "mdi mdi-view-dashboard"},
                            {id: "TaskTabView", value:"Задачи",icon: "mdi mdi-table"},
                            {id: "EmployeeTabView", value:"Сотрудники",icon:"mdi mdi-account"},
                        ],
                      collapsed:true,
                      
                    },
                    {id:'main',visibleBatch:"ProgectTabView", rows:[
                        {
                            id: 'main-tab',         
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

