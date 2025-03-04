import { PortableTextBlock, Slug } from "@sanity/types";

export interface SanityImage {
  asset: {
    url: string;
  };
  alt?: string;
}

// ---- SECTION TYPES ----
export interface TextSectionType {
  _key: string;
  _type: "textSection";
  title: string;
  content: PortableTextBlock[];
}

export interface HeroSectionType {
  _key: string;
  _type: "heroSection";
  heading: string;
  introText: PortableTextBlock[];
  callToActionTitle: string;
  emailPlaceholder: string;
  websitePlaceholder: string;
  buttonLabel: string;
  textBelowFields: string;
  logosLabel: string;
  image: {
    asset: {
      url: string;
    };
  };
}

export interface FeatureCardType {
  icon: string;
  title: string;
  content: PortableTextBlock[];
}

export interface FeatureSectionType {
  _key: string;
  _type: "featureSection";
  title: string;
  introText: PortableTextBlock[];
  backgroundColor?: string;
  cards: FeatureCardType[];
  image: SanityImage;
}

export interface LatestArticlesSectionType {
  _key: string;
  _type: "latestArticlesSection";
  title: string;
  subtitle: string;
}

export interface NewsletterSectionType {
  _key: string;
  _type: "newsletterSection";
  title: string;
  subtitle: string;
  actiontext: string;
  buttonLabel: string;
  emailPlaceholder: string;
}

export interface FAQ {
  question: string;
  answer: PortableTextBlock[];
}

export interface FAQSectionType {
  _key: string;
  _type: "faqSection";
  title: string;
  subtitle: string;
  faqs: FAQ[];
}

export interface CtaSectionType {
  _key: string;
  _type: "ctaSection";
  title: string;
  subtitle?: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface TestimonialSectionType {
  _key: string;
  _type: "testimonialSection";
  title: string;
  testimonials: {
    name: string;
    role?: string;
    image?: {
      asset: {
        url: string;
      };
    };
    quote: string;
  }[];
}

export interface ContactFormSectionType {
  _key: string;
  _type: "contactFormSection";
  title: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  message: string;
  button: string;
}

export interface AllArticlesSectionType {
  _key: string;
  _type: "allArticlesSection";
  title: string;
}

export interface AiInsight {
  header: string;
  insight: string;
}

export interface AiInsightsSectionType {
  _key: string;
  _type: "aiInsightsSection";
  title: string;
  insights: AiInsight[];
}

export interface AiFact {
  title: string;
  value: number;
  suffix: string;
}

export interface AiFactsSectionType {
  _key: string;
  _type: "aiFactsSection";
  title: string;
  subtitle: string;
  facts: AiFact[];
}

export interface AboutUsSectionType {
  _key: string;
  _type: "aboutUsSection";
  title: string;
  subtitle: string;
  content: PortableTextBlock[];
  statistics: { value: string; label: string }[];
  images: { asset: { url: string }; alt: string; _key: string }[];
}

export interface MeetTheTeamSectionType {
  _key: string;
  _type: "meetTheTeamSection";
  title: string;
  subtitle?: string;
  content: PortableTextBlock[];
  image?: {
    asset: {
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
  cta?: {
    text: string;
    link: string;
  };
}

// ai agenst section
export interface AIAgentCard {
  title: string;
  text: string;
  image?: SanityImage
}

export interface AIAgentsSectionType {
  _key: string;
  _type: "aiAgentsSection";  
  identifier: string;
  title: string;
  subtitle: string;
  cards: AIAgentCard[];
}

// ai workflow section
export interface AIWorkflowCard {
  title: string;
  text: PortableTextBlock[];
  image?: SanityImage
}

export interface AIWorkflowSectionType {
  _key: string;
  _type: "aiWorkflowSection";  
  identifier: string;
  title: string;
  subtitle: string;
  cards: AIWorkflowCard[];
}

// use cases section
export interface UseCase {
  _id: string;  
  title: string;
  description: string;
  slug: { current: string };
  image?: SanityImage
  tags: Category[];
}

export interface UseCasesSectionType {
  _key: string;
  _type: "useCasesSection";    
  title: string;
  subtitle: string;
  buttonText: string;
  categories: Category[];
  useCases: UseCase[];
}

export interface ScheduleCallFormSectionType {
  _key: string;
  _type: "scheduleCallFormSection";
  title: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  message: string;
  calltext: string;
  button: string;
}

export interface SocialShareSectionType {
  _key: string;
  _type: "socialShareSection";
  title: string;
  subtitle: string;
}

export interface TableOfContentsSectionType {
  _key: string;
  _type: "tableOfContentsSection";
  title: string;
  includedHeadings: string[]; // Array of selected heading levels (h1, h2, h3)
}


export type Section =
  | TextSectionType
  | HeroSectionType
  | FeatureSectionType
  | LatestArticlesSectionType
  | NewsletterSectionType
  | FAQSectionType
  | CtaSectionType
  | TestimonialSectionType
  | ContactFormSectionType
  | AllArticlesSectionType
  | AiInsightsSectionType
  | AiFactsSectionType
  | AboutUsSectionType
  | MeetTheTeamSectionType
  | AIAgentsSectionType
  | AIWorkflowSectionType 
  | UseCasesSectionType
  | ScheduleCallFormSectionType
  | SocialShareSectionType
  | TableOfContentsSectionType;

// ---- PAGE TYPE ----
export interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  metaTitle: string;
  metaDescription: string;
  sections: Section[]; // Now properly typed as references
}

// ---- POST TYPE ----
export interface Post {
  _id: string;
  title: string;
  subtitle: string;
  slug: Slug;
  mainImage?: SanityImage;
  body: PortableTextBlock[];
  excerpt: string;
  excerptAuto?: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: Author;
  categories?: Category[];
  _createdAt: string;
  bottomSections: Section[];
  sideSections: Section[];
}

export interface PostWithSections {
  post: Post;
  bottomSections: Section[];
  sideSections: Section[];
}


// ---- SETTINGS TYPE ----
export interface Settings {
  postSections: Section[];
  contactFormPlaceholders: ContactFormPlaceholders;
}

export interface ContactFormPlaceholders {
  name: string;
  surname: string;
  phone: string;
  email: string;
  message: string;
  button: string;
}

// ---- AUTHOR & CATEGORY ----
export interface Author {
  name: string;
  image?: SanityImage;
}

export interface Category {
  _id: string;
  _key: string;
  title: string;
  slug: Slug;
}

// ---- MENU TYPES ----
export interface MenuItem {
  label: string;
  link: string;
  subMenu?: MenuItem[];
}

export interface Menu {
  _key: string;
  _id: string;
  title: string;
  id: string;
  language: string;
  items: MenuItem[];
}
