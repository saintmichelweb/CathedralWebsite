/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react";
import { dummyHomeSlideData } from "../../data/dummyHomeSlideData"
import { ArrowLeft, ArrowRight, Dot } from 'lucide-react';
// import { TopNewsNoticeData } from "../../data/TopNewsNoticeData";
import { fetchBanner, fetcNoticeAndNews } from "../../services";
import { TopNewsNotice } from "../../types";


export const SlidingImage: React.FC = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0)
    const intervalDuration = 5000;
    const [currentNews, setCurrentNews] = useState(0)
    const [slideData, setSlideData]= useState(dummyHomeSlideData);
    const [error, setError] = useState<string | null>(null);
    const [topNewsNoticeData, setTopNewsNoticeDate] = useState<TopNewsNotice[]>([])


    useEffect(() => {
        const fetchSlideData = async () => {
            try {
                const data = await fetchBanner();
                // console.log(data)
                if (data?.length) {
                    setSlideData(data);
                } else {
                    throw new Error('Empty banner data');
                }
            } catch (error) {
                console.error("Failed to fetch banner data", error);
                setError("Unable to load banner images, displaying default slides");
            }
        };
        fetchSlideData();
    }, []);
    
    useEffect(()=>{
        const fetchNewsData = async ()=>{
            try{
                const data = await fetcNoticeAndNews();
                // console.log(data);
                if(data?.length){
                    setTopNewsNoticeDate(data);
                }else{
                    throw new Error('Empty TopNews and Notice data');
                }
                
            }catch(error){
                console.error("Failed to fetch top news and notices",error);
                setError("Unable to load top news and notices")
            }
        };
        fetchNewsData();
    },[])




    useEffect(() => {
        const intervalId = setInterval(nextTopNews, intervalDuration);
        return () => clearInterval(intervalId);
    }, [currentNews])

    const nextTopNews = () => {
        const isLastNews = currentNews === topNewsNoticeData.length - 1;
        const newIndex = isLastNews ? 0 : currentNews + 1;
        setCurrentNews(newIndex);
    }

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slideData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const nextSlide = () => {
        const isLastSlide = currentIndex === slideData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    }

    useEffect(() => {
        const intervalId = setInterval(nextSlide, intervalDuration);
        return () => clearInterval(intervalId)
    }, [currentIndex])

    return (
        <div className="w-full m-auto py-4 px-4  relative group  sm:flex sm:items-center sm:justify-center">
            <div style={{
                        backgroundImage: `url(${slideData[currentIndex]?.image || ''})`,
                        height: '480px',
                        }}
                        className="w-full h-full bg-center bg-cover rounded-2xl duration-500"></div>
            <div className="hidden group-hover:block absolute top-[45%] -translate-y-[-50%] left-5 text-sm z-10 sm:text-2xl rounded-full p-2 bg-custom-blue/60 text-white cursor-pointer">
                <ArrowLeft size={30} onClick={prevSlide} />
            </div>
            <div className="hidden group-hover:block absolute top-[45%] -translate-y-[-50%] right-5 text-sm z-10 sm:text-2xl rounded-full p-2 bg-custom-blue/60 text-white cursor-pointer">
                <ArrowRight size={30} onClick={nextSlide} />
            </div>
            <div className="absolute bottom-14 left-[25%] text-center bg-white/80 rounded-xl w-6/12 py-4">
                <p className="text-custom-blue text-xl font-bold">{`${slideData[currentIndex]?.description?.description_en || 'Default Description'}`}</p>
            </div>
            <div className=" hidden md:block absolute bottom-[30%] right-20 w-80 h-72 bg-customYellow/50 p-4 rounded-xl items-center ">
                <h5 className="text-custom-blue font-bold text-center">{t('topNewsAndNotice')}</h5>
                <h6 className="text-white underline font-bold text-center">{`${topNewsNoticeData[currentNews]?.title?.title_en || ''}`} </h6>
                <p className="text-white text-center overflow-hidden h-32 p-2">{`${topNewsNoticeData[currentNews]?.description?.description_en || ''}`}</p>
                <div className="flex justify-center items-center">
                {Array.isArray(topNewsNoticeData) && topNewsNoticeData.length > 0 && topNewsNoticeData.map((_news, newsIndex) => (
                        <div key={newsIndex} className={`transition-transform duration-300 ${currentNews === newsIndex ? 'text-custom-blue' : 'text-white'}`}>
                            <Dot className="size-8" />
                        </div>
                    ))}

                </div>
            </div>
            <div className="absolute space-y-2 left-12 right-12 bottom-[35%] md:bottom-[35%]  sm:left-32 sm:w-[50%] md:w-1/3 sm:space-y-5 bg-custom-blue/50 rounded-xl p-2 ">
                <h1 className="font-bold text-xl sm:text-5xl  text-white text-center">Cathedral </h1>
                <h1 className="font-bold text-xl sm:text-5xl  text-white text-center"> Saint </h1>
                <h1 className="font-bold text-xl sm:text-5xl  text-white text-center"> Michel</h1>
            </div>
            <div className="flex absolute bottom-0 left-0 right-0 items-center text-custom-blue justify-center py-2 px-4 sm:px-6 lg:px-8">
                {slideData.map((_slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-sm sm:text-2xl cursor-pointer transition-transform duration-300 ${currentIndex === slideIndex ? 'text-custom-blue' : 'text-gray-200'}`}
                    >
                        <Dot className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                ))}
            </div>
            {error && (
                <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2">
                    {error}
                </div>
            )}
        </div>
    )
}