import React from "react";
import { useLanguage } from "@/lib/i18n/language-context"


interface Recording {
  title: string;
  date: string;
  audioSrc: string;
}

interface ChoirAudioSectionProps {
  recordings: Recording[];
}

const ChoirAudioSection: React.FC<ChoirAudioSectionProps> = ({ recordings }) => {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#002F6C] font-serif mb-4">{t("listenChoirs")}</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("listenChoirsDesc")}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {recordings.map((recording, index) => (
            <div key={index} className="bg-[#F5F5F5] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-[#002F6C]">{recording.title}</h3>
                <span className="text-sm text-gray-600">{recording.date}</span>
              </div>
              <audio className="w-full" controls>
                <source src={recording.audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoirAudioSection;
