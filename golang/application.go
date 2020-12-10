package main

import (
	//"sort"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"
	
)

func main() {
	// чтение аргументов
	var datafile *string

	datafile = flag.String("datafile", "./indications.json", `Path to datafile. Default: "./indications.json"`)

	flag.Parse()

	log.Printf("Datafile: %s\n", *datafile)

	// открытие файла
	f, err := os.Open(*datafile)
	if err != nil {
		log.Printf("ERROR os.Open, %s\n", err)
		return
	}
	err= nil
	// преобразование в срез
	data, err := parseFile(f)
	if err != nil {
		log.Printf("ERROR parseFile, %s\n", err)
		return
	}

	// сортировка данных
	err = sortByDate(data)
	if err != nil {
		log.Printf("ERROR sortByDate, %s\n", err)
		return
	}

	// форматированный вывод
	print(data)
}

// Indication структура показания
type Indication struct {
	Indicator string    `json:"indicator"`
	Value     int       `json:"value"`
	Date      time.Time `json:"date"`
}

// преобразование файла в срез показаний приборов
func parseFile(file *os.File) (data []Indication, err error) {
	var (
		b []byte
	)

	// чтение содержимого файла
	b, err = ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	// преобразование из json в срез структур
	err = json.Unmarshal(b, &data)
	if err != nil {
		return nil, err
	}

	return
}

// функция сортировки данных по дате. Заменяет ссылку входного среза на отсортированный срез
func sortByDate(data []Indication) (err error) {

	var sortedData []Indication
	sortedData = data;
	var j,leng,i int

	leng = len(sortedData);//Находим размер

	//сортировка методом попарного сравнения
	i=0;
	for  i < leng-1  {
		j=1;
	for j < leng-1  {// проход по масиву
		
			if( sortedData[j-1].Date.Unix() > sortedData[j].Date.Unix() ){     // сранение двух созедних значений (сраниваем по дате)
				sortedData[j-1],sortedData[j] = sortedData[j],sortedData[j-1]	//значени меняются местами
			}
			j++
		}
		i++
	}


//	sort.SliceStable(data, func(i,j int) bool{
//		return data[i].Date.Unix() < data[j].Date.Unix()
//	})

	return 
}

// функция форматированного вывода среза показаний
func print(data []Indication) {
	var (
		res string
	)

	for _, i := range data {
		res = fmt.Sprintf("%s", res)
		res += fmt.Sprintf("value: %v", i.Value)// поле "значение" показания прибора
		res += fmt.Sprintf("   ")
		res += fmt.Sprintf("indicator: %v", i.Indicator)// поле "Индикатор" прибора
		res += fmt.Sprintf("   ")
		res += fmt.Sprintf("Date: %v", i.Date)// поле "Дата" записи данных
		res += fmt.Sprintf("\n")
	}

	log.Printf(res)
}
