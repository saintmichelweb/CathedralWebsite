import { BannerPage } from "../../components/aboutComponents";
import image from "../../assets/6.jpg";
// import { TabsComponent } from "../../components/generalComponents";
import { useTranslation } from "react-i18next";
// import { ServiceScheduleTabs } from "../../util";
// import { ServiceScheduleData } from "../../data/ServiceScheduleData";
import { ServiceParticipation } from "../../components/servicesComponents";
import { ServiceSchedule } from "../../components/servicesComponents/ServiceSchedule";

export const ServicePage: React.FC = () => {
  const { t } = useTranslation();

  // Generate tab data dynamically with translation support
  // const serviceData = ServiceScheduleTabs(ServiceScheduleData, t);

  return (
    <div className="w-full">
      {/* Page Banner */}
      <BannerPage pageTitle={t("services")} image={image} />

      {/* Tabs Section */}
      {/* {serviceData && serviceData.length > 0 ? (
        <TabsComponent tabs={serviceData} title={t("serviceSchedule")} />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">{t("noServiceData")}</p>
        </div>
      )} */}

      
      <ServiceSchedule/>  
      <ServiceParticipation/>
    </div>
  );
};
