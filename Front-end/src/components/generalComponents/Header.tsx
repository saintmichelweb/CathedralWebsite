import { Link } from "react-router-dom";
import logo from '../../assets/Logo.png';
import { useTranslation } from "react-i18next";
import { NavigationLink } from "./NavigationLink";
import fr from '../../assets/fr.png';
import en from '../../assets/en.png';
import rw from '../../assets/rw.png';
import { LanguageButton } from "./LanguageButton";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { CustomButton } from "./CustomButton";
import Modal from "./Modal";

export const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        void i18n.changeLanguage(lng);
    };

    return (
        <nav className="sticky top-0 left-0 z-10 shadow-lg bg-custom-blue w-full flex flex-col sm:flex-row items-center justify-between p-4">
            {/* Logo and Title */}
            <div className="flex items-center justify-between w-full sm:w-auto">
                <Link to="/" className="text-customYellow flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-9" />
                    <p className="text-xl font-bold hidden sm:block">
                        Cathedral Saint Michel
                    </p>
                </Link>
                {/* Hamburger Menu Icon */}
                <button className="text-customYellow sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? (
                        <X className="w-8 h-8" />
                    ) : (
                        <Menu className="w-8 h-8" />
                    )}
                </button>
            </div>

            {/* Menu Items */}
            <ul className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0 ${menuOpen ? 'block' : 'hidden sm:flex'}`}>
                <NavigationLink to="/" text={t('home')} />
                <div className="relative group">
                    <NavigationLink to="about" text={t('about')} />
                    <ul className="absolute hidden group-hover:block bg-custom-blue w-48 z-10 p-2 rounded-md mt-1">
                        <NavigationLink to="/priest" text={t('abouts.priest')} />
                        <NavigationLink to="/chorals" text={t('abouts.ourChorales')} />
                        <NavigationLink to="/catholicAction" text={t('abouts.catholicAction')} />
                        <NavigationLink to="/community" text={t('abouts.community')} />
                    </ul>
                </div>
                <NavigationLink to="service" text={t('service')} />
                <NavigationLink to="/contact" text={t('contactPage')} />
                <NavigationLink to="/announcements" text={t('announcementsPage')} />
                <li>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="text-customYellow"
                    >
                        <CustomButton translationKey={t('donate')} />
                    </button>
                </li>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <LanguageButton onClick={() => changeLanguage('en')} imageSrc={en} altText={t('lang')} />
                    <LanguageButton onClick={() => changeLanguage('fr')} imageSrc={fr} altText={t('lang')} />
                    <LanguageButton onClick={() => changeLanguage('rw')} imageSrc={rw} altText={t('lang')} />
                </div>
            </ul>

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </nav>
    );
};
