import React, { useEffect, useState } from "react";
import { fetchChoir } from "../../services";
import { useTranslation } from "react-i18next";
import { Choir } from "../../types/Choir";
import { useNavigate } from "react-router-dom";

export const Chorals: React.FC = () => {
    // const chorals = [
    //     { title: "Choral 1", description: "A beautiful choral performance", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-iB25w0dy7AXgmlUOmM6l-3TiNC4e10t-UQ&s" },
    //     { title: "Choral 2", description: "An uplifting choral composition", image: "https://i.ytimg.com/vi/ULuPPJoO9ro/sddefault.jpg" },
    //     { title: "Choral 3", description: "A soulful choral arrangement", image: "https://i.ytimg.com/vi/-037Bvg4o1o/maxresdefault.jpg" },
    //     { title: "Choral 4", description: "A harmonious choral piece", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40-aXhT_bAP1F75KCdtr3igqZcHC82yw2NQfLNcOovoHkiSbhVEfslrV0BLz3xV3yg94&usqp=CAU" },
    //     { title: "Choral 5", description: "A powerful choral rendition", image: "https://www.holyspiritcleveland.org/wp-content/uploads/2013/08/HOLY-SPIRIT-CHOIR.jpeg" },
    //     { title: "Choral 6", description: "A peaceful choral piece", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQe14oYpG2jZTOBF7lG7yOy6XzJRazYaNZnJqrTDbjE8KHTuM5QSSyS0mIix3y8-7zdbc&usqp=CAU" }
    // ];

    const { i18n } = useTranslation();
    const currentLang = i18n.language || "en"

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [choirData, setChoirData] = useState<{ title: string; description: string; image: string; }[]>([]);
    const navigate = useNavigate();
    const handleButton = ()=>{
        navigate('/chorals/1')
    }



    useEffect(() => {
        const fetchChoirData = async () => {
            try {
                const response = await fetchChoir();
                console.log("Fetched Data:", response);
    
                if (!response || !response.Choir) {
                    throw new Error("Invalid response structure");
                }
    
                const formattedData = response.Choir.map((choir: Choir) => {
                    const descriptionKey = `description_${currentLang}` as keyof typeof choir.description;
                    return {
                        title: choir.name,
                        description: choir.description[descriptionKey] || choir.description.description_en, 
                        image: choir.backgroundImage
                    };
                });
    
                setChoirData(formattedData);
                setLoading(false);
            } catch (err: unknown) {
                console.error("Error fetching history data", err);
                setError(err instanceof Error ? err.message : "Failed to load history data.");
                setLoading(false);
            }
        };
    
        fetchChoirData();
    }, [currentLang, i18n.language]);
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-custom-blue text-center mb-8">Chorals Page</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {choirData.map((choral, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={choral.image} alt={choral.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{choral.title}</h2>
                                <p className="text-gray-600 text-sm mb-4">{choral.description}</p>
                                <button onClick={handleButton} className="px-6 py-2 bg-customYellow text-white font-semibold rounded-lg w-full hover:bg-custom-blue transition duration-300">
                                    Explore
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
