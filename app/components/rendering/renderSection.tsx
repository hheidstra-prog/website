import { Section, UseCase } from "@/app/lib/types";
import { HeroSection } from "../sections/home/HeroSection";
import { NewsletterSection } from "../sections/cta/newsLetterSection";
import { FaqSection } from "../sections/notimplemented/Faqs";
import TextSection from "../sections/texts/textSection";
import { LatestArticlesSection } from "../sections/blog/LatestArticlesSection";
import ContactFormSection from "../sections/cta/ContactFormSection";
import { AllArticlesSection } from "../sections/blog/AllArticlesSection";
import AIInsightsSection from "../sections/home/AiInsightsSection";
import { AIFactsSection } from "../sections/home/AiFactsSection";
import AboutUsSection from "../sections/about/AboutUsSection";
import MeetTheTeamSection from "../sections/about/MeetTheTeamSection";
import AiAgentsSection from "../sections/home/AiAgentsSection";
import AiWorkflowSection from "../sections/home/AiWorkflowSection";
import UseCasesSection from "../sections/home/UseCaseSection";
import ScheduleCallFormSection from "../sections/cta/ScheduleCallFormSection";

interface RenderSectionProps {
  section: Section;
  lang: string;
  allUseCases: UseCase[];
  useCase?: UseCase | null;
}


export function RenderSection({ section, lang, allUseCases, useCase }: RenderSectionProps): JSX.Element | null {
  if (!section || !section._type) return null; // Safety check


  switch (section._type) {
    case "heroSection":
      return <HeroSection data={section} />;
    case "textSection":
      return <TextSection data={section} />;
    case "newsletterSection":
      return <NewsletterSection data={section} lang={lang} />;
    case "faqSection":
      return <FaqSection data={section} />;
    case "newsletterSection":
        return <NewsletterSection data={section} lang={lang} />;
    case "latestArticlesSection":
        return <LatestArticlesSection data={section} lang={lang}/>; 
    case "allArticlesSection":
        return <AllArticlesSection data={section} lang={lang}/>;    
    case "aiInsightsSection":
        return <AIInsightsSection data={section} /> ;    
    case "aiAgentsSection":
          return <AiAgentsSection data={section} /> ;          
    case "aiFactsSection":
        return <AIFactsSection data={section} />;    
    case "aiWorkflowSection":
          return <AiWorkflowSection data={section} />;            
    case "aboutUsSection":
        return <AboutUsSection data={section} />;        
    case "meetTheTeamSection":
        return <MeetTheTeamSection data={section} /> ;                              
    case "contactFormSection":
        return <ContactFormSection data={section} lang={lang} />;    
    case "scheduleCallFormSection":
          return <ScheduleCallFormSection data={section} useCase={useCase} lang={lang} />;              
    case "useCasesSection":
          return <UseCasesSection data={section} lang={lang} allUseCases={allUseCases} />      
                        
    default:
      return null;
  }
};
