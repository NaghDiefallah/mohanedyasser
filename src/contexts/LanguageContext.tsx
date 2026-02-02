import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  nav: {
    work: string;
    services: string;
    contact: string;
    letsTalk: string;
  };
  hero: {
    line1: string;
    line2: string;
    line3a: string;
    line3b: string;
    subtitle: string;
    description: string;
    viewWork: string;
    playReel: string;
    scroll: string;
  };
  settings: {
    theme: string;
    light: string;
    dark: string;
    language: string;
    english: string;
    arabic: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      work: 'Work',
      services: 'Services',
      contact: 'Contact',
      letsTalk: "Let's Talk",
    },
    hero: {
      line1: 'I',
      line2: 'CUT',
      line3a: 'THE ',
      line3b: 'NOISE.',
      subtitle: 'Video Editor & Motion Designer',
      description: 'Crafting cinematic experiences for brands that refuse to blend in. From concept to final cut.',
      viewWork: 'View Work',
      playReel: 'Play Reel',
      scroll: 'Scroll',
    },
    settings: {
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      language: 'Language',
      english: 'English',
      arabic: 'العربية',
    },
  },
  ar: {
    nav: {
      work: 'أعمالي',
      services: 'الخدمات',
      contact: 'تواصل',
      letsTalk: 'تواصل معي',
    },
    hero: {
      line1: 'أنا',
      line2: 'أقطع',
      line3a: 'كل ',
      line3b: 'الضوضاء.',
      subtitle: 'محرر فيديو ومصمم موشن',
      description: 'أصنع تجارب سينمائية للعلامات التجارية التي ترفض الذوبان في الحشد. من الفكرة إلى القص النهائي.',
      viewWork: 'شاهد أعمالي',
      playReel: 'شاهد الريل',
      scroll: 'اسحب للأسفل',
    },
    settings: {
      theme: 'المظهر',
      light: 'فاتح',
      dark: 'داكن',
      language: 'اللغة',
      english: 'English',
      arabic: 'العربية',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
