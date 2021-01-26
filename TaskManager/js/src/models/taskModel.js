import Model from '../../helpers/model.js';

/// taskModel объект для работы(CRUD) с данными
class TaskModel extends Model {
    constructor() {
        super()
    }

    // получение всех книг
    getTasksByIDProgect(id) {
        return this.get(`/task/all${id}`)
    }

    // получение книги по ее ID
    getTaskByID(id) {
        return this.get(`/task/${id}`)
    }

    // создание книги
    createTask(task) {
        
        
        return this.post('/task/create', task)
    }

    // изменение книги
    updateTask(task) {
        
        
        return this.post('/task/update', task)
    }

    // удаление книги
    deleteTask(task) {
        
        
        return this.post('/task/delete', task)
    }
}
const taskModel = new TaskModel();
export default taskModel


