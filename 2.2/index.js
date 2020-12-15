webix.ui({
cols:[{ rows:[
    {height: 30, template:"Склад" },
    { view:"datatable", id:"storage", 
    columns:[   
        { id:"title", header:"Название"},    
        { id:"vol", header:"Количество"},
    ],
     data:storagedata, select:true, on:{
    	onSelectChange: function () {
    		selected=$$("storage").getSelectedId();
    		stbs(selected,storagedata,basketdata);
    		$$("storage").clearAll();
    		$$("basket").clearAll();
    		$$("storage").define("data", storagedata);
    		$$("basket").define("data", basketdata);
    		if (basketdata.length>0) {basketsummdata.vol=summ(basketdata)};
    		$$("basketsumm").define("data", basketsummdata);
			$$("storage").refresh();
			$$("basket").refresh();
			$$("basketsumm").refresh();
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
    		$$("basket").clearAll();
    		$$("storage").clearAll();
    		$$("basket").define("data", basketdata);
    		$$("storage").define("data", storagedata);
    		if (basket.length>0) {basketsummdata.vol=summ(basketdata)};
    		$$("basketsumm").define("data", basketsummdata);
			$$("basket").refresh();
			$$("storage").refresh();
			$$("basketsumm").refresh();
    	}
    }  },
    {height:100,view:"datatable", autoConfig:true, id:"basketsumm", data:basketsummdata}
  ]}
  ]
});