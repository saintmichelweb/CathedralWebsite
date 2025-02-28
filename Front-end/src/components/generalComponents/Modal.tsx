import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const donationOptions = [
        {
            title: "Offertory",
            description: "Support the parish's daily operations, including utilities, maintenance, and staff salaries. Donations can be made through MOMO: *182*8*1*077222#.",
            image: "https://media.istockphoto.com/id/140471987/photo/church-donation-box.jpg?s=2048x2048&w=is&k=20&c=85sacJI6gnGnA4f7g2Qh991UPRJTlfJugSr2PmxVuCI=",
        },
        {
            title: "Tithe",
            description: "A traditional 10% offering of your income to support the church's ministries and outreach programs. Donations can be made through Equity Account: 4024 4200011597 or GT Bank Account: 211103701151180.",
            image: "https://media.istockphoto.com/id/171582219/photo/tithe-and-offering.webp?a=1&b=1&s=612x612&w=0&k=20&c=CDv7DUCTyQZ2Ef8YrZoDfVzoAQOguhOeOai4G-uVk-0=",
        },
        {
            title: "Charity",
            description: "Donations specifically directed towards helping those in need, including food drives and emergency relief. Donations can be made through Equity Account: 4024 4200011597 or GT Bank Account: 211103701151180.",
            image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoYXJpdHklMjBjaHVyY2h8ZW58MHx8MHx8fDA%3D",
        },
        {
            title: "Special Donations",
            description: "Contributions for specific causes such as building renovations or support for a particular event. Donations can be made through Equity Account: 4024 4200011597 or GT Bank Account: 211103701151180.",
            image: "https://media.istockphoto.com/id/1475572162/photo/volunteers-putting-various-dry-food-in-donation-box-for-help-people.webp?a=1&b=1&s=612x612&w=0&k=20&c=UCdSaqtA9A3WOTZ5rAY56esJhHss_WvBNeVgni_viok=",
        },
        {
            title: "Memorial Donations",
            description: "Give in memory of a loved one to honor their legacy and support the church. Donations can be made through MOMO: *182*8*1*077222#.",
            image: "https://media.istockphoto.com/id/1009468128/photo/group-of-grief-candles-in-church-for-obituary-faith-resurrection.webp?a=1&b=1&s=612x612&w=0&k=20&c=W4v0E9_gulYiClah_wSc7N8zBc-UHS8OmtLTzoATZAA=",
        },
        {
            title: "Mass Intentions",
            description: "Offer a donation for a specific Mass to be said in honor of a particular intention or person. Donations can be made through MOMO: *182*8*1*077222#.",
            image: "https://stories.svdmissions.org/hs-fs/hubfs/AdobeStock_434873154.jpeg?width=600&height=400&name=AdobeStock_434873154.jpeg",
        },
        {
            title: "Equity Account",
            description: "Account: 4024 4200011597 Cathedrale Saint Michel.",
            image: "https://ridgewaysmall.co.ke/wp-content/uploads/2021/10/Equity.jpg",
        },
        {
            title: "GT Bank Account",
            description: "Account: 211103701151180 Cathedrale Saint Michel.",
            image: "https://bluechiptech.biz/wp-content/uploads/2022/12/GTBank-1024x576.jpg",
        },
        {
            title: "MOMO",
            description: "Dial *182*8*1*077222# for Paroisse Catholique Saint Michel.",
            image: "https://media.licdn.com/dms/image/v2/C4E12AQEaIxCWiA74aQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1648544928638?e=2147483647&v=beta&t=mTiY6eDHn1x4D5GtVNQvxR07Hnfp2jYhJhd6F88_5DI",
        },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Donate Now</h2>
                <p className="mb-6 text-center">
                    Thank you for considering a donation. Your generosity helps our parish continue its mission and support the community. Choose a method below:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {donationOptions.map((option, index) => (
                        <div key={index} className="border rounded-lg shadow-md overflow-hidden">
                            <img
                                src={option.image}
                                alt={option.title}
                                className="w-full h-32 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                                <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
