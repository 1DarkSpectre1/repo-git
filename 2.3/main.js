"use strict"
let storagedata = [
	{ id: 1, title: "Стол", vol: 12 ,cost:100 },
	{ id: 2, title: "Стул", vol: 300 ,cost:200 },
	{ id: 3, title: "Книга", vol: 5 ,cost:1300},
	{ id: 4, title: "Самолёт", vol: 2 ,cost:10},
	{ id: 6, title: "Ракета", vol: 12,cost:1200},
	{ id: 5, title: "Звездолёт", vol: 2,cost:1 }
];

let basketdata = [
	];

let basketsummdata={id:'summ',title:"Стоимость",vol:0}

function summ(data) {//нахождение общей стоимости товара в data 
	let summbs=0;
	data.forEach(item=>{
		summbs+=(item.vol*item.cost);
	});
	return summbs;
}

function refresh() {// обновление данных
    		//очистка 
    		$$("basket").clearAll();
    		$$("storage").clearAll();
            $$("basketsumm").clearAll();
            //заполнение новыми данными
    		$$("basket").define("data", basketdata);
    		$$("storage").define("data", storagedata);

    		if (basketdata.length>0) {basketsummdata.vol=summ(basketdata)}//проверка на пустоту
    		else{basketsummdata.vol=0;};
    		$$("basketsumm").define("data", basketsummdata);

			$$("basket").refresh();
			$$("storage").refresh();
			$$("basketsumm").refresh();
			
    	}

function changeVol(id,data1,data2) {// уменьшение количества товара в data1 с номером id и его увелечение в data2
	let ind=true;
	//добавление к количеству товара и проверка есть ли такой товар в корзине
	for (let i = 0; i < data2.length; i++) {
		if (data2[i].id == id) {
					data2[i].vol++
					ind=false;
		}
	}

	for (let i = 0; i < data1.length; i++) {
		if (data1[i].id== id) {
			if (ind) {//проверка есть ли товар в корзине, если нет то выполняем код
				data2[data2.length]=Object.assign({},data1[i])//копируем элемент
				data2[data2.length-1].vol=1;
			}
			data1[i].vol--;			//уменьшаем количство товара
			if (data1[i].vol==0) {	//проверяем есть ли данный товар
				 data1.splice(i,1);	//если его нет то удаляем его из списка
			}
		}
	}
	
}
function addProduct() {
	let Product=$$("my_form").getValues();
	let titleProduct=$$("my_form").elements.title.getValue();
	let volProduct=$$("my_form").elements.vol.getValue();
	let costProduct=$$("my_form").elements.cost.getValue();
	let flag=true;
	storagedata.forEach(item=>{
		if(item.title==Product.title){
			if (item.cost==Product.cost) {
				item.vol+=+Product.vol;
				flag=false;
			}
			else
				webix.message({ type:"error", text:"Данный товар существует в системе с другой ценой. Измените название товара или выставите коректную цену." });
		}
		
		

	});
	if(flag){
			basketdata.forEach(item=>{
				if (item.title==Product.title) {
					if (item.cost==Product.cost) {
						storagedata[storagedata.length]=Object.assign({},item)
						storagedata[storagedata.length-1].vol=Product.vol;
						flag=false;
					}
					else
						webix.message({ type:"error", text:"Данный товар существует в системе с другой ценой. Измените название товара или выставите коректную цену." });
				}
			})
		}
		if (flag) {
			storagedata[storagedata.length]=Object.assign({},Product)
		}
	}
var form = {
			view:"form",
			id:"my_form",
			borderless:true,
			elements: [
				{ view:"text", label:'Название', name:"title" },
                { view:"text", label:'Количество', name:"vol" },
                { view:"text", label:'Цена', name:"cost" },
				{ view:"button", value: "Добавить", click:function(){
					if (this.getParentView().validate()){ //validate form
                        addProduct();
                        webix.message("Товар добавлен");
                        this.getTopParentView().hide(); //hide window
                        refresh();
                    }
					else
						webix.message({ type:"error", text:"Некоректное значение" });
				}},
                { view:"button", value: "Отмена", click:function(){
                        this.getTopParentView().hide(); //hide window
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
