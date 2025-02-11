import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../generalComponents/Card";
import { fetchRecentEvents } from "../../services";
import { RecentEvents } from "../../types";

const ITEMS_PER_PAGE = 3;

export const RecentEvent: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState<RecentEvents[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecentEventData = async () => {
            try {
                const recentEvent = await fetchRecentEvents();
                if (recentEvent.data?.length) {
                    setEvents(recentEvent.data);
                } else {
                    throw new Error("Empty Recent Event Data");
                }
            } catch (error) {
                console.error("Failed to fetch Recent Events", error);
                setError(t("error.fetchRecentEvents") || "Failed to load recent events.");
            } finally {
                setLoading(false);
            }
        };
        fetchRecentEventData();
    }, [i18n.language]); // Use i18n.language instead of t

    const totalItems = events.length;

    const getLocalizedText = (field?: Record<string, string>) =>
        field?.[`title_${i18n.language}`] || field?.[`description_${i18n.language}`] || "N/A";

    const handlePrevClick = () => {
        if (totalItems > ITEMS_PER_PAGE) {
            setCurrentIndex((prevIndex) => (prevIndex - ITEMS_PER_PAGE + totalItems) % totalItems);
        }
    };

    const handleNextClick = () => {
        if (totalItems > ITEMS_PER_PAGE) {
            setCurrentIndex((prevIndex) => (prevIndex + ITEMS_PER_PAGE) % totalItems);
        }
    };

    const visibleItems = events.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

    if (loading) {
        return <div>{t("loading")}</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-custom-blue font-bold text-2xl md:text-4xl mb-4">
                {t("recentEvents")}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <button
                    aria-label={t("previous")}
                    className="bg-custom-blue text-white p-2 rounded-md flex items-center disabled:opacity-50"
                    onClick={handlePrevClick}
                    disabled={totalItems <= ITEMS_PER_PAGE}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2">
                    {visibleItems.length > 0 ? (
                        visibleItems.map((recentE) => (
                            <Card
                                key={recentE.id}
                                id={recentE.id}
                                title={getLocalizedText(recentE.title)}
                                description={getLocalizedText(recentE.description)}
                                image={recentE.image}
                                isActive={true}
                            />
                        ))
                    ) : (
                        <p>{t("noEvents")}</p>
                    )}
                </div>
                <button
                    aria-label={t("next")}
                    className="bg-custom-blue text-white p-2 rounded-md flex items-center disabled:opacity-50"
                    onClick={handleNextClick}
                    disabled={totalItems <= ITEMS_PER_PAGE}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
