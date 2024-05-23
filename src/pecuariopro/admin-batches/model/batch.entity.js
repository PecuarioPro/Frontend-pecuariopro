export class Batch {
    constructor(id, name, area, status, campaignId) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.status = status;
        this.campaignId = campaignId;
    }

    static fromDisplayableBatch(displayableBatch) {
        return new Batch(
            displayableBatch.id,
            displayableBatch.name,
            displayableBatch.area,
            displayableBatch.status,
            displayableBatch.campaignId
        );
    }

    static toDisplayableBatch(batch) {
        return {
            id: batch.id,
            name: batch.name,
            area: batch.area,
            status: batch.status,
            campaignId: batch.campaignId
        };
    }
}