import { LinkedInIcon } from "../components/SocialIcons";
import SocialLink from "./sociallink";


export default function Intro() {


    return (
      
       <div className="max-w-2xl">

          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Ben jij op zoek naar <strong className="dark:text-zinc-100">kunstmatige intelligentie oplossingen </strong> 
              die jouw bedrijf naar een hoger niveau tillen? Bij Digitaalfabriek specialiseren we ons in AI 
              automatisering en consultancy in Nederland. We bieden op maat gemaakte technologieën 
              die aansluiten bij jouw bedrijfsdoelen.
            </p>
            <p>
              Met onze expertise in <strong className="dark:text-zinc-100">automatisering met AI</strong> helpen 
              we bedrijven om processen te optimaliseren, kosten te besparen en waarde te creëren. Of het nu gaat om 
              het implementeren van slimme algoritmen, data-analyse of geavanceerde machine 
              learning, wij zorgen voor een oplossing die werkt.
            </p>
            <h2 className='text-2xl font-bold dark:text-zinc-300'>Onze Diensten</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><p><strong className="dark:text-zinc-100">Web applicaties, mobile applicaties</strong>: Van concept tot realisatie.</p></li>
              <li><p><strong className="dark:text-zinc-100">Kunstmatige intelligentie oplossingen</strong>: Van visie tot implementatie.</p></li>
              <li><p><strong className="dark:text-zinc-100">Automatisering met AI</strong>: Efficiëntie verhogen door intelligente systemen.</p></li>
              <li><p><strong className="dark:text-zinc-100">Implementatie van AI</strong> in bedrijfsprocessen: Zorgeloos integreren van AI in jouw bedrijf.</p></li>
            </ul>
            <p>
              Wij richten ons specifiek op <strong className="dark:text-zinc-100">AI-oplossingen voor mkb-bedrijven in Nederland</strong>, 
              zodat ook kleinere organisaties kunnen profiteren van de kracht van kunstmatige 
              intelligentie. Ontdek hoe wij jouw bedrijf kunnen helpen transformeren.
            </p>
          </div>
          <div className="mt-6 flex gap-6">
            {/* 
            <SocialLink href="#" aria-label="Follow on X" icon={XIcon} />
            <SocialLink
              href="#"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="#"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            */}
            <SocialLink
              href="https://www.linkedin.com/company/digitaal-fabriek"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
              target="_blank"
            />
          </div>
        </div>
    )

}