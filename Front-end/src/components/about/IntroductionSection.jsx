import { useTranslation } from "react-i18next";

export const IntroductionSection = () =>{
    const { t, i18n } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-6">
            {t("aboutParishCommittee")}
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mb-6"></div>
          <p className="text-gray-700 mb-4">{t("parishCommitteeDesc1")}</p>
          <p className="text-gray-700 mb-4">{t("parishCommitteeDesc2")}</p>
          <p className="text-gray-700 mb-6">{t("parishCommitteeDesc3")}</p>

          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[#002F6C] mb-4">
              {t("committeeResponsibilities")}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <li key={i}>{t(`committeeResp${i}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}