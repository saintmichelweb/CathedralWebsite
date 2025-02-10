import { useTranslation } from "react-i18next"
import { TabsComponent } from "../../components/generalComponents/TabsComponent"
import { RecentEvent, WelcomeMsg } from "../../components/homeComponents"
import { SlidingImage } from "../../components/homeComponents/SlidingImage"
import { MassTimeData } from "../../data/MassTimeData"
import { convertMassTimeToTabs } from "../../util/TabDate"



export const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const TabData = convertMassTimeToTabs(MassTimeData, t)
    return (
        <>
            <SlidingImage />
            <WelcomeMsg />
            <TabsComponent tabs={TabData} title={t('massTimes')} />
            <RecentEvent />
        </>
    )
}