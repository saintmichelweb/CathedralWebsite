import { BannerPage, Chorals } from "../../components/aboutComponents";
import choral from "../../assets/choral.jpg";

export const ChoralsPage = ()=>{
    return(
        <div className="w-full">
            <BannerPage pageTitle="Chorals Page" image={choral}/>
            <Chorals/>
        </div>
    )
}