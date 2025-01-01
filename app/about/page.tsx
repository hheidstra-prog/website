import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import portraitImage from '@/images/portrait.jpg'
import { Container } from '../components/Container'
import { LinkedInIcon } from '../components/SocialIcons'
import Resume from '../home/role'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'Ik ben Hylke Heidstra. Software ontwerper en ondernemer met een specialisatie in AI',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-[300px]">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-3">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Welkom bij Digitaalfabriek <br/> <span className='text-2xl'>Jouw Partner in AI Innovatie</span>
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Ben jij op zoek naar <strong className="dark:text-zinc-100">kunstmatige intelligentie oplossingen </strong> 
              die jouw bedrijf naar een hoger niveau tillen? Bij Digitaalfabriek specialiseren we ons in AI 
              automatisering en consultancy in Nederland. We bieden op maat gemaakte technologieën 
              die aansluiten bij jouw bedrijfsdoelen.
            </p>
            <p>
              Met onze expertise in automatisering met AI helpen we bedrijven om processen 
              te optimaliseren, kosten te besparen en waarde te creëren. Of het nu gaat om 
              het implementeren van slimme algoritmen, data-analyse of geavanceerde machine 
              learning, wij zorgen voor een oplossing die werkt.
            </p>

            <h2 className='text-2xl font-bold dark:text-zinc-300'>Onze Diensten</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><p><strong className="dark:text-zinc-100">Kunstmatige intelligentie oplossingen</strong>: Van concept tot realisatie.</p></li>
              <li><p><strong className="dark:text-zinc-100">Automatisering met AI</strong>: Efficiëntie verhogen door intelligente systemen.</p></li>
              <li><p><strong className="dark:text-zinc-100">Implementatie van AI</strong> in bedrijfsprocessen: Zorgeloos integreren van AI in jouw bedrijf.</p></li>
            </ul>
            <p>
              Wij richten ons specifiek op <strong className="dark:text-zinc-100">AI-oplossingen voor mkb-bedrijven in Nederland</strong>, 
              zodat ook kleinere organisaties kunnen profiteren van de kracht van kunstmatige 
              intelligentie. Ontdek hoe wij jouw bedrijf kunnen helpen transformeren.
            </p>
            <p>
              Als softwaredesigner combineer ik creativiteit en technische 
              kennis om innovatieve applicaties te ontwikkelen die bedrijven 
              vooruithelpen. Ik werk daarbij nauw samen met andere specialisten
              die tot de top behoren.
            </p>
            <h2 className='text-2xl font-bold dark:text-zinc-300'>Ondernemer en probleemoplosser</h2>
            <p>
              Als ondernemer begrijp ik de uitdagingen waarmee bedrijven 
              worden geconfronteerd. Mijn ervaring helpt me om niet alleen 
              technische oplossingen te leveren, maar ook strategisch advies 
              dat bedrijven écht verder brengt.
            </p>
            <h2 className='text-2xl font-bold dark:text-zinc-300'>Waarom samenwerken?</h2>
            <p>
              Mijn unieke mix van technische expertise, ondernemersmentaliteit en creatieve 
              passie stelt mij in staat om innovatieve en praktische oplossingen te leveren. 
              Ik geloof in samenwerking, duidelijke communicatie en het bouwen van 
              langdurige relaties met mijn klanten.

              Maak een afspraak om uw ideeën tot leven brengen. 
              <br/><br/><strong className="dark:text-zinc-400">Neem gerust contact met me op!</strong>
            </p>            
          </div>
        </div>
        <div className="lg:pl-20 h-[200px]">
          <ul role="list mb-4">
            {/*
            <SocialLink href="#" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink href="#" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            */}
            <SocialLink href="https://www.linkedin.com/in/hylkeheidstra/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:hheidstra@live.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              info@digitaalfabriek.nl
            </SocialLink>

            <div className=' mt-20'>
              <Resume />
            </div>

          </ul>
          
        </div>

      </div>
    </Container>
  )
}
