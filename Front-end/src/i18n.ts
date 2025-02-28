import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './locales/en.json'
import frTranslation from './locales/fr.json'
import rwTranslation from './locales/rw.json'

const resources = {
    en:{translation: enTranslation},
    fr:{translation: frTranslation},
    rw:{translation: rwTranslation},
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    debug: true,
    interpolation:{escapeValue: false}
});

export default i18n;