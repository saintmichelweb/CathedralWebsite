import { useTranslation } from "react-i18next";

export const Contact: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-customBlue mb-4">
                {t('contact.title')}
            </h1>
            <p className="text-center text-gray-600 mb-8">{t('contact.description')}</p>

            {/* Responsive container for map and form */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Embed the Google Map */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-customBlue mb-4">
                        {t('contact.mapTitle')}
                    </h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2860.8282621800263!2d30.060172974967017!3d-1.9505406980317685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca428834a1bed%3A0x6ad695b6f9926aab!2sSt.%20Michael%20Cathedral!5e1!3m2!1sen!2srw!4v1737135286544!5m2!1sen!2srw"
                        width="100%"
                        height="300"
                        className="rounded-lg border-2 border-gray-300"
                        style={{ border: '0' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:w-1/2">
                    <form className="bg-white shadow-md rounded-lg p-6">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold">
                                {t('contact.name')}
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder={t('contact.namePlaceholder')}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold">
                                {t('contact.email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder={t('contact.emailPlaceholder')}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-bold">
                                {t('contact.message')}
                            </label>
                            <textarea
                                id="message"
                                placeholder={t('contact.messagePlaceholder')}
                                className="w-full border border-gray-300 rounded-md p-2 h-32"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-custom-blue text-white font-bold py-2 rounded-md hover:bg-customBlue-dark transition"
                        >
                            {t('contact.submit')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
