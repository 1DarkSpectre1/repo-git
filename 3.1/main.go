package main

import (
    "flag"
  "bufio"
  "fmt"
  "log"
  "os"
  "net/http"
  "io/ioutil"
  "net/url"
    "strings"
)



func MakeRequest(line string ,domain string, result string) {//get запрос и сохраняем html файл по пути resultpath
  resp, err := http.Get(line)
  if err != nil {
    log.Fatalln(err)
  }

  body, err := ioutil.ReadAll(resp.Body)//считываем содержимое страницы
  if err != nil {
    log.Fatalln(err)
  }
  
  if result!="" {
    err = os.MkdirAll(result, 0777)
    if err != nil {
      log.Fatalln(err)
    }
  }

  err=ioutil.WriteFile(result+domain + ".html", body, 0777)//запись в файл по пути resultpath
  if err != nil {
    // Если произошла ошибка выводим ее в консоль
    fmt.Println(err)
  }

}

//считывание содержимое файла построчно
func readLines (path string) ([]string, error) {
  file, err := os.Open(path)
  if err != nil {
    return nil, err
  }
  defer file.Close()

  var lines []string
  scanner := bufio.NewScanner(file)
  for scanner.Scan() {
    lines = append(lines, scanner.Text())
  }
  return lines, scanner.Err()
}

func main() {

  var filepath string
    flag.StringVar(&filepath, "filepath", "url.txt", "a string var")// флаг для пути к файлу
  
  var result string
    flag.StringVar(&result, "result", "", "a string var")// флаг для пути к результату
  var logpath string
  	flag.StringVar(&logpath, "logpath", "", "a string var")// флаг для пути к результату
    flag.Parse()


  lines, err := readLines(filepath)

  if err != nil {
    log.Fatalf("readLines: %s", err)
  }

  for i, line := range lines {
    u, err := url.Parse(line)
      if err != nil {
              log.Fatal(err)
      } 
    //из адресса вытаскиваем домен для имени файла
    parts := strings.Split(u.Hostname(), ".")
    domain := parts[len(parts)-2 ]
    
    MakeRequest(line,domain,result)//делаем запрос и сохраняем файл
if logpath=="" {
var l=log.New(os.Stdout,"",log.Ldate|log.Ltime)
    l.Print()
    fmt.Println(i, line)  //вывод всех адрессов
    fmt.Println("")
}
  }
}