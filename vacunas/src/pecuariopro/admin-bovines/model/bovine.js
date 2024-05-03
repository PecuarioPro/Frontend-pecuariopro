export class Bovine {
    constructor(id, name, raza, peso, date, origin, observations) {
        this.id = id;
        this.name = name;
        this.raza = raza;
        this.peso = peso;
        this.date = date;
        this.origin = origin;
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
