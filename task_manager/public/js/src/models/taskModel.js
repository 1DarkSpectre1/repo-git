import Model from '../../helpers/model.js';
import {  TASK_STATUS } from '../models/entities/task.js'
/// taskModel объект для работы(CRUD) с данными
class TaskModel extends Model {
    constructor() {
        super()
    }
    
    getCompletedTasksByIDProgect(id) {
        return this.get(`/task/all/completed/progect/${id}`)
    }
    getTaskByIDEmployee(id){
        return this.get(`/task/all/employee/${id}`)
    }
    // получение всех задач
    getTasksByIDProgect(id) {
        return this.get(`/task/all/progect/${id}`)
    }

    // получение задачи по ее ID
    getTaskByID(id) {
        return this.get(`/task/${id}`)
    }

    // создание задачи
    createTask(task) {
        // task.sch_hours=Number(task.sch_hours)
        // task.fact_hours=0
        // task.status=TASK_STATUS.new_task
        // task.fk_progect=Number(id)
        // if (Number(task.employee)!=0) {
        // task.fk_employee=Number(task.employee)
        // task.status=TASK_STATUS.appointed
        // }
        
        return this.post('/task/create', task)
    }

    // изменение задачи
    updateTask(task) {
        
        // // task.sch_hours=Number(task.sch_hours)
        // // task.fact_hours=Number(task.fact_hours)
        // // task.fk_progect=Number(task.fk_progect)
        // if (Number(task.employee)!=0) {
        //     task.fk_employee=Number(task.employee)
        //     task.status=TASK_STATUS.appointed
        // }else{
        //     task.status=TASK_STATUS.new_task
        // }
        // task.id=task.ID
        return this.post('/task/update', task)
    }

    // удаление задачи
    deleteTask(task) {
        task.sch_hours=Number(task.sch_hours)
        task.fact_hours=Number(task.fact_hours)
        task.id=task.ID
        return this.post('/task/delete', task)
    }
}
const taskModel = new TaskModel();
export default taskModel


