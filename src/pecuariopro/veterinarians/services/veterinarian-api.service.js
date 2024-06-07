import http from "../../../shared/services/http-common.js";
export class VeterinarianApiService{

    getAll() {
        return http.get('/veterinarians');
    }
    getById(id){
        return http.get(`/veterinarians/${id}`);
    }
}