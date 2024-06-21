import http from "../../../shared/services/http-common.js";

export class BreedsApiService {

    getAll(){
        return http.get('/breeds');
    }

    getById(id){
        return http.get(`/breeds/${id}`);
    }

    create(race){
        return http.post('/breeds',race);
    }

    update(id, race){
        return http.put(`/breeds/${id}`,race);
    }

    delete(id){
        return http.delete(`/breeds/${id}`);
    }

    findByName(name){
        return http.get(`/breeds?name=${name}`);
    }

}