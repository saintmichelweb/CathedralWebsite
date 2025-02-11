import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { CommissionLeaderContactData } from '../../data/CommissionLeaderContactData';
import { fetchCommision } from '../../services';
import { useTranslation } from 'react-i18next';

interface CommissionData {
    id: number;
    title: {
        name_en: string;
        name_fr: string;
        name_rw: string;
    };
    contact_person_name: string;
    contact_person_role: string;
    contact_person_phone_number: string;
    contact_person_email: string;
    backgroundImage: string;
    description: {
        description_en: string;
        description_fr: string;
        description_rw: string;
    };
}



export const CommissionPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const {t,i18n} = useTranslation();

    const [commissionData, setCommissionData] = useState<CommissionData | null>(null);
    const [error,setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        const fetchOneCommissionData = async ()=>{
            try {
                if(!id || isNaN(parseInt(id))){
                    setError(t('error.invalidCommissionId'));
                    setIsLoading(false);
                    return;
                }

                const data = await fetchCommision();
                console.log(data.commissions);
                const commissionId = parseInt(id,10);
                const commision = data.commissions.find((item: CommissionData)=>item.id === commissionId);

                if(!commision){
                    setError(t('error.commissionNotFound'));
                    setIsLoading(false);
                    return;
                }

                console.log(commision);
                setCommissionData(commision);
                setIsLoading(false)


            } catch (error) {
                console.error("Failed to fetch Commission Data",error);
                setError(t('error.loadingCommission'));
                setIsLoading(false);
            }
        }
        fetchOneCommissionData();
    },[id,t])

    if (isLoading) {
        return <div className="p-4 text-center">{t('loading')}</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!commissionData) {
        return <div className="p-4 text-center">{t('error.noCommissionData')}</div>;
    }
   
    const getLocalizedText = (text: { name_en: string; name_fr: string; name_rw: string }) => {
        switch (i18n.language) {
            case 'fr':
                return text.name_fr;
            case 'rw':
                return text.name_rw;
            default:
                return text.name_en;
        }
    };

    const getLocalizedDescription = (description: { description_en: string; description_fr: string; description_rw: string }) => {
        switch (i18n.language) {
            case 'fr':
                return description.description_fr;
            case 'rw':
                return description.description_rw;
            default:
                return description.description_en;
        }
    };


    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            
            <h1 className="text-3xl font-bold mb-4">{getLocalizedText(commissionData.title)}</h1>
            <div className="flex items-center mb-6">
                <img
                    src={commissionData.backgroundImage}
                    alt={commissionData.contact_person_name}
                    className="w-24 h-24 rounded-full object-cover mr-4 border-2 border-gray-200 shadow-md"
                />
                <div>
                    <h2 className="text-xl font-semibold mb-2">{commissionData.contact_person_role}</h2>
                    <p className="text-sm text-gray-600 mb-1">Phone: {commissionData.contact_person_phone_number}</p>
                    <p className="text-sm text-gray-600 mb-4">Email: {commissionData.contact_person_email}</p>
                </div>
            </div>
             <p className="text-base text-gray-700">{getLocalizedDescription(commissionData.description)}</p>
            <a href={`mailto:${commissionData.contact_person_email}`} className="text-blue-600 hover:underline mt-4 inline-block">
                Send an Email
            </a>
        </div>
    );
};
