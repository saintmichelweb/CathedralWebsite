import { CardParishPersonnel } from "../types/CardParishPersonnel";
import priest from '../assets/050421_FrJosephMuth_StMatthew-BlessedSacrement_KP-7058-1-768x512.jpg'
import secretary from '../assets/WhatsApp Image 2024-08-12 at 21.46.18_04591ab8.jpg'
import vicePresident from '../assets/WhatsApp Image 2024-08-13 at 00.21.06_9dc27b92.jpg'
import rose from '../assets/WhatsApp Image 2024-08-13 at 00.24.04_c7daed65.jpg'
import carole from '../assets/WhatsApp Image 2024-08-13 at 00.25.18_9055eccc.jpg'
import wivine from '../assets/WhatsApp Image 2024-08-13 at 07.22.49_175254a0.jpg'

export const ParishPersonnel:CardParishPersonnel[]=[
    {
        id:1,
        image:priest,
        names:'Father Joseph Muth',
        position:'President Of Committee Council',
        phone:'+250 788 11 22',
        email:'joseph@gmail.com',
    },
    {
        id:2,
        image:vicePresident,
        names:'Mr. Seraphin Ntagwabira Rumaziminsi',
        position:'Vice President Of Committee Council',
        phone:'+250 788 11 22',
        email:'seraphin@gmail.com',
    },
    {
        id:3,
        image:secretary,
        names:'Mme. Marie Basebanyakwinshi ',
        position:'Secretary Of Committee Council',
        phone:'+250 788 11 22',
        email:'marie@gmail.com',
    },
    {
        id:4,
        image:rose,
        names:'Mrs. Rose Baguma',
        position:'Advisor',
        phone:'+250 788 11 22',
        email:'rose@gmail.com',
    },
    {
        id:5,
        image:carole,
        names:'Mrs. Carole Karema ',
        position:'Advisor',
        phone:'+250 788 11 22',
        email:'carole@gmail.com',
    },
    {
        id:6,
        image:wivine,
        names:'Mrs. Wivine Kabuto ',
        position:'Administration & Public Relations',
        phone:'+250 788 11 22',
        email:'wivine@gmail.com',
    }
]