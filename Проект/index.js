

webix.ui({
    rows: [
      { view: "toolbar", padding:3, elements: [
        { view: "icon", icon: "mdi mdi-menu", click: function(){
           $$("$sidebar1").toggle();
         }
        },
        { view: "label", label: "Task manager"},
        {},
        { view: "icon", icon: "mdi mdi-comment",  badge:4},
        { view:"button", value:"Выход", width:70}
      ]
      },
      { cols:[
        {
          view: "sidebar",
          data: menu_data,
          on:{
            onAfterSelect: function(id){
              webix.message("Selected: "+this.getItem(id).value)
              $$("form1").showBatch(id);
            }
          }
        },
        {type:"clean",rows:[
        my_form,
        {}
        ]}
      ]}
    ]
  });

