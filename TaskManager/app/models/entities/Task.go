package entities



// Task структура сущности задачи
type Task struct {
	ID         		int64      `json:"ID"`        // идентификатор
	Name       		string     `json:"name"`      // название 
	Sch_hours  		float32    `json:"sch_hours"`    // план часы
	Fact_hours 		float32    `json:"fact_hours"` // факт часы
	Status          string 	   `json:"status"`    // статус 
	Fk_employee     int64      `json:"fk_employee"`
	FK_progect      int64 	   `json:"fk_progect"`


}

