import http from "../../../../../../../Downloads/Frontend-pecuariopro-develop/src/shared/services/http-common.js";
export class StaffApiService{

    getAll() {
        return http.get('/veterinarians');
    }
    getById(id){
        return http.get(`/veterinarians/${id}`);
    }
    findByName(name){
        return http.get(`/veterinarians?name=${name}`);
    }
}