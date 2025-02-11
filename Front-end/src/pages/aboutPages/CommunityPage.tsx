import { BannerPage } from "../../components/aboutComponents/BannerPage"
import communityImage from "../../assets/community.jpg"
import { CatholicActions } from "../../components/aboutComponents"

export const CommunityPage = ()=>{
    return(
        <div className="w-full">
            <BannerPage pageTitle={"Communities Details"} image={communityImage}/>
                <CatholicActions/>
        </div>
    )
}