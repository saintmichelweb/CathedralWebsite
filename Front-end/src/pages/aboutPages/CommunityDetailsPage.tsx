import { BannerPage } from "../../components/aboutComponents";
import communityImage from "../../assets/community.jpg"

export const CommunityDetailsPage: React.FC = () => {
   
    return (
        <div className="w-full p-6">
            <BannerPage pageTitle={"Communities Details"} image={communityImage}/>
        </div>
    );
};
