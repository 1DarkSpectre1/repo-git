import Model from '../../helpers/model.js';

/// taskModel объект для работы(CRUD) с данными
class TaskModel extends Model {
    constructor() {
        super()
    }

    // получение всех книг
    getTasks() {
        return this.get('/task/all')
    }

    // получение книги по ее ID
    getTaskByID(id) {
        return this.get(`/task/${id}`)
    }

    // создание книги
    createTask(task) {
        // преобразование года в дату
        let date = new Date(task.year, 0)
        task.year = new Date(date.getTime() - date.getTimezoneOffset() * 60000)

        return this.post('/task/create', task)
    }

    // изменение книги
    updateTask(task) {
        // преобразование года в дату
        let date = new Date(task.year, 0)
        task.year = new Date(date.getTime() - date.getTimezoneOffset() * 60000)

        return this.post('/task/update', task)
    }

    // удаление книги
    deleteTask(task) {
        // преобразование года в дату
        let date = new Date(task.year, 0)
        task.year = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        
        return this.post('/task/delete', task)
    }
}
const taskModel = new TaskModel();
export default taskModel


