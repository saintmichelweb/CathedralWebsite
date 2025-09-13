import image1 from "../assets/images/_K4C9657.jpg";
import image2 from "../assets/images/_K4C9707.jpg";
import image3 from "../assets/images/_K4C9663.jpg";
import image4 from "../assets/images/_K4C9671.jpg";
import image5 from "../assets/images/carole.jpg";
import image6 from "../assets/images/_K4C9642.jpg";

export const getParishCouncil = async () => {
  // Simulate an async fetch
  return Promise.resolve([
    {
      id: 1,
      Names: "⁠A. Innocent CONSOLATEUR",
      position_en: "President of the Parish Council",
      position_fr: "Président du Conseil Paroissial",
      position_rw: "Perezida w'Inama y'Abakristu",
      Description_en: "Leads the council and oversees key decisions.",
      Description_fr: "Dirige le conseil et supervise les décisions clés.",
      Description_rw: "Ayobora inama kandi agenzura ibyemezo by’ingenzi.",
      Telephone: "+250 788 123 001",
      Email: "innocent.consolateur@saintmichel.rw",
      BackgroundImage: image2,
      action: {
        en: "View Profile",
        fr: "Voir le profil",
        rw: "Reba Umwirondoro",
      },
    },
    {
      id: 2,
      Names: "Mr Seraphin Ntagwabira",
      position_en: "Vice President",
      position_fr: "Vice-Président",
      position_rw: "Visi Perezida",
      Description_en: "Supports the president and assumes duties in their absence.",
      Description_fr: "Soutient le président et assume ses fonctions en son absence.",
      Description_rw: "Afasha perezida kandi amusimbura mu gihe adahari.",
      Telephone: "+250 788 123 002",
      Email: "example@example.com",
      BackgroundImage: image1,
      action: {
        en: "View Profile",
        fr: "Voir le profil",
        rw: "Reba Umwirondoro",
      },
    },
    {
      id: 3,
      Names: "Mrs Marie Basebanyakwinshi",
      position_en: "Secretary",
      position_fr: "Secrétaire",
      position_rw: "Umunyamabanga",
      Description_en: "Keeps records and coordinates meetings.",
      Description_fr: "Tient les registres et coordonne les réunions.",
      Description_rw: "Abika inyandiko kandi ategura inama.",
      Telephone: "+250 788 123 003",
      Email: "examplee@example.com",
      BackgroundImage: image3,
      action: {
        en: "View Profile",
        fr: "Voir le profil",
        rw: "Reba Umwirondoro",
      },
    },
    {
      id: 4,
      Names: "Mrs Rose Baguma",
      position_en: "Committee Member",
      position_fr: "Membre du comité",
      position_rw: "Umwe mu bagize komite",
      Description_en: "Contributes to council activities and community engagement.",
      Description_fr: "Contribue aux activités du conseil et à l'engagement communautaire.",
      Description_rw: "Afasha mu bikorwa by’inama n’iterambere ry’umuryango.",
      Telephone: "+250 788 123 004",
      Email: "example@example.com",
      BackgroundImage: image4,
      action: {
        en: "View Profile",
        fr: "Voir le profil",
        rw: "Reba Umwirondoro",
      },
    },
    {
      id: 5,
      Names: "Mrs Carole Karema",
      position_en: "Committee Member",
      position_fr: "Membre du comité",
      position_rw: "Umwe mu bagize komite",
      Description_en: "Works on development and social outreach programs.",
      Description_fr: "Travaille sur les programmes de développement et d'engagement social.",
      Description_rw: "Akora ku bikorwa by’iterambere n’imishinga ifasha abaturage.",
      Telephone: "+250 788 123 005",
      Email: "example@example.com",
      BackgroundImage: image5,
      action: {
        en: "View Profile",
        fr: "Voir le profil",
        rw: "Reba Umwirondoro",
      },
    },
    {
      id: 6,
      Names: "Mrs Wivine Kabuto",
      position_en: "Public Relations Officer",
      position_fr: "Chargée des relations publiques",
      position_rw: "Ushinzwe itangazamakuru n’itumanaho",
      Description_en: "Handles media and public communications for the council.",
      Description_fr: "Gère les médias et la communication publique pour le conseil.",
      Description_rw: "Ashinzwe gutangaza ibikorwa by’inama n’itumanaho ryayo.",
      Telephone: "+250 788 123 006",
      Email: "example@example.com",
      BackgroundImage: image6,
      action: {
        en: "View Profile",
        fr: "Voir le profil",
        rw: "Reba Umwirondoro",
      },
    },
  ]);
};
