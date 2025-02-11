import React, { useEffect, useState } from 'react';
import { PriestCard } from "./PriestCard"; 
import priestImage from '../../assets/priest.jpg';
import {useTranslation} from 'react-i18next';
import {fetchPriest} from '../../services';
import {PriestType} from '../../types'

export const PriestComponent: React.FC = () => {
    const {t,i18n} = useTranslation();
    const [error,setError] = useState<string | null>(null);
    const [priestData, setPriestData] = useState<PriestType[]>([])


    useEffect(()=>{
        const fetchPriestData = async ()=>{
            try {
                const data = await fetchPriest();
                console.log(data.priests);
                setPriestData(data.priests);
            } catch (error) {
                console.error("Failed to fecth Priest Data");
                setError(t('error.loadingPriest'));
            }
        }
        fetchPriestData();
    },[t])


    
    return (
        <div className="container mx-auto px-4 py-8">
            {error ? (
                <p className='text-red-500'>{error}</p>
            ):(
                priestData.map((priestPerson,index)=>{
                    const currentLang = i18n.language;
                    const priestDescription = 
                        priestPerson.description?.[`description_${currentLang}`] ||
                        priestPerson.description?.description_en;
                        return(
                            <PriestCard
                                key={index}
                                title={priestPerson.title}
                                name={priestPerson.name}
                                image={priestPerson.backgroundImage}
                                description={priestDescription}
                            />
                        )

                })
            )}
        </div>
    );
};
