export interface CommissionLeaderContact {
    id: number;
    contact_person_name: string;
    title: {
        name_en:string,
        name_fr:string,
        name_rw:string,
    };
    contact_person_phone_number: string;
    contact_person_email: string;
    link: string;
    backgroundImage: string;
    content:string
}