import { BannerPage } from "../../components/aboutComponents"
import image from '../../assets/6.jpg'
import { TabsComponent } from "../../components/generalComponents"
import { useTranslation } from "react-i18next"
import { ServiceScheduleTabs } from "../../util"
import { ServiceScheduleData } from "../../data/ServiceScheduleData"


export const ServicePage: React.FC = () => {
    const { t } = useTranslation();
    const serviceData = ServiceScheduleTabs(ServiceScheduleData, t)
    return (
        <div className="w-full">
            <BannerPage pageTitle={'Services'} image={image} />
            <TabsComponent tabs={serviceData} title={t('serviceSchedule')} />
        </div>
    )
}