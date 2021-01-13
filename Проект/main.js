"use strict"


let menu_data = [
    {id: "tasks", value:"Задачи"},
    {id: "employees", value:"Сотрудники"},
];
let big_film_set = [
    {"id":1,"title":"The Shawshank Redemption","year":"1994","votes":"678,79","rating":"9,2","rank":"1"},
    {"id":2,"title":"The Godfather","year":"1972","votes":"511,495","rating":"9,2","rank":"2"},
    {"id":3,"title":"The Godfather: Part II","year":"1974","votes":"319,352","rating":"9","rank":"3"},
    {"id":4,"title":"The Good, the Bad and the Ugly","year":"1966","votes":"213,03","rating":"8,9","rank":"4"},
    {"id":5,"title":"My Fair Lady","year":"1964","votes":"533,848","rating":"8,9","rank":"5"},
    {"id":6,"title":"12 Angry Men","year":"1957","votes":"164,558","rating":"8,9","rank":"6"},
    {"id":7,"title":"Schindler's List","year":"1993","votes":"355,638","rating":"8,9","rank":"7"},
    {"id":8,"title":"One Flew Over the Cuckoo's Nest","year":"1975","votes":"283,176","rating":"8,8","rank":"8"},
    {"id":9,"title":"The Dark Knight","year":"2008","votes":"612,37","rating":"8,8","rank":"9"},
    {"id":10,"title":"The Lord of the Rings: The Return of the King","year":"2003","votes":"472,843","rating":"8,8","rank":"10"},
    {"id":11,"title":"Star Wars: Episode V - The Empire Strikes Back","year":"1980","votes":"348,012","rating":"8,8","rank":"11"},
    {"id":12,"title":"Inception","year":"2010","votes":"458,693","rating":"8,8","rank":"12"},
    {"id":13,"title":"Fight Club","year":"1999","votes":"507,723","rating":"8,8","rank":"13"},
    {"id":14,"title":"Seven Samurai","year":"1954","votes":"118,925","rating":"8,8","rank":"14"},
    {"id":15,"title":"Goodfellas","year":"1990","votes":"299,349","rating":"8,7","rank":"15"},
    {"id":16,"title":"The Lord of the Rings: The Fellowship of the Ring","year":"2001","votes":"494,003","rating":"8,7","rank":"16"},
    {"id":17,"title":"Star Wars","year":"1977","votes":"393,087","rating":"8,7","rank":"17"},
    {"id":18,"title":"City of God","year":"2002","votes":"222,818","rating":"8,7","rank":"18"},
    {"id":19,"title":"Casablanca","year":"1942","votes":"202,051","rating":"8,7","rank":"19"},
    {"id":20,"title":"Once Upon a Time in the West","year":"1968","votes":"97,931","rating":"8,7","rank":"20"},
    {"id":21,"title":"The Matrix","year":"1999","votes":"492,325","rating":"8,7","rank":"21"}
  ];

let my_form={
	id:"form1",
	visibleBatch:"employees",
	rows:[
		  {
      view:"counter", 
      batch:"employees",
      value:100, 
      min:90, 
      max:110
    },
    {batch:"employees"},
    {view:"datatable",batch:"tasks", id:"myList", autoConfig:true, data:big_film_set}

	]
};


let tasks =[
 {"id":1,"title":"Tqweqewqweqweqweqweption","year":"1994","votes":"678,79","rating":"9,2","rank":"1"},
    {"id":2,"title":"The Gqweqweqweqweqwether","year":"1972","votes":"511,495","rating":"9,2","rank":"2"},
    {"id":3,"title":"The Godfather: Part II","year":"1974","votes":"319,352","rating":"9","rank":"3"},
    {"id":4,"title":"The Good, the Bad and the Ugly","year":"1966","votes":"213,03","rating":"8,9","rank":"4"},
    {"id":5,"title":"My Fair Lady","year":"1964","votes":"533,848","rating":"8,9","rank":"5"},
    {"id":6,"title":"12 Angry Men","year":"1957","votes":"164,558","rating":"8,9","rank":"6"},
    {"id":7,"title":"Schindler's List","year":"1993","votes":"355,638","rating":"8,9","rank":"7"},
    {"id":8,"title":"One Flew Over the Cuckoo's Nest","year":"1975","votes":"283,176","rating":"8,8","rank":"8"},
    {"id":9,"title":"The Dark Knight","year":"2008","votes":"612,37","rating":"8,8","rank":"9"},
    {"id":10,"title":"The Lord of the Rings: The Return of the King","year":"2003","votes":"472,843","rating":"8,8","rank":"10"},
    {"id":11,"title":"Star Wars: Episode V - The Empire Strikes Back","year":"1980","votes":"348,012","rating":"8,8","rank":"11"},
    {"id":12,"title":"Inception","year":"2010","votes":"458,693","rating":"8,8","rank":"12"},
    {"id":13,"title":"Fight Club","year":"1999","votes":"507,723","rating":"8,8","rank":"13"},
    {"id":14,"title":"Seven Samurai","year":"1954","votes":"118,925","rating":"8,8","rank":"14"},
    {"id":15,"title":"Goodfellas","year":"1990","votes":"299,349","rating":"8,7","rank":"15"},
    {"id":16,"title":"The Lord of the Rings: The Fellowship of the Ring","year":"2001","votes":"494,003","rating":"8,7","rank":"16"},
    {"id":17,"title":"Star Wars","year":"1977","votes":"393,087","rating":"8,7","rank":"17"},
    {"id":18,"title":"City of God","year":"2002","votes":"222,818","rating":"8,7","rank":"18"},
    {"id":19,"title":"Casablanca","year":"1942","votes":"202,051","rating":"8,7","rank":"19"},
    {"id":20,"title":"Once Upon a Time in the West","year":"1968","votes":"97,931","rating":"8,7","rank":"20"},
    {"id":21,"title":"The Matrix","year":"1999","votes":"492,325","rating":"8,7","rank":"21"}
];
let employees = [
				{ view:"text", label:'Наqweqweзвание', name:"title" },
                { view:"text", label:'Количество', name:"vol" },
                { view:"text", label:'Цена', name:"cost" }];
let history = { //форма для окна добавления товара
			view:"form",
			id:"my_form",
			borderless:true,
			elements: [
				{ view:"text", label:'Название', name:"title" },
                { view:"text", label:'Количество', name:"vol" },
                { view:"text", label:'Цена', name:"cost" },
				{ view:"button", value: "Добавить", click:function(){//обработка нажатия кнопки добавить
					if (this.getParentView().validate()){ //проверка формы на правильность данных
                        addProduct();
                        webix.message("Товар добавлен");
                        this.getTopParentView().hide(); //Закрытваем окно
                        refresh();
                    }
					else
						webix.message({ type:"error", text:"Некоректное значение" });
				}},
                { view:"button", value: "Отмена", click:function(){//обработка нажатия кнопки отмена
                        this.getTopParentView().hide(); //Закрытваем окно
                }}
			],
			rules:{
				"title":webix.rules.isNotEmpty,
				"vol":webix.rules.isNumber,
				"cost":webix.rules.isNumber,
			},
			elementsConfig:{
				labelPosition:"top",
			}
		};