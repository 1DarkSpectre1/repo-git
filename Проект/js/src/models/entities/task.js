// Book класс для представления сущности книги
export class Task {
    constructor(id,  name,sch_hours, fact_hours, year, status) {
        this.ID = id
        this.name = name
        this.sch_hours = sch_hours
        this.fact_hours = fact_hours
        this.year = year
        this.status = status
    }
}

// допустимые статусы книги
export let TASK_STATUS = {
    new_task: 'новая задача',
    appointed: 'назначена',
    work: 'в работе',
    suspended:'приостановлена',
    performed:'выполнена',
}