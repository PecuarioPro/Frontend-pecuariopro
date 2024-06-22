import http from "../http-common.js";

export class CitiesApiService{
    getAll(){
        return http.get('/cities');
    }

    getById(id){
        return http.get(`/cities/${id}`);
    }

    create(city){
        return http.post('/cities',city);
    }

    update(id, city){
        return http.put(`/cities/${id}`,city);
    }

    delete(id){
        return http.delete(`/cities/${id}`);
    }

    findByName(name){
        return http.get(`/cities?name=${name}`);
    }
}