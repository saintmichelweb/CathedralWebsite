import { BannerPage } from "../../components/aboutComponents"
import cathAction from '../../assets/cathAction.jpg';

export const CatholicActionsPage =()=>{
    return(
        <div className="w-full">
             <BannerPage pageTitle={'Catholic Actions'} image={cathAction} />
            
        </div>
    )
}