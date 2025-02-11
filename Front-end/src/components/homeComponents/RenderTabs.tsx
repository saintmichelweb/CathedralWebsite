import React, { useEffect, useState } from "react";
import { fetchMassTime } from "../../services";
import { t } from "i18next";
import massTimeImage from '../../assets/masstime.jpg';



interface MassTime {
    time: string;
    language: string;
  }
  
  interface DayContent {
    day: string;
    times: MassTime[];
  }
  
  interface TabData {
    id: number;
    tabTitle: string;
    content: DayContent[];
  }

  



export const RenderTabs:React.FC = ()=>{
    const [massTimeData, setMassTimeData] = useState<TabData[]>([]);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);


    useEffect(()=>{
            const fetchMassTimeData = async ()=>{
                try {
                    const data = await fetchMassTime();
                    console.log(data.data);
                    setMassTimeData(data.data);
                } catch (error) {
                    console.error("Failed to fetch Mass Time Data",error);
                    setError(t('error.loadingMassTime'))
                }
            }
            fetchMassTimeData();
        },[])

        const handleTabClick = (index: number) => {
            setActiveTab(index);
          };

          const renderTabContent = (tab: TabData) => {
            return (
              <div className="flex flex-col md:flex-row bg-custom-blue text-white p-6 rounded-md">
                <img
                  src={massTimeImage}
                  alt={`${tab.tabTitle} Church`}
                  className="w-full md:w-1/2 rounded-md mb-4 md:mb-0 md:mr-6"
                />
                <div className="flex-grow">
                  {tab.content.map((day, index) => (
                    <div key={index} className="mb-4 text-center">
                      <h2 className="text-yellow-400 font-bold text-lg">{day.day} Mass</h2>
                      {day.times.map((time, idx) => (
                        <p key={idx} className="mt-1">
                          {time.time} - {time.language}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          };



          if (error) {
            return <div className="text-red-500 text-center mt-4">{error}</div>;
          }
        
          if (!massTimeData.length) {
            return <div className="text-blue-800 text-center mt-4">Loading...</div>;
          }
        
          return (
            <div className="container mx-auto  p-4">
              <h1 className="text-3xl text-center text-blue-900 font-bold mb-6">Mass Times</h1>
              <div className="flex justify-center mb-6 space-x-4">
                {massTimeData.map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-md border ${
                      activeTab === index
                        ? "bg-custom-blue text-white"
                        : "bg-white text-custom-blue"
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.tabTitle}
                  </button>
                ))}
              </div>
              <div>{renderTabContent(massTimeData[activeTab])}</div>
            </div>
          );
}