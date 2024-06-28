export class Veterinarian {
    constructor(id,first_name, last_name,speciality, phone_number, email, city, status, photoUrl) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.speciality = speciality;
        this.phone_number = phone_number;
        this.email = email;
        this.city = city;
        this.status = status;
        this.photoUrl = photoUrl;
    }
    static fromDisplayableVeterinarian(displayableVeterinarian) {
        return new Veterinarian(
            displayableVeterinarian.id,
            displayableVeterinarian.first_name,
            displayableVeterinarian.last_name,
            displayableVeterinarian.speciality,
            displayableVeterinarian.email,
            displayableVeterinarian.phone_number,
            displayableVeterinarian.city,
            displayableVeterinarian.status,
            displayableVeterinarian.photoUrl
        )
    }
    static toDisplayableVeterinarian(veterinarian){
        return {
            id: veterinarian.id,
            first_name: veterinarian.first_name,
            last_name: veterinarian.last_name,
            speciality: veterinarian.speciality,
            phone_number: veterinarian.phone_number,
            email: veterinarian.email,
            city: veterinarian.city,
            status: veterinarian.status,
            photoUrl: veterinarian.photoUrl
        }
    }
}
