'use client'

//import { useState } from 'react';
import { Button } from '../buttons/Button'



interface CallToActionProps {
  ctatext: string;
  emailPlaceholder: string;
  urlPlaceholder: string;
  buttonLabel: string;
  content: string;
}


export default function CallToActionAi({
  ctatext,
  emailPlaceholder,
  urlPlaceholder,
  buttonLabel,
  content,
}: CallToActionProps) {

    //const [isSubmitting, setIsSubmitting] = useState(false);
    //const [error, setError] = useState<string | null>("");

    //setIsSubmitting(false);
    //setError(null);

    const isSubmitting = false;
    const error = null;


    return (
      <form
        className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40 mx-auto max-w-[600px] p-4
          shadow-[0_0_20px_1px_rgba(6,182,212,0.3)]"
      >
        <h2 className="flex text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          <span className="ml-3">{ctatext}</span>
        </h2>
        <div className="mt-6 flex-row w-full">
          <div className='mb-4'>
            <input
              type="email"
              placeholder={emailPlaceholder}
              aria-label={emailPlaceholder}
              required
              className={`min-w-0 w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] 
                  shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15]
                dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
          <div className='mb-4'>
            <input
              type="url"
              placeholder={urlPlaceholder}
              aria-label={urlPlaceholder}
              required
              className={`min-w-0 w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] 
                  shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15]
                dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />   
          </div>       
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-none"
          >
            {buttonLabel}
          </Button>
           {/* Error message */}
            {error && (
              <div className="mt-4 text-sm text-red-600">
                {error}
              </div>
            )}
        </div>
        <div className='mt-4'>
          {content}
        </div>
      </form>
    )
  }
  