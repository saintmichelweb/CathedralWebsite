import { BannerPage } from "../../components/aboutComponents/BannerPage";
import altar from '../../assets/jacob-bentzinger-sOo0kwPPALU-unsplash.jpg';
import { HistoryCathedral } from "../../components/aboutComponents/HistoryCathedral";
import { MissionVision } from "../../components/aboutComponents/MissionVision";
import { LayReaders } from "../../components/aboutComponents/LayLeaders";
import { LayLeadersData } from '../../data/LayLeadersData';
import { TopStories } from "../../components/aboutComponents/TopStories";
import { useEffect, useState } from "react";
import { fetchHistoryOfTheCathedral } from "../../services";
import { useTranslation } from "react-i18next";

export const AboutPage: React.FC = () => {
    const {t, i18n } = useTranslation();

    const [visionData, setVisionData] = useState({
        title: '',
        vision_en: '',
        vision_fr: '',
        vision_rw: ''
    });
    const [missionData, setMissionData] = useState({
        title: '',
        mission_en: '',
        mission_fr: '',
        mission_rw: ''
    });
    const [historyData, setHistoryData] = useState({
        title: '',
        history_en: '',
        history_fr: '',
        history_rw: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                const data = await fetchHistoryOfTheCathedral();
                // console.log(data.parishHistory.vision);
                // console.log(data.parishHistory.mission);
                setHistoryData(data.parishHistory.history);
                setMissionData(data.parishHistory.mission);
                setVisionData(data.parishHistory.vision);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching history data", error);
                setError("Failed to load history data.");
                setLoading(false);
            }
        };
        fetchHistoryData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full">
            <BannerPage pageTitle={'About'} image={altar} />
            <HistoryCathedral
                title={t('abouts.historyTitle')}
                description={historyData[`history_${i18n.language}` as keyof typeof historyData] || ''}
            />
            <MissionVision
        title="Our Mission and Vision"
        mission={missionData[`mission_${i18n.language}` as keyof typeof missionData] || "No mission available"}
        vision={visionData[`vision_${i18n.language}` as keyof typeof visionData] || "No vision available"}
      />
            <LayReaders
                image={LayLeadersData[0].image}
                description={LayLeadersData[0].description}
            />
            <TopStories />
        </div>
    );
};
