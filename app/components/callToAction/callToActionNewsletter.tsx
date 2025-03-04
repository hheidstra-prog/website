'use client'

import { useState } from 'react';
import { Button } from '../buttons/Button'
import { MailIcon } from '../icons/icons'
import { useRouter } from "next/navigation";


interface newsLetterProps {
  header: string;
  placeholder: string;
  buttonlabel: string;
  headerClassname?: string;
  lang: string;
}

export default function CallToActionNewsletter({
  header,
  placeholder,
  buttonlabel,
  headerClassname = "flex text-sm font-semibold text-zinc-100",
  lang
}: newsLetterProps) {

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>("");
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ email, lang }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      // Redirect to the thank you page on success
      router.push(`/${lang}/thank-you/newsletter`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };


    return (
      <form
        onSubmit={handleSubmit}
        className="p-4">
        {header && (
          <h2 className={headerClassname}>
            <MailIcon className="h-6 w-6 flex-none" />
            <span className="ml-3 mt-0 ">{header}</span>
          </h2>
        )}

        <div className="mt-2 flex">
          <input
            type="email"
            placeholder={placeholder}
            aria-label={placeholder}
            required
            onChange={(e) => setEmail(e.target.value)}
            className={`min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] 
                shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15]
               dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="ml-4 flex-none bg-gray-700 hover:bg-gray-600"
          >
            {buttonlabel}
          </Button>
           {/* Error message */}
            {error && (
              <div className="mt-4 text-sm text-red-600">
                {error}
              </div>
            )}
        </div>
      </form>
    )
  }
  