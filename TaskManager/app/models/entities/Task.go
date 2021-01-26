package entities

import "time"

// Task структура сущности задачи
type Task struct {
	ID         		int64      `json:"ID"`        // идентификатор
	Name       		string     `json:"name"`      // название книги
	Sch_hours  		float32    `json:"sch_hours"`    // автор
	Fact_hours 		float32    `json:"fact_hours"` // издательство
	Status          TaskStatus `json:"status"`    // статус книги
}

// |TaskStatus статус задачи
type TaskStatus string

const (
	TASK_STATUS_AVAILABLE     TaskStatus = "назначена"
	TASK_STATUS_NOT_AVAILABLE TaskStatus = "не назначена"
)
