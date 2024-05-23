import http from "../../../shared/services/http-common.js";
export class StaffApiService{
    
    getAll() {
        return http.get('/staff')
    }
}