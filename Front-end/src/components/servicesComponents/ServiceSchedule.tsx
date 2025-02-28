import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchMassTime } from "../../services";
// import { time } from "console";

export const ServiceSchedule: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("officeHours");

  const [massScheduleDatas, setMassScheduleDatas] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: "officeHours", label: t("tabs.officeHours") },
    { id: "massTimes", label: t("tabs.massTimes") },
    { id: "chapel", label: t("tabs.chapel") },
    { id: "penanceSchedule", label: t("tabs.penanceSchedule") },
  ];


useEffect(()=>{
  const fetchMassScheduleDatas = async ()=>{
    try {
      const data = await fetchMassTime();
      console.log(data.data);
      setMassScheduleDatas(data.data);
    } catch (error) {
        console.error("Failed to fetch Mass Time Data",error);
        setError(t('error.loadingMassTime'))
    }
  }
  fetchMassScheduleDatas();
},[t])

type Time = {
  time: string;
  language: string;
};

type Schedule = {
  day: string;
  times: Time[];
};

type Location = {
  id: number;
  tabTitle: string;
  content: Schedule[];
};


  

  const chapelData = [
    {
      id: 0,
      title: "St Michel",
      description:
        "The chapel is open for prayer and meditation daily from 6:00 AM to 8:00 PM.",
    },
    {
      id: 1,
      title: "St. Paul",
      description:
        "The chapel is open for prayer and meditation daily from 7:00 AM to 9:00 PM.",
    },
  ];

  const penanceScheduleData = [
    {
      id: 0,
      title: "St Michel",
      content: [
        { day: "Tuesday", times: ["5:00 PM - 6:00 PM"] },
        { day: "Friday", times: ["5:00 PM - 6:00 PM"] },
      ],
    },
    {
      id: 1,
      title: "St. Paul",
      content: [{ day: "Saturday", times: ["4:00 PM - 5:00 PM"] }],
    },
  ];

  const renderCard = (title: string, details: JSX.Element) => (
    <div className="p-4  bg-custom-blue text-center text-white rounded shadow">
      <h3 className="font-bold text-lg">{title}</h3>
      {details}
    </div>
  );

  const renderMassSchedule = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {massScheduleDatas.map((location:Location) =>
        renderCard(
          location.tabTitle,
          <ul>
            {location.content.map((schedule: Schedule, idx:number) => (
              <li key={idx} className="mb-2">
                <strong>{schedule.day}:</strong> {schedule.times.map((timeObj: { time: string; language: string; })=> `${timeObj.time} (${timeObj.language})`).join(", ")}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );

  const renderChapelContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {chapelData.map((chapel) =>
        renderCard(chapel.title, <p>{chapel.description}</p>)
      )}
    </div>
  );

  const renderPenanceSchedule = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {penanceScheduleData.map((location) =>
        renderCard(
          location.title,
          <ul>
            {location.content.map((schedule, idx) => (
              <li key={idx} className="mb-2">
                <strong>{schedule.day}:</strong> {schedule.times.join(", ")}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );

  const schedules: Record<string, JSX.Element> = {
    officeHours: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        <div className="p-4  bg-custom-blue text-white rounded shadow">
          <h3 className="font-bold text-lg">{t("schedule.office.title")}</h3>
          <p>{t("schedule.office.days.0")}</p>
          <p>{t("schedule.office.hours.0")}</p>
          <p>{t("schedule.office.days.1")}</p>
          <p>{t("schedule.office.hours.1")}</p>
          <p className="italic">{t("schedule.office.note")}</p>
        </div>
        <div className="p-4  bg-custom-blue text-white rounded shadow">
          <h3 className="font-bold text-lg">{t("schedule.priest.title")}</h3>
          <p>{t("schedule.priest.days.0")}</p>
          <p>{t("schedule.priest.hours.0")}</p>
          <p>{t("schedule.priest.days.1")}</p>
          <p>{t("schedule.priest.hours.1")}</p>
        </div>
        <div className="p-4  bg-custom-blue text-white rounded shadow">
          <h3 className="font-bold text-lg">{t("schedule.caritas.title")}</h3>
          <p>{t("schedule.caritas.days.0")}</p>
          <p>{t("schedule.caritas.hours.0")}</p>
          <p>{t("schedule.caritas.days.1")}</p>
          <p>{t("schedule.caritas.hours.1")}</p>
        </div>
      </div>
    ),
    massTimes: renderMassSchedule(),
    chapel: renderChapelContent(),
    penanceSchedule: renderPenanceSchedule(),
  };


  if(error){
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-5xl text-custom-blue font-bold text-center mb-6 mt-3">Service Schedule</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm md:text-base font-medium rounded focus:outline-none focus:ring ${
              activeTab === tab.id
                ? " bg-custom-blue text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white shadow rounded p-6">
        {schedules[activeTab]}
      </div>
    </div>
  );
};
