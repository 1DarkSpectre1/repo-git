import Model from '../../helpers/model.js';

/// taskModel объект для работы(CRUD) с данными
class TaskModel extends Model {
    constructor() {
        super()
    }

    // получение всех книг
    getTasksByIDProgect(id) {
        return this.get(`/task/all/progect/${id}`)
    }

    // получение книги по ее ID
    getTaskByID(id) {
        return this.get(`/task/${id}`)
    }

    // создание книги
    createTask(task) {
        task.sch_hours=+task.sch_hours
        task.fact_hours=+task.fact_hours
        task.id=task.ID
        return this.post('/task/create', task)
    }

    // изменение книги
    updateTask(task) {
        task.sch_hours=+task.sch_hours
        task.fact_hours=+task.fact_hours
        task.fk_progect=+task.fk_progect
        task.fk_employee=+task.fk_employee
        task.id=task.ID
        return this.post('/task/update', task)
    }

    // удаление книги
    deleteTask(task) {
        task.sch_hours=+task.sch_hours
        task.fact_hours=+task.fact_hours
        task.id=task.ID
        return this.post('/task/delete', task)
    }
}
const taskModel = new TaskModel();
export default taskModel


