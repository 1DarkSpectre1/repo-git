var storagedata = [
	{ id: 1, title: "Стол", vol: 12 ,cost:100 },
	{ id: 2, title: "Стул", vol: 300 ,cost:200 },
	{ id: 3, title: "Книга", vol: 5 ,cost:1300},
	{ id: 4, title: "Самолёт", vol: 2 ,cost:10},
	{ id: 6, title: "Ракета", vol: 12,cost:1200},
	{ id: 5, title: "Звездолёт", vol: 2,cost:1 }
];

var basketdata = [];

var basketsummdata={id:'summ',title:"Стоимость товара",vol:0}

function summ(data) {
	summbs=0;
	data.forEach(item=>{
		summbs+=(item.vol*item.cost);
	});
	return summbs;
}

function stbs(id,data1,data2) {
	ind=true
	//добавление к количеству товара и проверка есть ли такой товар в корзине
	for (var i = 0; i < data2.length; i++) {
		if (data2[i].id==id) {
					data2[i].vol++;
					ind=false;
		}
	}

	for (var i = 0; i < data1.length; i++) {
		if (data1[i].id== id) {
			elemi=i;						//запоминаем номер элемента
		}
	}

	//если товара нет в корзине создаём его
	if (ind) {
		data2[data2.length]=Object.assign({},data1[elemi])//копируем элемент
		data2[data2.length-1].vol=1;
	}


	for (var i = 0; i < data1.length; i++) {

		if (data1[i].id== id) {
			data1[i].vol--;			//уменьшаем количство товара
			if (data1[i].vol==0) {	//проверяем есть ли данный товар
				 data1.splice(i,1);	//если его нет то удаляем его из списка
			}
		}
	}
}


