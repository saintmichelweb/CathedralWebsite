import { useTranslation } from "react-i18next";

export const Announcements: React.FC = () => {
    const { t } = useTranslation();

    const announcements = [
        { id: 1, title: t('announcements.item1Title'), date: '2025-01-10', description: t('announcements.item1Description'), image: 'https://media.istockphoto.com/id/1447190161/photo/church-choir-during-performance-at-concert.webp?a=1&b=1&s=612x612&w=0&k=20&c=XsYtfIcewTBm-xl0Vghh6Fzf7RlksxNCcVxH86TBSOA=' },
        { id: 2, title: t('announcements.item2Title'), date: '2025-01-15', description: t('announcements.item2Description'), image: 'https://media.istockphoto.com/id/1963460397/photo/happy-easter-flat-lay-postcard-or-internet-banner-with-copy-space-on-easter.webp?a=1&b=1&s=612x612&w=0&k=20&c=YMQeAmw01UTdohZquNjQPAL4i5Wfhd0L3EwtsvI1Odk=' },
        { id: 3, title: t('announcements.item3Title'), date: '2025-01-20', description: t('announcements.item3Description'), image: 'https://media.istockphoto.com/id/1785808259/photo/networking-opportunities.webp?a=1&b=1&s=612x612&w=0&k=20&c=qmszxK2rLqgwhOdlKtXaX9LpfzCRP_T05NtRakuURGs=' },
    ];

    const historicalPosts = [
        { id: 1, title: t('historicalPosts.post1Title') },
        { id: 2, title: t('historicalPosts.post2Title') },
        { id: 3, title: t('historicalPosts.post3Title') },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-customBlue mb-4">{t('announcements.title')}</h1>
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {/* Recent Announcements */}
                <div className="col-span-2">
                    <h2 className="text-2xl font-bold text-customBlue mb-4">{t('announcements.recent')}</h2>
                    <ul>
                        {announcements.map((announcement) => (
                            <li key={announcement.id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex">
                                <img src={announcement.image} alt={announcement.title} className="w-24 h-24 object-cover rounded-md mr-4" />
                                <div>
                                    <h3 className="text-xl font-bold text-customBlue">{announcement.title}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{t('announcements.date', { date: announcement.date })}</p>
                                    <p className="text-gray-700">{announcement.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="bg-customYellow text-white px-6 py-2 rounded-lg shadow-md hover:bg-customBlue-dark">
                        {t('announcements.loadMore')}
                    </button>
                </div>

                {/* Historical Posts */}
                <div>
                    <h2 className="text-2xl font-bold text-customBlue mb-4">{t('historicalPosts.title')}</h2>
                    <ul className="space-y-4">
                        {historicalPosts.map((post) => (
                            <li key={post.id} className="bg-white shadow-md rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-customBlue">{post.title}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Subscribe Section */}
            <div className="bg-custom-blue text-white p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">{t('subscribe.title')}</h2>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder={t('subscribe.emailPlaceholder')}
                        className="w-full p-3 rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder={t('subscribe.namePlaceholder')}
                        className="w-full p-3 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-full bg-customYellow text-customBlue font-bold py-2 rounded-lg shadow-md hover:bg-gray-100"
                    >
                        {t('subscribe.button')}
                    </button>
                </form>
            </div>
        </div>
    );
};
