package entities

// Progect структура сущности проекта
type Progect struct {
	ID            int64  `json:"ID"`           // идентификатор
	Name    	  string `json:"lastname"`     // фамилия
	Description   string `json:"firstname"`    // имя
}
