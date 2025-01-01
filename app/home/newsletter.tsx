'use client'

import { useState } from 'react';
import { Button } from '../components/Button'
import { MailIcon } from '../components/icons'
import { useRouter } from "next/navigation";


export default function Newsletter() {

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
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      // Redirect to the thank you page on success
      router.push('/thank-you/newsletter');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };


    return (
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <MailIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Blijf op de hoogte</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Ontvang een email wanneer ik nieuws te vertellen heb. U kunt zich altijd weer uitschrijven. 
          U geeft hiermee toestemming om u periodiek een email te sturen.
        </p>
        <div className="mt-6 flex">
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
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
            className="ml-4 flex-none"
          >
            Abonneer
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
  