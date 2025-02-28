import React, { useEffect, useState } from 'react';
import { CardParishPersonnel } from './CardParishPersonnel';
import { fetchParishCouncil } from '../../services';
import { useTranslation } from 'react-i18next';
import { CardParishPersonnelType } from '../../types';



export const ParishCouncil: React.FC = () => {
    const {t,i18n} = useTranslation();
    const [error,setError] = useState<string | null>(null);
    const [parishData, setParishData] = useState<CardParishPersonnelType[]>([]);


    useEffect(()=>{
        const fetchParishData = async ()=>{
            try {
            const data = await fetchParishCouncil();
            console.log(data.parishCommitteeCouncils);
            setParishData(data.parishCommitteeCouncils || []);
        } catch (error) {
            console.error("Failed to fetch Parish data",error);
            setError(t('error.loadingParish'));
        }
        };
        fetchParishData();
        
    },[t])
    return (
        <div className="w-full p-4 flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-24">
            {error ? (
                <p className='text-red-500'>{error}</p>
            ):(
               parishData.map((parishPersonnel)=>{
                //Get the current language from i18n
                const currentLang = i18n.language;
                //select the appropriate translation
                const position = 
                    parishPersonnel.position?.[`position_${currentLang}`] || 
                    parishPersonnel.position?.position_en;

                    return(
                        <CardParishPersonnel
                        key={parishPersonnel.id}
                        id={parishPersonnel.id}
                        image={parishPersonnel.backgroundImage}
                        names={parishPersonnel.names}
                        position={position}
                        phone={parishPersonnel.telephone}
                        email={parishPersonnel.email}
                        />
                    )
               }) 
            )}
        
        </div>
    );
}
