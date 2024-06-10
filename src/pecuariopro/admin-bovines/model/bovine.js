import { Origin } from "./origin.entity.js";

export class Bovine {
    constructor(id, name, raza, weight, date, origin, observations, batchId, imgUrls) {
        this.id = id;
        this.name = name;
        this.raza = raza;
        this.weight = weight;
        this.date = date;
        this.origin = origin;
        this.observations = observations;
        this.batchId = batchId;
        this.imgUrls = imgUrls;
    }

    static fromDisplayableBovine(displayableBovine) {
        return new Bovine(
            displayableBovine.id,
            displayableBovine.name,
            displayableBovine.raza,
            displayableBovine.weight,
            displayableBovine.date,
            displayableBovine.origin,
            displayableBovine.observations,
            displayableBovine.batchId,
            displayableBovine.imgUrls
        );
    }

    static toDisplayableBovine(bovine) {
        return {
            id: bovine.id,
            name: bovine.name,
            raza: bovine.raza,
            weight: bovine.weight,
            date: bovine.date,
            origin: bovine.origin,
            observations: bovine.observations,
            batchId: bovine.batchId,
            imgUrls: bovine.imgUrls
        };
    }
}
