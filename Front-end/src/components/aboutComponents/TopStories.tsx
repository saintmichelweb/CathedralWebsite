import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { CardStories } from "../generalComponents/CardStories";
import { TopStoriesData } from "../../data/TopStoriesData";

const ELEMENTS_PER_PAGE = 4;

export const TopStories: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to handle previous button click
    const handlePrevClick = () => {
        setCurrentIndex(prevIndex =>
            (prevIndex - ELEMENTS_PER_PAGE + TopStoriesData.length) % TopStoriesData.length
        );
    };

    // Function to handle next button click
    const handleNextClick = () => {
        setCurrentIndex(prevIndex =>
            (prevIndex + ELEMENTS_PER_PAGE) % TopStoriesData.length
        );
    };

    // Determine visible stories with wrap-around support
    const visibleStories = [
        ...TopStoriesData.slice(currentIndex, currentIndex + ELEMENTS_PER_PAGE),
        ...TopStoriesData.slice(0, Math.max(0, (currentIndex + ELEMENTS_PER_PAGE) - TopStoriesData.length))
    ];

    // Disable navigation buttons based on index and items available
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = TopStoriesData.length <= ELEMENTS_PER_PAGE;

    return (
        <div className="p-4">
            <h2 className="text-custom-blue font-bold text-2xl md:text-4xl my-4">
                Top Stories
            </h2>
            <div className="flex items-center justify-between">
                <button
                    onClick={handlePrevClick}
                    aria-label="Previous stories"
                    disabled={isPrevDisabled}
                    className={`flex items-center justify-center border border-custom-blue p-2 rounded-full w-10 h-10 text-custom-blue transition-transform duration-200 ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-blue hover:text-white'}`}
                >
                    <ArrowBigLeft size={24} />
                </button>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full">
                    {visibleStories.length > 0 ? (
                        visibleStories.map(story => (
                            <CardStories
                                key={story.id}
                                id={story.id}
                                title={story.title}
                                image={story.image}
                                shortDescription={story.shortDescription}
                                date={story.date}
                            />
                        ))
                    ) : (
                        <p>No stories available</p>
                    )}
                </div>
                <button
                    onClick={handleNextClick}
                    aria-label="Next stories"
                    disabled={isNextDisabled}
                    className={`flex items-center justify-center border border-custom-blue p-2 rounded-full w-10 h-10 text-custom-blue transition-transform duration-200 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-blue hover:text-white'}`}
                >
                    <ArrowBigRight size={24} />
                </button>
            </div>
        </div>
    );
};
