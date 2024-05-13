
import http from "../../../shared/services/http-common.js";

export class VaccinesApiService {

    getAll() {
        return http.get('/vaccines');
    }

    getById(id) {
        return http.get(`/vaccines/${id}`);
    }

    create(vaccineResource) {
        return http.post('/vaccines', vaccineResource);
    }

    update(id, vaccineResource) {
        return http.put(`/vaccines/${id}`, vaccineResource);
    }

    delete(id) {
        return http.delete(`/vaccines/${id}`);
    }

    findByTitle(title) {
        return http.get(`/vaccines?title=${title}`);
    }
}
