import http from "../../../shared/services/http-common.js";
export class CampaignApiService{

    getAll(){
        return http.get('/campaigns');
    }

    getById(id){
        return http.get(`/campaigns/${id}`);
    }

    create(campaign){
        return http.post('/campaigns',campaign);
    }


    update(id, campaign){
        return http.put(`/campaigns/${id}`,campaign);
    }


    delete(id){
        return http.delete(`/campaigns/${id}`);
    }

    findByName(name){
        return http.get(`/campaigns?name=${name}`);
    }


}