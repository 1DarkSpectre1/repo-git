package main

import (
	"bufio"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
)

//MakeRequest делает get запрос и сохраняет в html файл, по пути result
func MakeRequest(result string, domain string, c chan string) {
	line := <-c

	resp, err := http.Get(line)
	if err != nil {
		log.Println(err)
		return
	}

	body, err := ioutil.ReadAll(resp.Body) //считываем содержимое страницы
	if err != nil {
		log.Println(err)
		return
	}

	if result != "" { //проверка на путь к результату
		err = os.MkdirAll(result, 0777) // создание директории
		if err != nil {
			log.Println(err)
			return
		}
	}

	err = ioutil.WriteFile(filepath.Join(result, domain+".html"), body, 0777) //запись в файл по пути result
	if err != nil {
		// Если произошла ошибка выводим ее в консоль
		log.Println(err)
	}
	log.Println(line)
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

func main() {
	c := make(chan string)
	var filepath string
	flag.StringVar(&filepath, "filepath", "url.txt", "a string var") // флаг для пути к файлу

	var result string
	flag.StringVar(&result, "result", "", "a string var") // флаг для пути к результату

	var logpath string
	flag.StringVar(&logpath, "logpath", "", "a string var") // флаг для пути к логам
	flag.Parse()

	if logpath != "" {
		f, err := os.OpenFile(logpath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			log.Println(err)
		}
		defer f.Close()
		log.SetOutput(f)
	}
	file, err := os.Open(filepath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	lines, err := readLines(file)
	if err != nil {
		log.Fatalf("readLines: %s", err)
	}
	for _, line := range lines {
		u, err := url.Parse(line)
		if err != nil {
			log.Fatal(err)
		}

		//из адресса вытаскиваем домен для имени файла
		parts := strings.Split(u.Hostname(), ".")
		domain := parts[len(parts)-2]
		go MakeRequest(result, domain, c) //делаем запрос и сохраняем файл
		c <- line
	}
	var input string
	fmt.Scanln(&input)
}
