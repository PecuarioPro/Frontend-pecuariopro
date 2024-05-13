import {Bovine} from "../../admin-bovines/model/bovine.js";

export class Batch {
    constructor(id, name, area, status, bovines = []) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.status = status;
        this.bovines = bovines;
    }

    static fromDisplayableBatch(displayableBatch) {
        return new Batch(
            displayableBatch.id,
            displayableBatch.name,
            displayableBatch.area,
            displayableBatch.status,
            displayableBatch.bovines.map(bovine => Bovine.fromDisplayableBovine(bovine))
        );
    }

    static toDisplayableBatch(batch) {
        return {
            id: batch.id,
            name: batch.name,
            area: batch.area,
            status: batch.status,
            bovines: batch.bovines.map(bovine => Bovine.toDisplayableBovine(bovine))
        };
    }
}