"use strict"


let menu_data = [
{id:"ProgectTabView", value:"Проекты",icon: "dashboard"},
    {id: "TaskTabView", value:"Задачи",icon: "table"},
    {id: "EmployeeTabView", value:"Сотрудники",icon:"user"},
];
let big_film_set = [
    {"ID":1,"title":"The Shawshank Redemption","year":"1994","votes":"678,79","rating":"9,2","rank":"1"},
    {"ID":2,"title":"The Godfather","year":"1972","votes":"511,495","rating":"9,2","rank":"2"},
    {"ID":3,"title":"The Godfather: Part II","year":"1974","votes":"319,352","rating":"9","rank":"3"},
    {"ID":4,"title":"The Good, the Bad and the Ugly","year":"1966","votes":"213,03","rating":"8,9","rank":"4"},
    {"ID":5,"title":"My Fair Lady","year":"1964","votes":"533,848","rating":"8,9","rank":"5"},
    {"ID":6,"title":"12 Angry Men","year":"1957","votes":"164,558","rating":"8,9","rank":"6"},
    {"ID":7,"title":"Schindler's List","year":"1993","votes":"355,638","rating":"8,9","rank":"7"},
    {"ID":8,"title":"One Flew Over the Cuckoo's Nest","year":"1975","votes":"283,176","rating":"8,8","rank":"8"},
    {"ID":9,"title":"The Dark Knight","year":"2008","votes":"612,37","rating":"8,8","rank":"9"},
    {"ID":10,"title":"The Lord of the Rings: The Return of the King","year":"2003","votes":"472,843","rating":"8,8","rank":"10"},
    {"ID":11,"title":"Star Wars: Episode V - The Empire Strikes Back","year":"1980","votes":"348,012","rating":"8,8","rank":"11"},
    {"ID":12,"title":"Inception","year":"2010","votes":"458,693","rating":"8,8","rank":"12"},
    {"ID":13,"title":"Fight Club","year":"1999","votes":"507,723","rating":"8,8","rank":"13"},
    {"ID":14,"title":"Seven Samurai","year":"1954","votes":"118,925","rating":"8,8","rank":"14"},
    {"ID":15,"title":"Goodfellas","year":"1990","votes":"299,349","rating":"8,7","rank":"15"},
    {"ID":16,"title":"The Lord of the Rings: The Fellowship of the Ring","year":"2001","votes":"494,003","rating":"8,7","rank":"16"},
    {"ID":17,"title":"Star Wars","year":"1977","votes":"393,087","rating":"8,7","rank":"17"},
    {"ID":18,"title":"City of God","year":"2002","votes":"222,818","rating":"8,7","rank":"18"},
    {"ID":19,"title":"Casablanca","year":"1942","votes":"202,051","rating":"8,7","rank":"19"},
    {"ID":20,"title":"Once Upon a Time in the West","year":"1968","votes":"97,931","rating":"8,7","rank":"20"},
    {"ID":21,"title":"The Matrix","year":"1999","votes":"492,325","rating":"8,7","rank":"21"}
  ];


  let positions=[
    {id:"Электрик","value":"Электрик"},
    {id:"Водитель","value":"Водитель"},
    {id:"Пилот","value":"Пилот"},
    {id:"Астронавт","value":"Астронавт"},
];

let employ=[
    {id:1,"value":"Иванов Иван"},
    {id:2,"value":"Петров Пётр"},
];
// let tasks =[
//  {"ID":1,"name":"Front","employee":"Иванов Иван","status":"Назначена","sch_hours":"9,2","fact_hours":"1"},
// {"ID":2,"name":"Back","employee":"Петров Пётр","status":"В работе","sch_hours":"9,2","fact_hours":"2"},
// {"ID":3,"name":"1234","employee":"Петров Пётр","status":"В работе","sch_hours":"9,2","fact_hours":"2"},
// {"ID":4,"name":"5312","employee":"Петров Пётр","status":"В работе","sch_hours":"9,2","fact_hours":"2"},
// {"ID":5,"name":"321124","employee":"Петров Пётр","status":"В работе","sch_hours":"9,2","fact_hours":"2"},
   
// ];

let progects =[
    {"ID":1,"name":"1 Проект","employee":"Сергеев Сергей"},
   {"ID":2,"name":"Проект № 2","employee":"Юрьев Юрий"},
      
   ];
// let employees = [
//     {"ID":1,"lastname":"Юрьев","firstname":"Юрий","middlename":"юрьевич","position":"Электрик","phone_number":"555-555","email":"Iyriev@mail.ru"},
//     {"ID":2,"lastname":"Сергеев","firstname":"Сергей","middlename":"Сергеевич","position":"Водитель","phone_number":"666-666","email":"Sergeev@mail.ru"},
//     {"ID":3,"lastname":"Иванов","firstname":"Иван","middlename":"Иванович","position":"Пилот","phone_number":"8654-124-12-34","email":"Ivanov@mail.ru"},
//     {"ID":4,"lastname":"Петров","firstname":"Пётр","middlename":"Петрович","position":"Астронавт","phone_number":"8453-234-23-87","email":"Petrov@mail.ru"},
// ];