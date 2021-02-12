package entities

// Position структура сущности должности
type TaskStatus struct {
	ID   int64  `json:"ID"`   // идентификатор
	Name string `json:"name"` // название статуса
}