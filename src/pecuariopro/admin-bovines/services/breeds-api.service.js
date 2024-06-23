import http from "../../../shared/services/http-common.js";

export class BreedsApiService {

    getAll(){
        return http.get('/breeds');
    }

    getById(id){
        return http.get(`/breeds/${id}`);
    }

    create(breed){
        return http.post('/breeds',breed);
    }

    update(id, breed){
        return http.put(`/breeds/${id}`,breed);
    }

    delete(id){
        return http.delete(`/breeds/${id}`);
    }

    findByName(name){
        return http.get(`/breeds?name=${name}`);
    }

}