'use client'

import { useState } from 'react';
import { Button } from '../components/Button'
import { BriefcaseIcon } from '../components/icons'
import { useRouter } from "next/navigation";


export default function Appointment() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const inputclass = `w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] 
                shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4
                 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15]
                  dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/schedule-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      // Redirect to the thank you page on success
      router.push('/thank-you/contact');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="appointment-form"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Plan een afspraak</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Zin in een goed gesprek? Samen kunnen we kijken of en hoe AI in jouw bedrijf een rol kan spelen.
        </p>
        <div className="mt-6 mb-4 flex">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputclass}
            placeholder="Voornaam"
            required
          />
        </div>
        <div className="mb-4 flex">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputclass}
            placeholder="Achternaam"
            required
          />
        </div>          
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputclass}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputclass}
            placeholder="Telefoon"
            required
          />
        </div>
        <div className="mb-4">
          <label className='text-zinc-300'>
            Voorkeursdatum en tijd
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputclass}
            placeholder="Voorkeursdatum"
            required
          />
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={inputclass}
            placeholder="Voorkeurstijd"
            required
          />            
        </div>   
            
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="ml-0 flex-none"
        >
          Verstuur
        </Button>
         {/* Error message */}
          {error && (
            <div className="mt-4 text-sm text-red-600">
              {error}
            </div>
          )}
    </form>
    
  )
}
  