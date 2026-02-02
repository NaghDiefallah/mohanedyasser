import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  nav: {
    home: string;
    work: string;
    services: string;
    skills: string;
    letsTalk: string;
  };
  hero: {
    name: string;
    title1: string;
    title2: string;
    software: string;
    seeMyWork: string;
    letsTalk: string;
    projects: string;
    experience: string;
    response: string;
  };
  settings: {
    theme: string;
    light: string;
    dark: string;
    language: string;
    english: string;
    arabic: string;
  };
  contact: {
    header: string;
    subHeader: string;
    tagline: string;
    copyright: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      services: 'Services',
      skills: 'Skills',
      letsTalk: "Let's Talk",
    },
    hero: {
      name: 'Mohaned Yasser',
      title1: 'VIDEO',
      title2: 'EDITOR',
      software: 'Adobe After Effects, Adobe Premiere Pro, Adobe Photoshop, Adobe Audition',
      seeMyWork: 'See My Work',
      letsTalk: "Let's Talk",
      projects: '+50 Projects',
      experience: '1 yr Experience',
      response: '24h Response',
    },
    settings: {
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      language: 'Language',
      english: 'English',
      arabic: 'العربية',
    },
    contact: {
      header: 'Contact Us',
      subHeader: "Let's Talk",
      tagline: 'Professional video editing services. Elevate your content with cinematic quality.',
      copyright: 'All Rights Reserved.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      work: 'أعمالي',
      services: 'الخدمات',
      skills: 'المهارات',
      letsTalk: 'تواصل معي',
    },
    hero: {
      name: 'مهند ياسر',
      title1: 'محرر',
      title2: 'فيديو',
      software: 'أدوبي أفتر إفكتس، أدوبي بريمير برو، أدوبي فوتوشوب، أدوبي أوديشن',
      seeMyWork: 'شاهد أعمالي',
      letsTalk: 'تواصل معي',
      projects: '+50 مشروع',
      experience: '1 سنة خبرة',
      response: 'رد خلال 24 ساعة',
    },
    settings: {
      theme: 'المظهر',
      light: 'فاتح',
      dark: 'داكن',
      language: 'اللغة',
      english: 'English',
      arabic: 'العربية',
    },
    contact: {
      header: 'تواصل معنا',
      subHeader: 'تواصل معي',
      tagline: 'خدمات مونتاج فيديو احترافية. ارتقِ بمحتواك بجودة سينمائية.',
      copyright: 'جميع الحقوق محفوظة.',
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
    
    // Smooth RTL/LTR transition
    const root = document.documentElement;
    root.style.transition = 'none';
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    root.lang = language;
    
    // Force reflow to apply direction change instantly
    void root.offsetHeight;
    root.style.transition = '';
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
