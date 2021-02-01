import Model from '../../helpers/model.js';

/// progectModel объект для работы(CRUD) с данными
class ProgectModel extends Model {
    constructor() {
        super()
    }

    // поолучение всех сотрудник
    getProgects() {
        return this.get('/progect/all')
    }

    // поолучение сотрудника по его ID
    getProgectByID(id) {
        return this.get(`/progect/${id}`)
    }

    // создание сотрудника
    createProgect(progect) {
        return this.post('/progect/create', progect)
    }

    // изменение сотрудника
    updateProgect(progect) {
        return this.post('/progect/update', progect)
    }

    // удаление сотрудника
    deleteProgect(progect) {
        return this.post('/progect/delete', progect)
    }
   
}
const progectModel  = new ProgectModel();
export default progectModel