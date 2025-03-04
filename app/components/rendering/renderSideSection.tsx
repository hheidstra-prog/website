import { Section } from "@/app/lib/types";
import SocialShareSection from "../sidesections/SocialShareSection";
import { NewsletterSection } from "../sidesections/newsLetterSection";
import TableOfContents from "../sidesections/tableOfContentsSection";

export interface Heading {
  text: string;
  id: string;
  level: number;
}

interface RenderSectionProps {
  section: Section;
  lang: string;
  url?: string;
  headings?: Heading[];
}

export function RenderSideSection({ section, lang, url = "", headings = [] }: RenderSectionProps): JSX.Element | null {

    if (!section || !section._type) return null; // Safety check

  switch (section._type) {
    case "socialShareSection":
      return <SocialShareSection data={section} url={url} />         
    case "newsletterSection":
      return <NewsletterSection data={section} lang={lang}/>;     
    case "tableOfContentsSection":
        return <TableOfContents headings={headings} data={section} />;                              
    default:
      return null;
  }
};
