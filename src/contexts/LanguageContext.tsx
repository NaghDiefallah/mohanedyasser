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
  work: {
    reelsLabel: string;
    reelsTitle: string;
    reelsDescription: string;
    motionLabel: string;
    motionTitle: string;
    motionTitleHighlight: string;
    motionDescription: string;
    whatICreate: string;
    skills: string[];
  };
  services: {
    label: string;
    title: string;
    titleHighlight: string;
    description: string;
    getQuote: string;
    items: {
      title: string;
      description: string;
      price: string;
      features: string[];
    }[];
  };
  colorGrading: {
    label: string;
    title: string;
    titleHighlight: string;
    description: string;
    before: string;
    after: string;
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
      header: 'Contact Me',
      subHeader: "Let's Talk",
      tagline: 'Professional video editing services. Elevate your content with cinematic quality.',
      copyright: 'All Rights Reserved.',
    },
    work: {
      reelsLabel: 'Latest Work',
      reelsTitle: 'REELS',
      reelsDescription: 'Raw cuts. Pure creativity. Each frame tells a story.',
      motionLabel: 'Animation & Graphics',
      motionTitle: 'MOTION',
      motionTitleHighlight: 'GRAPHICS',
      motionDescription: 'Dynamic visuals. Seamless motion. Bringing ideas to life.',
      whatICreate: 'What I Create',
      skills: [
        '3D Modeling & Animation',
        'Kinetic Typography',
        'Logo Reveals & Intros',
        'Visual Effects (VFX)',
        'Lower Thirds & Graphics',
        'Social Media Animations',
      ],
    },
    services: {
      label: 'Services',
      title: 'What I',
      titleHighlight: 'Offer',
      description: 'End-to-end post-production services tailored to your vision and budget.',
      getQuote: 'Get Quote',
      items: [
        {
          title: 'Video Editing',
          description: 'Professional cutting, pacing, and storytelling that keeps audiences engaged from start to finish.',
          price: 'Starting at $500',
          features: ['Narrative structure', 'Sound design', 'Color matching', 'Delivery in all formats'],
        },
        {
          title: 'Color Grading',
          description: 'Cinematic color correction and grading that elevates your footage to a professional look.',
          price: 'Starting at $300',
          features: ['LUT creation', 'Scene matching', 'Film emulation', 'HDR support'],
        },
        {
          title: 'Motion Graphics',
          description: 'Eye-catching animations, titles, and visual effects that bring your brand to life.',
          price: 'Starting at $750',
          features: ['Logo animations', 'Kinetic typography', '2D/3D elements', 'Social media assets'],
        },
      ],
    },
    colorGrading: {
      label: 'Color Correction',
      title: 'COLOR',
      titleHighlight: 'GRADING',
      description: 'Drag the slider to see the before and after transformation.',
      before: 'BEFORE',
      after: 'AFTER',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      work: 'أعمالي',
      services: 'خدماتي',
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
      header: 'تواصل معي',
      subHeader: 'تواصل معي',
      tagline: 'خدمات مونتاج فيديو احترافية. ارتقِ بمحتواك بجودة سينمائية.',
      copyright: 'جميع الحقوق محفوظة.',
    },
    work: {
      reelsLabel: 'أحدث الأعمال',
      reelsTitle: 'ريلز',
      reelsDescription: 'لقطات خام. إبداع نقي. كل إطار يحكي قصة.',
      motionLabel: 'الرسوم المتحركة',
      motionTitle: 'موشن',
      motionTitleHighlight: 'جرافيك',
      motionDescription: 'مرئيات ديناميكية. حركة سلسة. نحول الأفكار إلى حياة.',
      whatICreate: 'ما أقدمه',
      skills: [
        'نمذجة وتحريك ثلاثي الأبعاد',
        'الطباعة الحركية',
        'مقدمات وكشف الشعارات',
        'المؤثرات البصرية (VFX)',
        'الشريط السفلي والرسومات',
        'رسوم متحركة لوسائل التواصل',
      ],
    },
    services: {
      label: 'خدماتي',
      title: 'ما',
      titleHighlight: 'أقدمه',
      description: 'خدمات ما بعد الإنتاج الشاملة مصممة حسب رؤيتك وميزانيتك.',
      getQuote: 'احصل على عرض سعر',
      items: [
        {
          title: 'مونتاج الفيديو',
          description: 'قص احترافي وإيقاع وسرد قصصي يحافظ على تفاعل الجمهور من البداية للنهاية.',
          price: 'يبدأ من 500$',
          features: ['هيكل السرد', 'تصميم الصوت', 'مطابقة الألوان', 'التسليم بجميع الصيغ'],
        },
        {
          title: 'تلوين الفيديوهات',
          description: 'تصحيح وتلوين سينمائي يرتقي بلقطاتك لمظهر احترافي.',
          price: 'يبدأ من 300$',
          features: ['إنشاء LUT', 'مطابقة المشاهد', 'محاكاة الأفلام', 'دعم HDR'],
        },
        {
          title: 'موشن جرافيك',
          description: 'رسوم متحركة جذابة وعناوين ومؤثرات بصرية تحيي علامتك التجارية.',
          price: 'يبدأ من 750$',
          features: ['تحريك الشعارات', 'الطباعة الحركية', 'عناصر 2D/3D', 'محتوى السوشيال ميديا'],
        },
      ],
    },
    colorGrading: {
      label: 'تصحيح الألوان',
      title: 'تلوين',
      titleHighlight: 'الفيديوهات',
      description: 'اسحب الشريط لرؤية الفرق بين قبل وبعد.',
      before: 'قبل',
      after: 'بعد',
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
