import { createContext, useContext } from 'react'

export type Lang = 'en' | 'id'

export const LanguageContext = createContext<Lang>('id')
export const useLang = () => useContext(LanguageContext)
