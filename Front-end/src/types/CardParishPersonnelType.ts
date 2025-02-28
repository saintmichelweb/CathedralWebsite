export interface CardParishPersonnelType {
    id: number;
    backgroundImage: string;
    names: string;
    position: {
        position_en: string;
        position_fr: string;
        position_rw: string;
        [key: string]: string; 
    };
    telephone: string;
    email: string;
}
