import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchWelcomeMsg } from '../../services';

export const WelcomeMsg: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [welcomeData, setWelcomeData] = useState<{ image: string; content: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWelcomeMsgData = async () => {
            try {
                const data = await fetchWelcomeMsg();
                if (data?.welcome_message) {
                    const { backgroundImage, welcomeMessage } = data.welcome_message;
                    const currentLang = i18n.language;
                    const content =
                        currentLang === 'fr'
                            ? welcomeMessage.welcomeMessage_fr
                            : currentLang === 'rw'
                            ? welcomeMessage.welcomeMessage_rw
                            : welcomeMessage.welcomeMessage_en;
                    setWelcomeData({
                        image: backgroundImage.imageUrl,
                        content,
                    });
                } else {
                    throw new Error('Empty Welcome Message Error');
                }
            } catch (error) {
                console.error('Failed to fetch Welcome Message Data Error', error);
                setError('Unable to load Welcome Message');
            }
        };
        fetchWelcomeMsgData();
    }, [i18n.language]); // Only re-fetch when the language changes

    return (
        <div className="p-4 w-full">
            <h2 className="text-custom-blue font-bold text-2xl md:text-4xl">{t('welcome')}</h2>
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="flex flex-col md:flex-row bg-custom-blue my-4 rounded-2xl overflow-hidden">
                    <div
                        className="w-full md:w-1/3 h-48 md:h-60 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${welcomeData?.image || ''})` }}
                    />
                    <div className="w-full md:w-2/3">
                        <p className="p-4 text-white">{welcomeData?.content || 'Loading...'}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
