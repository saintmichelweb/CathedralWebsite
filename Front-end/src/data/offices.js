import officeImg from '../assets/images/_K4C9496.jpg';

export const getOffices = () => {
  return new Promise((resolve) => {
    const offices = [
      {
        Id: 1,
        Title: {
          en: "Office Service",
          fr: "Service de Bureau",
          rw: "Serivisi y’Ibiro"
        },
        Description: {
          en: "Handles all official church matters.",
          fr: "Gère toutes les affaires officielles de l'église.",
          rw: "Ishinzwe ibikorwa byose byemewe bya kiliziya."
        },
        ContactPerson: "Fr. Jean Bosco",
        TelephoneNumber: "+250 788 123 456",
        WorkDays: "Monday - Friday",
        WorkHours: "08:00 AM - 05:00 PM",
        BackgroundImage: officeImg,
        Action: {
          en: "Request Info",
          fr: "Demander Infos",
          rw: "Saba Amakuru"
        }
      },
      {
        Id: 2,
        Title: {
          en: "Secretary's Office",
          fr: "Bureau du Secrétaire",
          rw: "Ibiro bya Sekretereri"
        },
        Description: {
          en: "Responsible for managing parish documentation and records.",
          fr: "Responsable de la gestion des documents et archives de la paroisse.",
          rw: "Ishinzwe inyandiko n’ububiko bwa paruwasi."
        },
        ContactPerson: "Sr. Béatrice Mukamana",
        TelephoneNumber: "+250 788 987 654",
        WorkDays: "Monday - Friday",
        WorkHours: "08:30 AM - 04:30 PM",
        BackgroundImage: officeImg,
        Action: {
          en: "Submit Document",
          fr: "Soumettre Document",
          rw: "Tanga Inyandiko"
        }
      },
      {
        Id: 3,
        Title: {
          en: "Caritas Office",
          fr: "Bureau de Caritas",
          rw: "Ibiro bya Karitas"
        },
        Description: {
          en: "Coordinates social services and charity activities.",
          fr: "Coordonne les services sociaux et les activités caritatives.",
          rw: "Ihuza ibikorwa by’ubufasha n’ineza."
        },
        ContactPerson: "Mr. David Nkurunziza",
        TelephoneNumber: "+250 788 456 789",
        WorkDays: "Monday - Thursday",
        WorkHours: "09:00 AM - 03:00 PM",
        BackgroundImage: officeImg,
        Action: {
          en: "Request Assistance",
          fr: "Demander de l’Aide",
          rw: "Saba Ubufasha"
        }
      },
      {
        Id: 4,
        Title: {
          en: "Catechism Office",
          fr: "Bureau de Catéchèse",
          rw: "Ibiro by’Inkuru Nziza"
        },
        Description: {
          en: "Manages catechism classes, materials, and schedules.",
          fr: "Gère les cours de catéchèse, les matériaux et les horaires.",
          rw: "Igenzura amasomo ya katekézime n’ibikoresho biyifasha."
        },
        ContactPerson: "Catechist Marie Uwimana",
        TelephoneNumber: "+250 789 654 321",
        WorkDays: "Tuesday - Friday",
        WorkHours: "10:00 AM - 04:00 PM",
        BackgroundImage: officeImg,
        Action: {
          en: "Enroll in Class",
          fr: "S'inscrire au Cours",
          rw: "Iyandikishe mu Ishuri"
        }
      },
      {
        Id: 5,
        Title: {
          en: "Finance Office",
          fr: "Bureau des Finances",
          rw: "Ibiro by’Imari"
        },
        Description: {
          en: "Oversees financial operations including tithes and donations.",
          fr: "Supervise les opérations financières, y compris les dîmes et les dons.",
          rw: "Ishinzwe imari, amaturo n’inkunga zitangwa."
        },
        ContactPerson: "Mr. Jean Claude Nduwimana",
        TelephoneNumber: "+250 788 321 456",
        WorkDays: "Monday - Friday",
        WorkHours: "08:00 AM - 12:00 PM",
        BackgroundImage: officeImg,
        Action: {
          en: "View Statement",
          fr: "Voir le Relevé",
          rw: "Reba Ibaruramari"
        }
      },
      {
        Id: 6,
        Title: {
          en: "Pastoral Coordination Office",
          fr: "Bureau de Coordination Pastorale",
          rw: "Ibiro by’Ubushumba"
        },
        Description: {
          en: "Plans and coordinates pastoral programs and ministries.",
          fr: "Planifie et coordonne les programmes et ministères pastoraux.",
          rw: "Itegura kandi igenzura ibikorwa by’ubushumba n’ubutumwa."
        },
        ContactPerson: "Fr. Michel Rukundo",
        TelephoneNumber: "+250 784 111 222",
        WorkDays: "Monday - Thursday",
        WorkHours: "09:00 AM - 05:00 PM",
        BackgroundImage: officeImg,
        Action: {
          en: "View Programs",
          fr: "Voir les Programmes",
          rw: "Reba Gahunda"
        }
      }
    ];

    setTimeout(() => resolve(offices), 700); 
  });
};
