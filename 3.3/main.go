package main

import (
	"bufio"
	"flag"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

//MakeRequest делает get запрос и сохраняет в html файл, по пути result
func MakeRequest(result string, domain string, line string, wg *sync.WaitGroup) {
	defer wg.Done()
	start := time.Now()

	log.Println("Get запрос: " + line)
	resp, err := http.Get(line)
	if err != nil {
		log.Println(err)
		return
	}
	log.Println("Get запрос успешен: " + line)
	body, err := ioutil.ReadAll(resp.Body) //считываем содержимое страницы
	if err != nil {
		log.Println(err)
		return
	}
	log.Println("Данные считаны со страницы: " + line)

	err = ioutil.WriteFile(filepath.Join(result, domain+".html"), body, 0777) //запись в файл по пути result
	if err != nil {
		// Если произошла ошибка выводим ее в консоль
		log.Println(err)
	}
	duration := time.Since(start)
	log.Println("Создан html файл: " + filepath.Join(result, domain+".html"))
	log.Print("Время затраченное на: "+line+" =  ", duration)

}

//считывание содержимое файла построчно
func readLines(file *os.File) ([]string, error) {
	var lines []string
	scanner := bufio.NewScanner(file) //создаём новый сканер
	for scanner.Scan() {              //Проверка файла. True если файл не закончился и не было ошибок. Тогда совершается переход на след. токен
		lines = append(lines, scanner.Text()) //Запись токена в масив строк
	}
	return lines, scanner.Err()
}
func main1(logpath string, pathfile string, result string, gorut bool) time.Duration {
	start := time.Now()
	var wg sync.WaitGroup
	log.Println("--------------------Начало работы---------------------------------")
	file, err := os.Open(pathfile)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	log.Println("Файл успешно открыт: " + pathfile)

	lines, err := readLines(file)
	if err != nil {
		log.Fatalf("readLines: %s", err)
	}
	log.Println("Данные из файла считаны. ")

	if result != "" { //проверка на путь к результату
		err = os.MkdirAll(result, 0777) // создание директории
		if err != nil {
			log.Fatal(err)
		}
	}
	wg.Add(len(lines))
	for _, line := range lines {
		u, err := url.Parse(line)
		if err != nil {
			log.Fatal(err)
		}

		//из адресса вытаскиваем домен для имени файла
		parts := strings.Split(u.Hostname(), ".")
		domain := parts[len(parts)-2]
		if gorut {
			go MakeRequest(result, domain, line, &wg) //делаем запрос и передаем данные страницы по каналу
		} else {
			MakeRequest(result, domain, line, &wg) //делаем запрос и передаем данные страницы по каналу
		}

	}
	wg.Wait()
	duration := time.Since(start)

	if gorut {
		log.Println("Время работы программы с горутинами = ", duration)
	} else {
		log.Println("Время работы программы без горутин = ", duration)
	}
	log.Println("--------------------Конец работы---------------------------------")
	return duration
}
func main() {
	var pathfile string
	flag.StringVar(&pathfile, "pathfile", "url.txt", "a string var") // флаг для пути к файлу

	var result string
	flag.StringVar(&result, "result", "", "a string var") // флаг для пути к результату

	var logpath string
	flag.StringVar(&logpath, "logpath", "", "a string var") // флаг для пути к логам

	flag.Parse()
	if logpath != "" {
		f, err := os.OpenFile(logpath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()
		log.SetOutput(f)
	}
	duration1 := main1(logpath, pathfile, result, true)
	duration2 := main1(logpath, pathfile, result, false)
	d1 := duration2 - duration1

	log.Println("Разница времени работы горутин = ", d1)
}