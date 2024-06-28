export class Batch {
    constructor(id, name, area, campaignId,districtId,cityId,departmentId) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.districtId = districtId;
        this.cityId = cityId;
        this.departmentId = departmentId
        this.campaignId = campaignId;
    }

    static fromDisplayableBatch(displayableBatch,departmentId,cityId,districtId) {
        return new Batch(
            displayableBatch.id,
            displayableBatch.name,
            displayableBatch.area,
            displayableBatch.campaignId,
            districtId,
            cityId,
            departmentId
        );
    }

    static toDisplayableBatch(batch,origin) {
        return {
            id: batch.id,
            name: batch.name,
            area: batch.area,
            origin:origin,
            campaignId: batch.campaignId
        };
    }
}