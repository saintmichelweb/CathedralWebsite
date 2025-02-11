import { BannerPage } from "../../components/aboutComponents"
import announcement from '../../assets/14E.jpg';
import { Announcements } from "../../components/annoucementComponents";

export const AnnouncementsPage = ()=>{
    return(
        <div className="w-full">
            <BannerPage pageTitle={'Annoucements'} image={announcement}/>
            <Announcements/>
        </div>
    )
}