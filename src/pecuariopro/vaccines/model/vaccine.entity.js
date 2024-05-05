
export class Vaccine {
    constructor(id, name, reason, date, code) {
        this.id = id;
        this.name = name;
        this.reason = reason;
        this.date = date;
        this.code = code;
    }
    static fromDisplayableVaccine(displayableVaccine) {
        return new Vaccine (
            displayableVaccine.id,
            displayableVaccine.name,
            displayableVaccine.reason,
            displayableVaccine.date,
            displayableVaccine.code
        );
    }

    static toDisplayableVaccine(vaccine) {
        return {
            id: vaccine.id,
            name: vaccine.name,
            reason: vaccine.reason,
            date: vaccine.date,
            code: vaccine.code
        };
    }

}
