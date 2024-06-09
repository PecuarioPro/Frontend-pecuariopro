export class Veterinarian {
    constructor(id,first_name, last_name,speciality, phone_number, email, work_start_time, work_end_time, city, status, linkedin, photoUrl) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.speciality = speciality;
        this.phone_number = phone_number;
        this.email = email;
        this. work_start_time = work_start_time;
        this. work_end_time = work_end_time;
        this.city = city;
        this.status = status;
        this.linkedin = linkedin;
        this.photoUrl = photoUrl;
    }
    static fromDisplayableVeterinarian(displayableVeterinarian) {
        return new Veterinarian(
            displayableVeterinarian.id,
            displayableVeterinarian.first_name,
            displayableVeterinarian.last_name,
            displayableVeterinarian.speciality,
            displayableVeterinarian.phone_number,
            displayableVeterinarian.work_start_time,
            displayableVeterinarian.work_end_time,
            displayableVeterinarian.city,
            displayableVeterinarian.status,
            displayableVeterinarian.linkedin,
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
            work_start_time: veterinarian.work_start_time,
            work_end_time: veterinarian.work_end_time,
            city: veterinarian.city,
            status: veterinarian.status,
            linkedin: veterinarian.linkedin,
            photoUrl: veterinarian.photoUrl
        }
    }
}
