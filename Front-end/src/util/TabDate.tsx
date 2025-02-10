import { MassTime } from "../types/MassTime";
import { Tab } from "../components/generalComponents/TabsComponent";
import massTimeImage from '../assets/masstime.jpg';
import { ServiceSchedule } from "../types/ServiceSchedule";

export const convertMassTimeToTabs = (
    massTimeData: MassTime[],
    t: (key: string) => string
): Tab[] => {
    return massTimeData.map(massTime => ({
        id: massTime.id,
        tabTitle: massTime.tabTitle,
        content: (
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2 w-full p-4">
                <div className="w-full sm:w-1/3 flex items-center justify-center flex-col text-center space-y-4">
                    <h3 className="font-bold text-customYellow">{t('sundayMass')}</h3>
                    <ul className="text-customYellow font-thin">
                        {massTime.content.Sunday.map(([time, language], index) => (
                            <li key={index}>{time} - {language}</li>
                        ))}
                    </ul>
                    <h3 className="font-bold text-customYellow">{t('weekdayMass')}</h3>
                    <ul className="text-customYellow font-thin">
                        {massTime.content.Monday_Friday.map(([time, language], index) => (
                            <li key={index}>{time} - {language}</li>
                        ))}
                    </ul>
                </div>
                <div className="w-full sm:w-1/3">
                    <img src={massTimeImage} alt="Mass Time" className="w-full rounded-md" />
                </div>
                <div className="w-full sm:w-1/3 flex items-center justify-center flex-col text-center space-y-4">
                    <h3 className="font-bold text-customYellow">{t('saturdayMass')}</h3>
                    <ul className="text-customYellow font-thin">
                        {massTime.content.Saturday.map(([time, language], index) => (
                            <li key={index}>{time} - {language}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }));
};

export const ServiceScheduleTabs = (ServiceScheduleData: ServiceSchedule[], t: (key: string) => string) => {
    return ServiceScheduleData.map(serviceTime => ({
        id: serviceTime.id,
        tabTitle: serviceTime.tabTitle,
        content: (
            <div>
                <div className="flex flex-col  w-full p-4">
                    <h1 className="text-center mb-2 font-bold text-customYellow text-lg">{t(`${serviceTime.content.subTitle}`)}</h1>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <div className="w-full sm:w-1/3 flex items-center justify-center flex-col text-center space-y-4 border border-white p-2">
                            <h1 className="text-customYellow font-bold text-xl">Office</h1>
                            <div>
                                <h6 className="bg-white p-1 text-custom-blue font-bold my-3">Tuesday - Saturday</h6>
                                <span className="text-customYellow font-semibold">9:00 - 17:00</span>
                                <h6 className="bg-white p-1 text-custom-blue font-bold my-3">Sunday</h6>
                                <span className="text-customYellow font-semibold">9:00 - 17:00</span>
                                <h6 className="bg-white p-1 text-custom-blue font-bold my-3">Monday</h6>
                                <span className="text-customYellow font-semibold">Closed</span>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/3 flex items-center justify-center flex-col text-center space-y-4 border border-white p-2">
                            <h1 className="text-customYellow font-bold text-xl">Parish priest</h1>
                            <div>
                                <h6 className="bg-white p-1 text-custom-blue font-bold my-3">Thursday</h6>
                                <span className="text-customYellow font-semibold">9:00 - 17:00</span>

                            </div>
                        </div>
                        <div className="w-full sm:w-1/3 flex items-center justify-center flex-col text-center space-y-4 border border-white p-2">
                            <h1 className="text-customYellow font-bold text-xl">Caritas</h1>
                            <div>
                                <h6 className="bg-white p-1 text-custom-blue font-bold my-3">Tuesday - Saturday</h6>
                                <span className="text-customYellow font-semibold">9:00 - 17:00</span>
                                <h6 className="bg-white p-1 text-custom-blue font-bold my-3">Sunday</h6>
                                <span className="text-customYellow font-semibold">9:00 - 17:00</span>
                                <h6 className="bg-white p-1 text-custom-blue font-bold my-3">Monday</h6>
                                <span className="text-customYellow font-semibold">Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
                <div></div>

            </div>
        )
    }))
}