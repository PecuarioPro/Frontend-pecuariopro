import {Origin} from "./origin.entity.js";

export class Bovine {
    constructor(id, name, raza, weight, date,origin, observations) {
        this.id = id;
        this.name = name;
        this.raza = raza;
        this.weight = weight;
        this.date = date;
        this.origin = origin;
        //this.origin = new Origin;
        this.observations = observations;

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

        );
    }

    static toDisplayableBovine(bovine) {
        return {
            id: bovine.id,
            name: bovine.name,
            raza: bovine.raza,
            peso: bovine.weight,
            date: bovine.date,
            origin: bovine.origin,
            observations: bovine.observations,

        };
    }

}
