import Img1 from '../assets/images/_K4C9707.jpg';
import Img2 from '../assets/images/_K4C9680.jpg';
import Img3 from '../assets/images/_K4C9685.jpg';

export const priests = () => {
  return new Promise((resolve) => {
    const data = [
      {
        id: 1,
        name: "A. Innocent CONSOLATEUR",
        title: "Parish Priest",
        description: {
          en: "Father Innocent CONSOLATEUR has been serving as the Parish Priest since 2010, leading the community with devotion and spiritual wisdom.",
          fr: "Le Père Innocent CONSOLATEUR est curé de la paroisse depuis 2010, guidant la communauté avec dévouement et sagesse spirituelle.",
          rw: "Padiri Innocent CONSOLATEUR amaze kuyobora iyi paruwasi kuva mu 2010, ayobora abakirisitu mu bwitange n'ubushishozi bw'iyobokamana."
        },
        image: Img1,
        startYear: 2010,
        action: {
          en: "Read More",
          fr: "Lire Plus",
          rw: "Soma Ibindi"
        }
      },
      {
        id: 2,
        name: "P. Eugène MUHIRE RWIGILIRA",
        title: "Assistant Priest",
        description: {
          en: "Father Eugène MUHIRE RWIGILIRA is committed to youth engagement and pastoral support, actively assisting in parish duties since 2015.",
          fr: "Le Père Eugène MUHIRE RWIGILIRA s’engage activement dans l’accompagnement des jeunes et les activités pastorales depuis 2015.",
          rw: "Padiri Eugène MUHIRE RWIGILIRA yitangiye cyane umurimo wo gufasha urubyiruko no gukora imirimo ya giparuwasi kuva mu 2015."
        },
        image: Img2,
        startYear: 2015,
        action: {
          en: "Read More",
          fr: "Lire Plus",
          rw: "Soma Ibindi"
        }
      },
      {
        id: 3,
        name: "A. Jean-Claude NTAKIYIMANA",
        title: "Senior Priest",
        description: {
          en: "Father Jean-Claude NTAKIYIMANA brings over 30 years of pastoral experience, offering mentorship and spiritual guidance to both clergy and laity.",
          fr: "Le Père Jean-Claude NTAKIYIMANA a plus de 30 ans d'expérience pastorale, apportant mentorat et guidance spirituelle au clergé et aux fidèles.",
          rw: "Padiri Jean-Claude NTAKIYIMANA afite uburambe bw’imyaka irenga 30 mu butumwa bwa gipasitori, atanga ubuyobozi no kugira inama abapadiri n’abakirisitu."
        },
        image: Img3,
        startYear: 1990,
        action: {
          en: "Read More",
          fr: "Lire Plus",
          rw: "Soma Ibindi"
        }
      }
    ];

    setTimeout(() => resolve(data), 500); 
  });
};
