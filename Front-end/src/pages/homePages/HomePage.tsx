// import { useTranslation } from "react-i18next"
// import { TabsComponent } from "../../components/generalComponents/TabsComponent"
import { RecentEvent, WelcomeMsg } from "../../components/homeComponents"
import { SlidingImage } from "../../components/homeComponents/SlidingImage"
import { RenderTabs } from "../../components/homeComponents/RenderTabs"
// import { MassTimeData } from "../../data/MassTimeData"
// import { convertMassTimeToTabs } from "../../util/TabDate"
// import { useEffect, useState } from "react"
// import { MassTime } from "../../types"
// import { fetchMassTime } from "../../services"



export const HomePage: React.FC = () => {
    // const { t } = useTranslation();
    
    // const [error, setError] = useState<string | null >(null);
    // const [massTimeData, setMassTimeData] = useState<MassTime[]>([]);

    // useEffect(()=>{
    //     const fetchMassTimeData = async ()=>{
    //         try {
    //             const data = await fetchMassTime();
    //             console.log(data.data);
    //             setMassTimeData(data.data);
    //         } catch (error) {
    //             console.error("Failed to fetch Mass Time Data",error);
    //             setError(t('error.loadingMassTime'))
    //         }
    //     }
    //     fetchMassTimeData();
    // },[t])

    // const TabData = convertMassTimeToTabs(MassTimeData, t);
    // console.log(massTimeData);
    // console.log(TabData)

    return (
        <>
            <SlidingImage />
            <WelcomeMsg />
            {/* <TabsComponent tabs={TabData} title={t('massTimes')} /> */}
            <RenderTabs/>
            <RecentEvent />
        </>
    )
}