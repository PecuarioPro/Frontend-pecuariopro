import http from "../../../shared/services/http-common.js";

export class UserApiService {

    getAll() {
        return http.get('/users');
    }

    create(userResource) {
        return http.post('/users', userResource);
    }

    update(id, user) {
        return http.put(`/users/${id}`, user);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }



}
