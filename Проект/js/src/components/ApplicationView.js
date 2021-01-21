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
                      data: menu_data,
                      collapsed:true,
                      on:{
                        onAfterSelect: function(id){
                          $$("form1").showBatch(id);
                        }
                      }
                    },
                    {id:"form1",visibleBatch:"ProgectTabView", rows:[
                        {
                            id: 'main',
                            batch:"ProgectTabView",
                            height:35,
                            cols: [
                              
                                {},
                                
                                {
                                    id: 'tab-controlls',
                                    
                                    rows: [
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

