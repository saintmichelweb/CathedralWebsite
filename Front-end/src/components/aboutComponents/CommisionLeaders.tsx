import { useTranslation } from "react-i18next";
import { ContactCard } from "../generalComponents/ContactCard";
import { useEffect, useState } from "react";
import { fetchCommision } from "../../services";
import { CommissionLeaderContact } from "../../types";


type Language = 'en' | 'fr' | 'rw'

export const CommissionLeaders: React.FC = () => {
    const {t,i18n} = useTranslation();
    const [error,setError] = useState<string | null>(null);
    const [commissionData, setCommissionData] = useState<CommissionLeaderContact[]>([]);


    useEffect(()=>{
        const fetchCommissionData = async ()=>{
            try {
                const data = await fetchCommision();
                console.log(data.commissions)
                setCommissionData(data.commissions);
            } catch (error) {
                console.error("Failed to fetch Commission Data",error);
                setError(t('error.loadingCommission'));

            }
        }
        fetchCommissionData();
    },[t]);



    return (
        <div className="p-6">
            <h2 className=" text-custom-blue text-2xl font-bold mb-6">Our Commissions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ):(
                    commissionData.map((commission)=>{
                        const currentLang = i18n.language as Language;
                        const title:string = 
                        commission.title?.[`name_${currentLang}`] ||
                        commission.title?.name_en;

                        return(
                            <ContactCard
                                key={commission.id}
                                id={commission.id}
                                name={commission.contact_person_name}
                                position={title}
                                phone={commission.contact_person_phone_number}
                                email={commission.contact_person_email}
                                image={commission.backgroundImage}
                            />
                        )

                    })
                )}
            </div>
        </div>
    );
}