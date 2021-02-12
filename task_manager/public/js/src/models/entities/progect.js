// Employee класс для представления сущности сотрудника
export class Progect {
    constructor(id, name,description, employee,fk_employee) {
        this.ID = id
        this.name = name
        this.description=description
        this.employee = employee
        this.fk_employee=fk_employee
    }
}