var storagedata = [
	{ id: 1, title: "Стол", vol: 12 ,cost:100 },
	{ id: 2, title: "Стул", vol: 300 ,cost:200 },
	{ id: 3, title: "Книга", vol: 5 ,cost:1300},
	{ id: 4, title: "Самолёт", vol: 2 ,cost:10},
	{ id: 6, title: "Ракета", vol: 12,cost:1200},
	{ id: 5, title: "Звездолёт", vol: 2,cost:1 }
];
var basket = [

	
];

var basketsumm={id:'summ',title:"Стоимость товара",vol:0}

document.addEventListener("DOMContentLoaded", () => {
	// первичное отображение данных
	refresh(storagedata,"storage");
	refresh(basket,"basket");
});

function summ(data) {
	summbs=0;
	data.forEach(item=>{
		summbs+=(item.vol*item.cost);
	});
	return summbs;
}
// функция обновления данных в контейнере
function refresh(data, name) {
	clear(name)

	data.forEach(item => {
		document.getElementById(name).appendChild(createElement(item,name))	
	});	
	clear('basketsumm')
	document.getElementById('basketsumm').appendChild(createElement(basketsumm,'basketsumm'))
}


// функция сортировки по количеству
function sortByRating(data) {
	let sortedData = [];
	let sort;

	sortedData = data.slice();//копируем данные

	sortedData.sort((prev, next)=> prev.vol -next.vol);

	

	return sortedData
}
function stbs(item,data1,data2) {
			//добавление к количеству товара и проверка есть ли такой товар в корзине
			for (var i = 0; i < data2.length; i++) {
					if (data2[i].id==item.id) {
						data2[i].vol++;
						ind=false;
					}
			}

			for (var i = 0; i < data1.length; i++) {
				if (data1[i].id== item.id) {
						elemi=i;						//запоминаем номер элемента
				}
			}

			//если товара нет в корзине создаём его
			if (ind) {
				data2[data2.length]=Object.assign({},data1[elemi])//копируем элемент
				data2[data2.length-1].vol=1;
			}


			for (var i = 0; i < data1.length; i++) {

				if (data1[i].id== item.id) {
					data1[i].vol--;			//уменьшаем количство товара
					if (data1[i].vol==0) {	//проверяем есть ли данный товар
						 data1.splice(i,1);	//если его нет то удаляем его из списка
					}
				}
			}

}

// функция очищения 
function clear(name) {
	document.getElementById(name).innerHTML = '';
	
}
function createElement(item,name) {
	// ячейка названия товара
	var divTitle = document.createElement('div');
	divTitle.className = "item-title";
	divTitle.innerHTML = item.title;

	// ячейка количество товара 
	var divVol = document.createElement('div');
	divVol.className = "item-vol";
	divVol.innerHTML = item.vol;


	// строка товара
	var divItemContainer = document.createElement('div');
	divItemContainer.className = "row item disable-selection";
	divItemContainer.appendChild(divTitle);
	divItemContainer.appendChild(divVol);
	if (name=="basket") {
	divItemContainer.id = 'bs_' + item.id;
	}
	else if (name=='storage') {divItemContainer.id = 'st_' + item.id;}
	else {divItemContainer.id = 'bssumm_' + item.id;}
	if (name!="basketsumm") {
		divItemContainer.onclick=function(){          //добавление обработчика события клик
			ind=true;
			let elemi;								//ячейка для номера элемента
			if(name=="storage"){					//Добавление в корзину
				stbs(item,storagedata,basket);
			}
			else{									//добавление на склад
				stbs(item,basket,storagedata);
			}
			if (basket.length>0) {basketsumm.vol=summ(basket)}
			refresh(storagedata,"storage");
			refresh(basket,"basket");
			return false;
		}
	}
	return divItemContainer;
}
