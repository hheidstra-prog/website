import Image, { type ImageProps } from 'next/image'
import logoPectora from '@/images/logos/Pectora.jpg'
import logoSitecore from '@/images/logos/sitecore.png'
import logoBC from '@/images/logos/bc.png'
import logoClever from '@/images/logos/cleverbyai.png'
import logoSpothunter from '@/images/logos/spothunter.jpg'
import { BriefcaseIcon } from '../components/icons'
import logoFabriek from '@/images/logos/logog-dark.png'



export default function Resume() {
    const resume: Array<Role> = [
      {
        company: 'CleverBy.AI',
        title: 'CEO, co-founder',
        logo: logoClever,
        start: '2024',
        end: {
          label: 'Present',
          dateTime: new Date().getFullYear().toString(),
        },
      },
      {
        company: 'Digitaal Fabriek',
        title: 'CEO, founder',
        logo: logoFabriek,
        start: '2024',
        end: {
          label: 'Present',
          dateTime: new Date().getFullYear().toString(),
        },
      },      
      {
        company: 'Spothunter',
        title: 'founder',
        logo: logoSpothunter,
        start: '2024',
        end: {
          label: 'Present',
          dateTime: new Date().getFullYear().toString(),
        },
      },   
      {
        company: 'BigCommerce',
        title: 'Senior Sales Manager',
        logo: logoBC,
        start: '2021',
        end: '2023',
      },      
      {
        company: 'Sitecore',
        title: 'Senior Product Manager',
        logo: logoSitecore,
        start: '2011',
        end: '2020',
      },
      {
        company: 'Pectora',
        title: 'CEO',
        logo: logoPectora,
        start: '2003',
        end: '2011',
      },
    ]
  
    return (
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">CV</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {resume.map((role, roleIndex) => (
            <Role key={roleIndex} role={role} />
          ))}
        </ol>
        {/*
        <Button href="#" variant="secondary" className="group mt-6 w-full">
          Download CV
          <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Button>
        */}
      </div>
    )
  }
  

interface Role {
    company: string
    title: string
    logo: ImageProps['src']
    start: string | { label: string; dateTime: string }
    end: string | { label: string; dateTime: string }
  }

    
function Role({ role }: { role: Role }) {
    const startLabel =
      typeof role.start === 'string' ? role.start : role.start.label
    const startDate =
      typeof role.start === 'string' ? role.start : role.start.dateTime
  
    const endLabel = typeof role.end === 'string' ? role.end : role.end.label
    const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime
  
    return (
      <li className="flex gap-4">
        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
        </div>
        <dl className="flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Company</dt>
          <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {role.company}
          </dd>
          <dt className="sr-only">Role</dt>
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
            {role.title}
          </dd>
          <dt className="sr-only">Date</dt>
          <dd
            className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
            aria-label={`${startLabel} until ${endLabel}`}
          >
            <time dateTime={startDate}>{startLabel}</time>{' '}
            <span aria-hidden="true">—</span>{' '}
            <time dateTime={endDate}>{endLabel}</time>
          </dd>
        </dl>
      </li>
    )
  }