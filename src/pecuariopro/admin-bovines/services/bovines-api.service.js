import http from "../../../shared/services/http-common.js";
export class BovinesApiService{

    getAll(){
        return http.get('/bovines');
    }

    getById(id){
        return http.get(`/bovines/${id}`);
    }

    create(bovine){
        return http.post('/bovines',bovine);
    }


    update(id, bovine){
        return http.put(`/bovines/${id}`,bovine);
    }


    delete(id){
        return http.delete(`/bovines/${id}`);
    }

    findByName(name){
        return http.get(`/bovines?name=${name}`);
    }


}