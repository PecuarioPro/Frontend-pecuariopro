export class Campaign {
    constructor(id,name,dateStart,dateEnd,objective,condition,userId) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.objective = objective;
        this.condition = condition;
        this.userId = userId;
    }

    static fromDisplayableCampaign(displayableCampaign) {
        return new Campaign(
            displayableCampaign.id,
            displayableCampaign.name,
            displayableCampaign.dateStart,
            displayableCampaign.dateEnd,
            displayableCampaign.objective,
            displayableCampaign.condition,
            displayableCampaign.userId

        );
    }

    static toDisplayableCampaign(campaign) {
        return {
            id: campaign.id,
            name: campaign.name,
            dateStart: campaign.dateStart,
            dateEnd: campaign.dateEnd,
            objective: campaign.objective,
            condition: campaign.condition,
            userId: campaign.userId

        };
    }

    //  calculateDuration(){
    //     const diffTime = this.dateEnd.getTime() - this.dateStart.getTime();
    //      return diffTime / (1000 * 60 * 60 * 24);
    // }

    // aggregateBatch(batch){
    //     this.batches.push(batch);
    // }
    // aggregateBatches(batches){
    //     this.batches = batches;
    // }
    //
    // aggregateWorker(worker){
    //     this.workers.push(worker);
    // }
    //
    // aggregateWorkers(workers) {
    //     this.workers = workers;
    // }
    //
    // getBatchById(batchId){
    //     return this.batches.find(batch => batch.id == batchId);
    // }

}