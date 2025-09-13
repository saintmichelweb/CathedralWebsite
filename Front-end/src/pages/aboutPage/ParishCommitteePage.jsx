import {
  HeroSection,
  IntroductionSection,
  BackToAboutSection,
  PCCouncilDisplay,AboutBanner
} from "../../components";
import image from '../../assets/images/_K4C9703.jpg'
import { useTranslation } from "react-i18next";

export const ParishCommitteePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <AboutBanner
      titleKey="parishCommitteeCouncil"
      descriptionKey="aboutParishCommittee"
      backgroundImage={image} />
      <IntroductionSection />

      {/* Committee Members */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">
              {t("meetCommitteeMembers")}
            </h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("committeeIntro")}
            </p>
          </div>
          <PCCouncilDisplay/>
        </div>
      </section>

      <BackToAboutSection />
    </div>
  );
};
