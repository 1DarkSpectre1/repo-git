// Book класс для представления сущности книги
export class Task {
    constructor(ID,  name,sch_hours, fact_hours, employee, fk_employee, status,fk_progect) {
        this.ID = ID
        this.name = name
        this.sch_hours = sch_hours
        this.fact_hours = fact_hours
        this.fk_employee = fk_employee
        this.fk_progect=fk_progect
        this.employee=employee
        this.status = status
    }
}

// допустимые статусы книги
export let TASK_STATUS = {
    new_task: 'Не назначена',
    appointed: 'Назначена',
    work: 'в работе',
    suspended:'приостановлена',
    performed:'выполнена',
}