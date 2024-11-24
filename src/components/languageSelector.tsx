import { useTranslation } from "react-i18next"

export default function LanguageSelector() {
    const { i18n } = useTranslation()

    const languages = [
        {code: 'en', language: 'En'},
        {code: 'cs', language: 'Cs'}
    ]
    
    const handleLangClick = (code: string) => {
        i18n.changeLanguage(code)
    }

    return (
        <div className="flex flex-row gap-5">
            {languages.map((lang) => (
                <button key={lang.code} className={`${i18n.language == lang.code ? "font-bold" : ''}`} onClick={() => handleLangClick(lang.code)}>{lang.language}</button>
            ))}
        </div>
    )
}