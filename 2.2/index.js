webix.ui({
cols:[{ rows:[
    {height: 30, template:"Склад" },
    { view:"datatable", id:"storage", 
    columns:[   
        { id:"title", header:"Название"},    
        { id:"vol", header:"Количество"},
    ],
     data:storagedata, select:true, on:{
    	onSelectChange: function () {//Обработка нажатия на строку
    		selected=$$("storage").getSelectedId();//запоминаем id товара на который кликнули
    		changeVol(selected,storagedata,basketdata);
            refresh()//обновляем данные
    	}
    }}
  ]},
{  rows:[
    {height: 30, template:"Корзина" },
    { view:"datatable", id:"basket",
    columns:[   
        { id:"title", header:"Название"},    
        { id:"vol", header:"Количество"},
    ],
     data:basketdata,select:true, on:{
    	onSelectChange: function () {//Обработка нажатия на строку
    		selected=$$("basket").getSelectedId();//запоминаем id товара на который кликнули
    		changeVol(selected,basketdata,storagedata);
            refresh()//обновляем данные
    	}
    }  },
    {height:100,view:"datatable", autoConfig:true, id:"basketsumm", data:basketsummdata}
  ]}
  ]
});