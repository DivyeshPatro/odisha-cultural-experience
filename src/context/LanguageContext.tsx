import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Language = 'en' | 'or'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: (en: string, or: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'odisha_lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'or' ? 'or' : 'en'
  })

  const setLang = (nextLang: Language) => {
    setLangState(nextLang)
    try {
      localStorage.setItem(STORAGE_KEY, nextLang)
    } catch {
      // ignore storage errors
    }
  }

  const toggleLang = () => {
    setLang(lang === 'en' ? 'or' : 'en')
  }

  const t = (en: string, or: string) => {
    return lang === 'or' ? or : en
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'or' ? 'or' : 'en'
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
