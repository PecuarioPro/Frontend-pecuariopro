import http from "../../../shared/services/http-common.js";
export class VeterinarianApiService{

    getAll() {
        return http.get('/veterinarian');
    }
    getById(id){
        return http.get(`/veterinarian/${id}`);
    }
    create(veterinarianResource){
        return http.post('/veterinarian',veterinarianResource);
    }


    update(id, veterinarian){
        return http.put(`/veterinarian/${id}`,veterinarian);
    }


    delete(id){
        return http.delete(`/veterinarian/${id}`);
    }
}