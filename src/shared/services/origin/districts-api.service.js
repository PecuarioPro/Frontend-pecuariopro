import http from "../http-common.js";

export class DistrictsApiService{

    getAll(){
        return http.get('/districts');
    }

    getById(id){
        return http.get(`/districts/${id}`);
    }

    create(district){
        return http.post('/districts',district);
    }


    update(id, district){
        return http.put(`/districts/${id}`,district);
    }


    delete(id){
        return http.delete(`/districts/${id}`);
    }

    findByName(name){
        return http.get(`/districts/name/${name}`);
    }



}