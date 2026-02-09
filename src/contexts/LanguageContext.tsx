import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  nav: {
    home: string;
    work: string;
    services: string;
    about: string;
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
  about: {
    label: string;
    title: string;
    titleHighlight: string;
    description: string;
    bio: string;
    stats: { label: string; value: string }[];
    skills: string[];
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
  projectDetail: {
    notFound: string;
    backToWork: string;
    reel: string;
    motionGraphics: string;
    toolsUsed: string;
    behindTheScenes: string;
    behindTheScenesHighlight: string;
    credits: string;
    relatedWork: string;
    relatedWorkHighlight: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      services: 'Services',
      about: 'About',
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
      response: '6h Response',
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
    about: {
      label: 'About Me',
      title: 'About',
      titleHighlight: 'Me',
      description: 'Passionate video editor with a cinematic eye and a love for storytelling.',
      bio: "I'm Mohaned Yasser — a professional video editor specializing in cinematic editing, motion graphics, color grading, and audio enhancement. I bring stories to life through precision editing and creative visual design. Every frame matters, every cut counts.",
      stats: [
        { label: 'Projects Completed', value: '+50' },
        { label: 'Years of Experience', value: '1+' },
        { label: 'Response Time', value: '6h' },
      ],
      skills: ['Video Editing', 'Motion Graphics', 'Color Grading', 'Sound Design', 'VFX', 'Animation'],
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
        {
          title: 'Vocal Enhance',
          description: 'Professional audio cleanup and enhancement for crystal clear, broadcast-ready sound.',
          price: 'Starting at $200',
          features: ['Noise removal', 'EQ balancing', 'Dynamic range', 'Voice clarity'],
        },
        {
          title: 'Mixing & Sound Design',
          description: 'Professional audio mixing and creative sound design that adds depth and emotion to your projects.',
          price: 'Starting at $400',
          features: ['Multi-track mixing', 'Foley & SFX', 'Spatial audio', 'Master output'],
        },
        {
          title: 'AI-Powered Editing',
          description: 'Leveraging cutting-edge AI tools to speed up workflows, enhance visuals, and deliver smarter edits.',
          price: 'Starting at $350',
          features: ['AI video upscaling', 'Auto scene detection', 'AI voice cloning', 'Smart object removal'],
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
    projectDetail: {
      notFound: 'Project Not Found',
      backToWork: 'Back to Work',
      reel: 'Reel',
      motionGraphics: 'Motion Graphics',
      toolsUsed: 'Tools Used',
      behindTheScenes: 'Behind The',
      behindTheScenesHighlight: 'Scenes',
      credits: 'Credits',
      relatedWork: 'Related',
      relatedWorkHighlight: 'Work',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      work: 'أعمالي',
      services: 'خدماتي',
      about: 'عني',
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
      response: 'رد خلال 6 ساعات',
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
    about: {
      label: 'عني',
      title: 'عن',
      titleHighlight: 'مهند',
      description: 'محرر فيديو شغوف بعين سينمائية وحب للسرد القصصي.',
      bio: 'أنا مهند ياسر — محرر فيديو محترف متخصص في المونتاج السينمائي، الموشن جرافيك، تلوين الفيديوهات، وتحسين الصوت. أحول القصص إلى واقع من خلال المونتاج الدقيق والتصميم البصري الإبداعي. كل إطار مهم، كل قطع محسوب.',
      stats: [
        { label: 'مشروع مكتمل', value: '+50' },
        { label: 'سنوات الخبرة', value: '+1' },
        { label: 'وقت الاستجابة', value: '6 ساعات' },
      ],
      skills: ['مونتاج الفيديو', 'موشن جرافيك', 'تلوين الفيديوهات', 'تصميم الصوت', 'مؤثرات بصرية', 'أنيميشن'],
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
        {
          title: 'تحسين الأصوات',
          description: 'تنظيف ومعالجة صوتية احترافية لصوت نقي وجاهز للبث.',
          price: 'يبدأ من 200$',
          features: ['إزالة الضوضاء', 'توازن الترددات', 'ضغط ديناميكي', 'وضوح الصوت'],
        },
        {
          title: 'مكساج وتصميم صوتي',
          description: 'مكساج صوتي احترافي وتصميم صوتي إبداعي يضيف عمقاً وإحساساً لمشاريعك.',
          price: 'يبدأ من 400$',
          features: ['مكساج متعدد المسارات', 'مؤثرات صوتية', 'صوت مكاني', 'ماستر نهائي'],
        },
        {
          title: 'مونتاج بالذكاء الاصطناعي',
          description: 'استخدام أحدث أدوات الذكاء الاصطناعي لتسريع العمل وتحسين الجودة وتقديم نتائج أذكى.',
          price: 'يبدأ من 350$',
          features: ['تحسين جودة الفيديو بالـ AI', 'كشف المشاهد تلقائياً', 'استنساخ الصوت بالـ AI', 'إزالة العناصر الذكية'],
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
    projectDetail: {
      notFound: 'المشروع غير موجود',
      backToWork: 'العودة للأعمال',
      reel: 'ريلز',
      motionGraphics: 'موشن جرافيك',
      toolsUsed: 'الأدوات المستخدمة',
      behindTheScenes: 'خلف',
      behindTheScenesHighlight: 'الكواليس',
      credits: 'فريق العمل',
      relatedWork: 'أعمال',
      relatedWorkHighlight: 'مشابهة',
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