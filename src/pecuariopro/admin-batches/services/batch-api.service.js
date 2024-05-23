import http from "../../../shared/services/http-common.js";
export class BatchApiService{

    getAll(){
        return http.get('/batches');
    }

    getById(id){
        return http.get(`/batches/${id}`);
    }

    create(campaign){
        return http.post('/batches',campaign);
    }


    update(id, campaign){
        return http.put(`/batches/${id}`,campaign);
    }


    delete(id){
        return http.delete(`/batches/${id}`);
    }

    findByName(name){
        return http.get(`/batches?name=${name}`);
    }


}