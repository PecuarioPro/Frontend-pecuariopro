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

    getBovinesGroupedByBatchId() {
        return this.getAll().then(response => {
            const bovines = response.data;

            const groupedByBatchId = {};
            bovines.forEach(bovine => {
                const batchId = bovine.batchId;
                if (!groupedByBatchId[batchId]) {
                    groupedByBatchId[batchId] = [];
                }
                groupedByBatchId[batchId].push(bovine);
            });

            return Object.entries(groupedByBatchId).map(([batchId, bovines]) => ({
                batchId: parseInt(batchId),
                count: bovines.length,
                bovines: bovines
            }));
        });
    }
}