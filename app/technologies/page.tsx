import { Card } from "../components/Card"
import { SimpleLayout } from "../components/SimpleLayout"
import { fetchTechnologiesQuery } from "../lib/queries";
import { sanityClient } from "../lib/sanityClient";
import { Technology } from "../lib/types";
import Image from 'next/image'
import { type Metadata } from 'next'



export const metadata: Metadata = {
  title: 'Tools',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default async function Uses() {


    const tools: Technology[] = await sanityClient.fetch(fetchTechnologiesQuery);

    return (
        <SimpleLayout
        title="Tools die ik gebruik"
        intro="Ik krijg vaak de vraag hoe ik software bouw en welke tools ik gebruik.
        Hier dan een overzicht van een aantal die ik vaker gebruik."
        >
        <ul
                role="list"
                className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
                >
        
                {tools.map((tool) => (
        
                    <Card as="li" key={tool._id} className='min-w-[300px] max-w-[300px] flex-shrink-0 p-4 mt-2 bg-slate-100 dark:bg-black hover:shadow hover:shadow-[#14b8a6]
                    hover:bg-slate-100 dark:hover:bg-gray-900 rounded-2xl'>

                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white  shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border
                        dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 mt-6 ">
                            {tool.logo?.asset?.url && (
                                <Image
                                    src={tool.logo?.asset.url}
                                    alt={tool.logo.alt || "project logo"}
                                    className='relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0'
                                    unoptimized
                                    width={200}
                                    height={200}
                                />
                            )}
                        </div>
                        <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                            <Card.Link href={`/technologies/${tool.slug.current}`}>{tool.title}</Card.Link>
                        </h2>
                        <Card.Description>{tool.description}</Card.Description>
                        <Card.Cta>Read more</Card.Cta>
        
                    </Card>
                ))}
                </ul>
        </SimpleLayout>
    )
}
