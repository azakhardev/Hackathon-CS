import csLang from './locales/cs/translation.json'
import enLang from './locales/en/translation.json'


import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug:true,
    fallbackLng: 'cs',
    returnObjects: true,
    resources: {
        cs: {
            translation: csLang
        },
        en: {
            translation: enLang
        }
    },
    ns: ['translation', 'homepage']
})