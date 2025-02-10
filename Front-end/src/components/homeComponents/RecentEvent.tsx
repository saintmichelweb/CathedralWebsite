import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../generalComponents/Card";
import { RecentEventData } from "../../data/RecentEventData";

const ITEMS_PER_PAGE = 3;

export const RecentEvent: React.FC = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Calculate the total number of items
    const totalItems = RecentEventData.length;

    // Function to handle previous button click
    const handlePrevClick = () => {
        setCurrentIndex(prevIndex =>
            (prevIndex - ITEMS_PER_PAGE + totalItems) % totalItems
        );
    };

    // Function to handle next button click
    const handleNextClick = () => {
        setCurrentIndex(prevIndex =>
            (prevIndex + ITEMS_PER_PAGE) % totalItems
        );
    };

    // Slice the data to get visible items
    const visibleItems = RecentEventData.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

    return (
        <div className="p-4">
            <h2 className="text-custom-blue font-bold text-2xl md:text-4xl mb-4">
                {t('recentEvents')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <button
                    aria-label={t('previous')}
                    className="bg-custom-blue text-white p-2 rounded-md flex items-center"
                    onClick={handlePrevClick}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2">
                    {visibleItems.length > 0 ? (
                        visibleItems.map((recentE) => (
                            <Card
                                key={recentE.id}
                                id={recentE.id}
                                title={recentE.title}
                                description={recentE.description}
                                image={recentE.image}
                                isActive={recentE.isActive}
                            />
                        ))
                    ) : (
                        <p>{t('noEvents')}</p>
                    )}
                </div>
                <button
                    aria-label={t('next')}
                    className="bg-custom-blue text-white p-2 rounded-md flex items-center"
                    onClick={handleNextClick}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
