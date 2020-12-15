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
    		selected=$$("storage").getSelectedId();
    		stbs(selected,storagedata,basketdata);
            refresh()
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
    	onSelectChange: function () {
    		selected=$$("basket").getSelectedId();
    		stbs(selected,basketdata,storagedata);
            refresh()
    	}
    }  },
    {height:100,view:"datatable", autoConfig:true, id:"basketsumm", data:basketsummdata}
  ]}
  ]
});