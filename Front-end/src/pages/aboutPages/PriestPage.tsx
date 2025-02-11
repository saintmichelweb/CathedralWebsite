import React  from "react"
import priest from '../../assets/priest.jpg'
import { BannerPage } from "../../components/aboutComponents/BannerPage"
import { PriestComponent } from "../../components/aboutComponents/PriestComponent"
export const PriestPage:React.FC = ()=>{
    return(
        <div>
             <BannerPage pageTitle={'Our Priest'} image={priest} />
            <PriestComponent/>
        </div>
    )
}