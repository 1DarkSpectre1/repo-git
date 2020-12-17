webix.ui({

cols:[{
 rows:[{
    cols:[ {height: 30, template:"Склад" },
    { view:"button",value: 'Добавить товар на Склад',
            click:function(){ 
                $$("win").getBody().clear();
                $$("win").show();
                $$("win").getBody().focus();
            }
        }
         
        ]},
   
    { view:"datatable", id:"storage", 
    columns:[   
        { id:"title", header:"Название"},    
        { id:"vol", header:"Количество"},
    ],
     data:storagedata, select:true, on:{
    	onItemClick: function () {//Обработка нажатия на строку
    		selected=$$("storage").getSelectedId();//запоминаем id товара на который кликнули
    		changeVol(selected,storagedata,basketdata);
            refresh()//обновляем данные
    	}
    }},
   
  ]},

{  rows:[
    {height: 30, template:"Корзина" },
    { view:"datatable", id:"basket",
    columns:[   
        { id:"title", header:"Название"},    
        { id:"vol", header:"Количество"},
    ],
     data:basketdata,select:true, on:{
    	onItemClick: function () {//Обработка нажатия на строку
    		selected=$$("basket").getSelectedId();//запоминаем id товара на который кликнули
    		changeVol(selected,basketdata,storagedata);
            refresh()//обновляем данные
    	}
    }  },
    {height:100, view:"datatable",  columns:[   
        { id:"title", header:"Название",},    
        { id:"vol", header:"Количество"},
    ],
      id:"basketsumm", data:basketsummdata}
  
  ]}
  ]
});

webix.ui({
            view:"window",
            id:"win",
            width:300,
            position:"center",
            modal:true,
            head:"Добавление товара",
            body:webix.copy(form)
        });