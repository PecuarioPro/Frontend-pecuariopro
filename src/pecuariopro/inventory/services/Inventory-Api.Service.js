import http from "../../../shared/services/http-common.js";
export class InventoryApiService{

    getAll() {
        return http.get('/inventory');
    }
    getById(id){
        return http.get(`/inventory/${id}`);
    }
    create(inventoryResource){
        return http.post('/inventory',inventoryResource);
    }


    update(id, inventory){
        return http.put(`/inventory/${id}`,inventory);
    }


    delete(id){
        return http.delete(`/inventory/${id}`);
    }
}

