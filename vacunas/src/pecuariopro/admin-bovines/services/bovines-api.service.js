import http from "../../../shared/services/http-common.js";
export class BovinesApiService{
    /**
     * Get all bovines
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getAll(){
        return http.get('/bovines');
    }
    /**
     * Get bovine by id
     * @param id - bovine id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getById(id){
        return http.get(`/bovines/${id}`);
    }
    /**
     * Create new bovine
     * @param bovine - tutorial data
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    create(bovine){
        return http.post('/bovines',bovine);
    }

    /**
     *
     * @param id - tutorial id to update
     * @param bovine - tutorial data
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    update(id, bovine){
        return http.put(`/bovines/${id}`,bovine);
    }

    /**
     * Delete bovine by id
     * @param id - bovine id to delete
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    delete(id){
        return http.delete(`/bovines/${id}`);
    }

    /**
     * Get all bovines that match the title criteria
     * @param name - bovine title criteria
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    findByName(name){
        return http.get(`/bovines?name=${name}`);
    }


}