import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  ne: {
    nav: {
      home: 'गृहपृष्ठ',
      chat: 'कुराकानी',
      about: 'परियोजना',
      start: 'च्याट सुरु गर्नुहोस्',
      language: 'भाषा',
      darkMode: 'रात्री मोड',
    },
    hero: {
      badge: 'नेपाली RAG + AI',
      title: 'प्रीमियम नेपाली RAG च्याटबोट',
      subtitle: 'नेपाली ज्ञान आधारमा केन्द्रित सहायक (UI अंग्रेजीमा पनि उपलब्ध छ)। सुन्दर एनिमेसन, प्रसंग-सचेत उत्तर र सहज अनुभव।',
      cta: 'कुराकानी सुरु गर्नुहोस्',
      scroll: 'थप हेर्न स्क्रोल गर्नुहोस्',
    },
    chat: {
      title: 'संवाद सुरु गरौँ',
      subtitle: 'नेपाली र अंग्रेजी दुवै भाषामा प्रसंग अनुसारका उत्तरहरू प्राप्त गर्नुहोस्।',
      inputPlaceholder: 'तपाईंको प्रश्न टाइप गर्नुहोस्...',
      send: 'पठाउनुहोस्',
      clear: 'इतिहास खाली गर्नुहोस्',
      copy: 'उत्तर प्रतिलिपि गर्नुहोस्',
      copied: 'क्लिपबोर्डमा कपी भयो',
      suggestionsLabel: 'छिटो सुझावहरू',
      contextTitle: 'सन्दर्भ स्रोतहरू',
      contextDescription: 'नमुना स्रोतहरू जहाँबाट उत्तरहरू तयार हुन्छन्। आफ्नो ज्ञान आधारसँग सजिलै जडान गर्न सक्नुहुन्छ।',
      uploadLabel: 'फाइल जोड्नुहोस्',
      voiceStart: 'घुँघुर सुन्नुहोस्',
      voiceStop: 'रेकर्ड रोक्नुहोस्',
      attached: 'जोडिएको',
      quickSuggestions: [
        'नेपालको डिजिटल परिवर्तन योजना बताइदिनुस्',
        'लोकप्रिय ट्रेकिङ लागि के तयारी चाहिन्छ?',
        'RAG प्रणाली कसरी कस्टम डेटा पढ्छ?',
        'विद्यालयका लागि AI नीतिहरू सुझाउनुहोस्',
      ],
    },
    about: {
      title: 'किन NepaGen RAG?',
      vision: 'सरकारी, शैक्षिक र पर्यटन डाटाका लागि बनाइएको नेपाली-कृत retrieval mesh।',
      why: {
        badge: 'Nepali RAG Stack',
        lead: 'भाषा, खोज र परिनियोजन तीनै तहमा नेपाली आवश्यकताअनुसार ट्युन गरिएको छ।',
        footnote: 'विश्वसनीय उत्तर, स्वच्छ परिनियोजन, स्थानीय ownership।',
        features: [
          {
            icon: 'Stack',
            eyebrow: 'भाषा',
            title: 'नेपाली-अनुकूल NLP',
            body: 'देवनागरी सचेत tokenizer र embeddings ले शब्दरूप र transliteration दुबै बुझ्छन्।',
          },
          {
            icon: 'Target',
            eyebrow: 'डोमेन',
            title: 'क्षेत्र-ट्युन retrieval',
            body: 'राजपत्र, पाठ्यपुस्तक र पर्यटन कर्पसमा ट्युन गरिएको search ले नीति र शिक्षा प्रश्न कभर गर्छ।',
          },
          {
            icon: 'Shield',
            eyebrow: 'Grounded',
            title: 'Zero-hallucination मोड',
            body: 'विश्वास थ्रेसहोल्ड भेटिएपछि मात्र स्रोत उल्लेखित उत्तर देखा पर्छ।',
          },
          {
            icon: 'FolderDown',
            eyebrow: 'डक्स',
            title: 'आफ्नै कागजात ingestion',
            body: 'PDF वा DOCX केहि मिनेटमै अनुक्रमण गरेर आफ्नै ज्ञान आधार जोड्नुहोस्।',
          },
          {
            icon: 'Lock',
            eyebrow: 'परिनियोजन',
            title: 'Private वा offline रन',
            body: 'Air-gapped सरकारी datacenter मा GPU stack पुरै on-prem चल्छ।',
          },
          {
            icon: 'Layers',
            eyebrow: 'भविष्य',
            title: 'Modular वास्तुकला',
            body: 'मोडेल, embedding र vector store सजिलै स्विच हुने adapter-driven डिजाइन।',
          },
        ],
      },
      project: {
        nav: [
          { id: 'about-why', label: 'किन NepaGen' },
          { id: 'about-project', label: 'परियोजना विवरण' },
          { id: 'about-context', label: 'सन्दर्भ स्रोत' },
        ],
        summaryTitle: 'परियोजना अवलोकन',
        summaryLead:
          'NepaGen RAG परियोजनाले सरकारी क्लस्टर, शैक्षिक फाउण्डेसन र निजी क्षेत्रमा चल्ने multi-tenant स्ट्याक तयार गर्छ।',
        modules: [
          {
            id: 'project-architecture',
            eyebrow: 'आर्किटेक्चर',
            title: 'डेटा केन्द्र ब्लूप्रिन्ट',
            body: 'Dual-region Kubernetes क्लस्टर, API gateway, embedding सेवा र vector store लाई Zero-Trust मेषमा राखिन्छ।',
            bullets: [
              'pgvector primary/replica, S3-संगत snapshot र encrypted blob-store मार्फत स्वतः DR योजना।',
              'App gateway मा mutual TLS + short-lived tokens प्रयोग गरेर मन्त्रालय-स्तरको पहुँच नियन्त्रण।',
            ],
          },
          {
            id: 'project-operations',
            eyebrow: 'अपरेशन',
            title: 'MLOps र निरीक्षण',
            body: 'CI/CD ले tokenizer, embedder, retriever र UI build सबैलाई versioned artifact रूपमा पु¥याउँछ।',
            bullets: [
              'Prometheus, OpenTelemetry र Loki stack ले retrieval latency, citation hit-rate र hallucination guardrails ट्र्याक गर्छ।',
              'Rollout playbook मा canary र blue/green चरण समावेश भएकाले सरकारी मर्मत समयमा पनि downtime हुँदैन।',
            ],
          },
          {
            id: 'project-integration',
            eyebrow: 'एकीकरण',
            title: 'Integration + ingestion',
            body: 'SharePoint, S3, स्थानीय NAS, Cal.com वा राष्ट्रिय API gateway बाट डेटा ingest गर्ने bring-your-own connector library।',
            bullets: [
              'Lineage tracker ले प्रत्येक दस्तावेजलाई checksum, स्रोत, वर्ग र expiry नीति सहित दर्ता गर्छ।',
              'Education, नीति वा पर्यटन समूहले छुट्टै namespace पाउँछन् ताकि tenancy clash नहोस्।',
            ],
          },
        ],
      },
    },
    footer: {
      tagline: 'नेपाली बुद्धिमत्ता, विश्वस्तरिय अनुभव।',
      rights: 'प्रतिलिपि अधिकार © 2025 NepaGen RAG।',
    },
  },
  en: {
    nav: {
      home: 'Home',
      chat: 'Chat',
      about: 'About',
      start: 'Start Chat',
      language: 'Language',
      darkMode: 'Dark Mode',
    },
    hero: {
      badge: 'Nepali RAG + AI',
      title: 'Premium Nepali RAG Chatbot',
      subtitle: 'Nepali-first assistant with an English UI for convenience—contextual answers with premium visuals.',
      cta: 'Start Chatting',
      scroll: 'Scroll to explore more',
    },
    chat: {
      title: 'Ask Anything',
      subtitle: 'Retrieve precise answers from your knowledge base in Nepali or English.',
      inputPlaceholder: 'Type your question here...',
      send: 'Send',
      clear: 'Clear history',
      copy: 'Copy answer',
      copied: 'Copied to clipboard',
      suggestionsLabel: 'Quick prompts',
      contextTitle: 'Context sources',
      contextDescription: 'Sample repositories powering the RAG pipeline. Plug in your sources later.',
      uploadLabel: 'Attach file',
      voiceStart: 'Start voice',
      voiceStop: 'Stop voice',
      attached: 'attached',
      quickSuggestions: [
        'Summarize Nepal’s digital policy roadmap',
        'Prep list for Annapurna Circuit trek',
        'Explain how RAG reads custom PDFs',
        'Draft an AI policy for schools',
      ],
    },
    about: {
      title: 'Why NepaGen RAG?',
      vision: 'A Nepali-first retrieval mesh built for state records, classrooms, and tourism data.',
      why: {
        badge: 'Nepali RAG Stack',
        lead: 'Language, retrieval, and deployment are tuned so Nepali knowledge stays production-ready.',
        footnote: 'Trusted answers, clean deployment, local control.',
        features: [
          {
            icon: 'Stack',
            eyebrow: 'Language',
            title: 'Nepali-tuned NLP',
            body: 'Devanagari-aware tokenizers and embeddings handle local wordforms and transliteration noise.',
          },
          {
            icon: 'Target',
            eyebrow: 'Domain',
            title: 'Sector-tuned retrieval',
            body: 'Search trained on gazettes, textbooks, and tourism decks keeps policy and education answers precise.',
          },
          {
            icon: 'Shield',
            eyebrow: 'Grounded',
            title: 'Zero-hallucination guard',
            body: 'Responses appear only with cited evidence; fallbacks guide users if confidence drops.',
          },
          {
            icon: 'FolderDown',
            eyebrow: 'Docs',
            title: 'Bring-your-own ingestion',
            body: 'Index PDFs or DOCX in minutes to attach your private corpus.',
          },
          {
            icon: 'Lock',
            eyebrow: 'Deployment',
            title: 'Private & offline ready',
            body: 'Air-gapped ministries can run the full GPU stack on-prem with guarded boundaries.',
          },
          {
            icon: 'Layers',
            eyebrow: 'Future',
            title: 'Modular architecture',
            body: 'Adapters swap models, encoders, or vector stores without rerouting the UI.',
          },
        ],
      },
      project: {
        nav: [
          { id: 'about-why', label: 'Why NepaGen' },
          { id: 'about-project', label: 'Project detail' },
          { id: 'about-context', label: 'Source network' },
        ],
        summaryTitle: 'Project delivery snapshot',
        summaryLead:
          'NepaGen deployments package the full stack—from data center topology to ingestion connectors—for Nepali institutions.',
        modules: [
          {
            id: 'project-architecture',
            eyebrow: 'Architecture',
            title: 'Data center blueprint',
            body: 'Dual-region Kubernetes plus API gateway, embedding workers, and pgvector clusters inside a Zero-Trust mesh.',
            bullets: [
              'Automated DR with pgvector primary + replica, S3-compatible snapshots, and encrypted blob archives.',
              'Mutual TLS and short-lived workload tokens enforce ministry-level access boundaries at the edge.',
            ],
          },
          {
            id: 'project-operations',
            eyebrow: 'Operations',
            title: 'MLOps & observability',
            body: 'CI/CD ships tokenizer, embedder, retriever, and UI as versioned artifacts with rollback metadata.',
            bullets: [
              'Prometheus + OpenTelemetry dashboards track retrieval latency, citation hit-rate, and hallucination guardrails.',
              'Rollout playbooks include canary and blue/green phases so government maintenance windows stay disruption-free.',
            ],
          },
          {
            id: 'project-integration',
            eyebrow: 'Integration',
            title: 'Connector & ingestion layer',
            body: 'Bring-your-own connectors for SharePoint, S3, local NAS, Cal.com, or national API gateways.',
            bullets: [
              'Lineage tracking registers every document with checksum, source, classification, and retention policy.',
              'Education, policy, and tourism teams receive isolated namespaces to prevent tenant clashes.',
            ],
          },
        ],
      },
    },
    footer: {
      tagline: 'Nepali intelligence, world-class feel.',
      rights: 'All rights reserved © 2025 NepaGen RAG.',
    },
  },
};

const LanguageContext = createContext();

const getTranslation = (lang, path) => {
  const keys = path.split('.');
  return keys.reduce((acc, key) => (acc ? acc[key] : undefined), translations[lang]) ?? path;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'ne';
    return window.localStorage.getItem('language') ?? 'ne';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('language', language);
    document.documentElement.lang = language === 'ne' ? 'ne' : 'en';
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === 'ne' ? 'en' : 'ne')),
      t: (path) => getTranslation(language, path),
      dictionary: translations[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
