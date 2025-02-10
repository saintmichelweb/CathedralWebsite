import React from 'react';
import { WelcomeMsgData } from '../../data/WelcomeMsgData';
import { useTranslation } from 'react-i18next';

export const WelcomeMsg: React.FC = () => {
    const { t } = useTranslation();
    const imageUrl = WelcomeMsgData[0].image;

    return (
        <div className='p-4 w-full'>
            <h2 className='text-custom-blue font-bold text-2xl md:text-4xl'>{t('welcome')}</h2>
            <div className='flex flex-col md:flex-row bg-custom-blue my-4 rounded-2xl overflow-hidden'>
                <div
                    className='w-full md:w-1/3 h-48 md:h-60 bg-contain bg-center bg-no-repeat'
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
                <div className='w-full md:w-2/3'>
                    <p className='p-4 text-white'>{`${WelcomeMsgData[0].content}`}</p>
                </div>
            </div>
        </div>
    );
};
