import { BannerPage } from "../../components/aboutComponents"
import contactImg from "../../assets/_K4C9496.jpg";
import { Contact } from "../../components/contactComponents";

export const ContactPage = () =>{
    return(
        <div className="w-full">
            <BannerPage pageTitle={'Contact'} image={contactImg}/>
            <Contact/>

        </div>
    )
}