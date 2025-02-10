import { BannerPage } from "../../components/aboutComponents/BannerPage"
import altar from '../../assets/jacob-bentzinger-sOo0kwPPALU-unsplash.jpg'
import { HistoryCathedral } from "../../components/aboutComponents/HistoryCathedral"
import { HistoryCathedralData } from "../../data/HistoryCathedralData"
import { MissionVision } from "../../components/aboutComponents/MissionVision"
import { LayReaders } from "../../components/aboutComponents/LayLeaders"
import { LayLeadersData } from '../../data/LayLeadersData'
import { TopStories } from "../../components/aboutComponents/TopStories"

export const AboutPage: React.FC = () => {
    return (
        <div className="w-full">
            <BannerPage pageTitle={'About'} image={altar} />
            <HistoryCathedral title={HistoryCathedralData[0].title} description={HistoryCathedralData[0].description} />
            <MissionVision />
            <LayReaders image={LayLeadersData[0].image} description={LayLeadersData[0].description} />
            <TopStories />
        </div>
    )
}