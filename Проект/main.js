"use strict"


let menu_data = [
{id:"ProgectTabView", value:"Проекты",icon: "mdi mdi-view-dashboard"},
    {id: "TaskTabView", value:"Задачи",icon: "mdi mdi-table"},
    {id: "EmployeeTabView", value:"Сотрудники",icon:"mdi mdi-account"},
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


let employ=[
    {"id":1,"value":"Иванов Иван"},
    {"id":2,"value":"Петров Пётр"},
];
let tasks =[
 {"id":1,"name":"Front","employee":"Иванов Иван","status":"Назначена","sch_hours":"9,2","fact_hours":"1"},
{"id":2,"name":"Back","employee":"Петров Пётр","status":"В работе","sch_hours":"9,2","fact_hours":"2"},
   
];

let progects =[
    {"id":1,"name":"1 Проект","employee":"Сергеев Сергей"},
   {"id":2,"name":"Проект № 2","employee":"Юрьев Юрий"},
      
   ];
let employees = [
    {"id":1,"lastname":"Юрьев","firstname":"Юрий","middlename":"юрьевич","position":"1","phone_number":"555-555","email":"Iyriev@mail.ru"},
    {"id":2,"lastname":"Сергеев","firstname":"Сергей","middlename":"Сергеевич","position":"1","phone_number":"666-666","email":"Sergeev@mail.ru"},
    {"id":3,"lastname":"Иванов","firstname":"Иван","middlename":"Иванович","position":"2","phone_number":"8654-124-12-34","email":"Ivanov@mail.ru"},
    {"id":4,"lastname":"Петров","firstname":"Пётр","middlename":"Петрович","position":"3","phone_number":"8453-234-23-87","email":"Petrov@mail.ru"},
];