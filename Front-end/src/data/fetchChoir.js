import fratenite from '../assets/images/Fraternite.jpg';
import ubumwe from '../assets/images/ubumwe.jpg';
import lustitia from '../assets/images/Lustitia.jpg';

export const fetchChoir = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    Choir: [
      {
        id: 1,
        name: "Chorale la Fraternité Universelle",
        description: {
          description_en:
            "A vibrant and united choir joyfully serving during Sunday Mass, bringing the faithful closer through harmonious praise.",
          description_fr:
            "Une chorale vibrante et unie servant joyeusement la messe dominicale, rapprochant les fidèles par une louange harmonieuse.",
          description_rw:
            "Korali yunze ubumwe kandi y'ibyishimo, iririmba misa ya cyumweru igahuza abakristu mu kuramya Imana mu bumwe n'amajwi meza.",
        },
        leader: "Dr RUNYANGE Tharcisse",
        telephone: "+250788111222",
        backgroundImage: fratenite,
        status: "active",
      },
      {
        id: 2,
        name: "Chorale Les Messagers du Christ",
        description: {
          description_en:
            "Dedicated to preserving sacred tradition, this choir performs timeless Gregorian and liturgical chants that uplift the soul.",
          description_fr:
            "Dédiée à la préservation de la tradition sacrée, cette chorale interprète des chants grégoriens et liturgiques intemporels qui élèvent l'âme.",
          description_rw:
            "Korali yitangiye gusigasira umuco w’indirimbo zera, ikaririmba indirimbo za kera za gregorian na liturujiya zitera umutima akanyamuneza.",
        },
        leader: "Rosette Sebasoni",
        telephone: "+250788333444",
        backgroundImage: ubumwe,
        status: "active",
      },
      {
        id: 3,
        name: "Children’s Voices",
        description: {
          description_en:
            "An angelic choir of children sharing joy and faith during special occasions with their pure and uplifting voices.",
          description_fr:
            "Une chorale angélique d'enfants partageant la joie et la foi lors d'occasions spéciales avec leurs voix pures et inspirantes.",
          description_rw:
            "Korali y’abana bafite amajwi meza nk’ay’abamarayika, baririmba ku minsi mikuru bagaragaza ibyishimo n’ukwemera.",
        },
        leader: "Mrs. Uwase Aline",
        telephone: "+250788555666",
        backgroundImage: lustitia,
        status: "inactive",
      },
    ],
  };
};
