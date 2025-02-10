import { useState } from "react";

export interface Tab {
    id: number;
    tabTitle: string;
    content: JSX.Element;
}

interface TabsComponentProps {
    title: string;
    tabs: Tab[];
}

export const TabsComponent: React.FC<TabsComponentProps> = ({ title, tabs }) => {
    const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

    const handleTabClick = (tabId: number) => {
        setActiveTab(tabId);
    };

    return (
        <div className="p-4 w-full">
            <h2 className='text-custom-blue font-bold text-2xl md:text-4xl my-4'>{title}</h2>
            <div className="flex flex-col sm:flex-row space-y-1 sm:space-x-1 mb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2  sm:mb-0 w-full sm:w-auto font-medium border rounded-md transition-colors duration-300 ${activeTab === tab.id ? 'bg-custom-blue text-customYellow border-custom-blue' : 'bg-white text-custom-blue border-gray-300'}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.tabTitle}
                    </button>
                ))}
            </div>
            <div className="p-4 mt-2  rounded-md shadow-md bg-custom-blue">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};
