import { BannerPage, ParishCouncil } from "../../components/aboutComponents"
import leaders from '../../assets/layLeaders.jpg'
import { LayLeadersDutiesResp } from "../../components/aboutComponents/LayLeadersDutiesResp"
import { LayLeadersDutiesRespData } from "../../data/LayLeadersDutiesRespData"
import { CommissionLeaderData } from "../../data/CommissionLeaderData"
import { CommissionLeaders } from "../../components/aboutComponents/CommisionLeaders"

export const LayLeadersPage: React.FC = () => {
    return (
        <div className="w-full">
            <BannerPage pageTitle={'Lay Leaders'} image={leaders} />
            <LayLeadersDutiesResp title={LayLeadersDutiesRespData[0].title} subTitle={LayLeadersDutiesRespData[0].subTitle} content={LayLeadersDutiesRespData[0].content} />
            <ParishCouncil />
            <LayLeadersDutiesResp title={CommissionLeaderData[0].title} subTitle={CommissionLeaderData[0].subTitle} content={CommissionLeaderData[0].content} />
            <CommissionLeaders />
        </div>
    )
}