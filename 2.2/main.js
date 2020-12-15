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

let basketsummdata={id:'summ',title:"Стоимость товара",vol:0}

function summ(data) {//нахождение общей стоимости товара в data 
	let summbs=0;
	data.forEach(item=>{
		summbs+=(item.vol*item.cost);
	});
	return summbs;
}

function refresh() {// обновление данных
    		
    		$$("basket").clearAll();
    		$$("storage").clearAll();
            $$("basketsumm").clearAll();

    		$$("basket").define("data", basketdata);
    		$$("storage").define("data", storagedata);

    		if (basketdata.length>0) {basketsummdata.vol=summ(basketdata)};
    		$$("basketsumm").define("data", basketsummdata);

			$$("basket").refresh();
			$$("storage").refresh();
			$$("basketsumm").refresh();
			
    	}

function stbs(id,data1,data2) {// уменьшение количества товара в data1 с номером id и его увелечение в data2
	let ind=true;
	let elemi;
	//добавление к количеству товара и проверка есть ли такой товар в корзине
	for (let i = 0; i < data2.length; i++) {
		if (data2[i].id == id) {
					data2[i].vol++
					ind=false;
		}
	}

	for (let i = 0; i < data1.length; i++) {
		if (data1[i].id== id) {
			if (ind) {
				data2[data2.length]=Object.assign({},data1[i])//копируем элемент
				data2[data2.length-1].vol=1;
			}
		}
	}

	for (let i = 0; i < data1.length; i++) {

		if (data1[i].id== id) {
			data1[i].vol--;			//уменьшаем количство товара
			if (data1[i].vol==0) {	//проверяем есть ли данный товар
				 data1.splice(i,1);	//если его нет то удаляем его из списка
			}
		}
	}
}


