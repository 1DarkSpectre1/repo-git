package entities

// Progect структура сущности проекта
type Progect struct {
	ID            int64  `json:"ID"`             // идентификатор
	Name    	  string `json:"name"`     		 // название
	Description   string `json:"description"`    // описание
	Fk_employee   int64  `json:"fk_employee"`    //создатель
	Employee      string `json:"employee"`    // описание
}
