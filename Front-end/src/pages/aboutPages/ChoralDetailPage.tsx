import { BannerPage, ChoralDetailPages } from "../../components/aboutComponents"
import choral from '../../assets/choral.jpg'

export const ChoralDetailPage = ()=>{
  return(
    <div className="w-full">
      <BannerPage pageTitle={"Choral Detail"} image={choral}/>
      <ChoralDetailPages/>
    </div>
  )
}