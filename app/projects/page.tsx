import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '../components/Card'
import { SimpleLayout } from '../components/SimpleLayout'
import { sanityClient } from '../lib/sanityClient'
import { fetchProjectsQuery } from '../lib/queries'
import { Project } from '../lib/types'


export const metadata: Metadata = {
  title: 'Projecten | Innovatieve AI-oplossingen en Automatisering in Actie',
  description: 'Bekijk een overzicht van projecten waarin ik bedrijven heb geholpen met AI-toepassingen, automatisering en maatwerksoftware. Ontdek hoe technologie jouw bedrijf kan transformeren.',
}


export default async function ProjectsPage() {

  const projects: Project[] = await sanityClient.fetch(fetchProjectsQuery);

  return (
    <SimpleLayout
      title="Dingen die ik heb gemaakt."
      intro="Ik heb aan vele software projecten gewerkt. Dit zijn een aantal meer recente."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >

        {projects.map((project) => (

          <Card as="li" key={project.description} className='min-w-[300px] max-w-[300px] flex-shrink-0 p-4 mt-2 bg-slate-100 dark:bg-black hover:shadow hover:shadow-[#14b8a6]
             hover:bg-slate-100 dark:hover:bg-gray-900 rounded-2xl'>
            <Card.Title href={`/projects/${project.slug.current}`}>
                {project.title}
            </Card.Title>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white  shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border
             dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 mt-6 ">
            {project.logo?.asset?.url && (
              <Image
                  src={project.logo?.asset.url}
                  alt={project.logo.alt || "project logo"}
                  className='relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0'
                  unoptimized
                  width={200}
                  height={200}
                />
            )}
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={`/projects/${project.slug.current}`}>{project.title}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <Card.Cta>Read more</Card.Cta>

          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
