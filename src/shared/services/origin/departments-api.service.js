import http from "../http-common.js";
export class DepartmentsApiService {
    getAll() {
        return http.get('/departments');
    }

    getById(id) {
        return http.get(`/departments/${id}`);
    }

    create(department) {
        return http.post('/departments', department);
    }

    update(id, department) {
        return http.put(`/departments/${id}`, department);
    }

    delete(id) {
        return http.delete(`/departments/${id}`);
    }

    findByName(name) {
        console.log("en el department service",name);
        return http.get(`/departments/name/${name}`);
    }
}