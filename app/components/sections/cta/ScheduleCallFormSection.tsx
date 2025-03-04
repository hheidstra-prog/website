'use client'

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { BriefcaseIcon } from '../../icons/icons';
import { Button } from '../../buttons/Button';
import { ScheduleCallFormSectionType, UseCase } from '@/app/lib/types';
import { Container } from '../../layout/Container';


interface SectionProps {
  data: ScheduleCallFormSectionType; // Now passing the entire section object
  useCase: UseCase | null | undefined;
  lang: string;
}


export default function CallToActionAppointment({ data, useCase, lang }: SectionProps) {

  const { title, calltext, button } = data;
  
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
  };
  
  const getCurrentTime = () => {
    const date = new Date();
    return date.toTimeString().slice(0, 5); // Formats as HH:MM
  };  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: useCase?.title,
    message: useCase?.description,
    date: getCurrentDate(),
    time: getCurrentTime(),
    lang: lang,
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
    setError(null); // ✅ Ensures `setError` is used
  
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/schedule-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');  // ✅ Always use `setError`
        throw new Error(errorData.message || 'Something went wrong');
      }


      router.push(`/${lang}/thank-you/contact`);
    } catch (err) {
      setError((err as Error).message);  // ✅ Using `setError` ensures TypeScript sees it being used
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <Container className="space-y-20 max-w-2xl">
    <form
      id="appointment-form"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 p-6 mt-6"
    >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">{title}</span>
        </h2>
        <div className="mb-2">
         <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputclass}
            required
          />
        </div>          
        <div>
           <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            ></textarea>
        </div>          
        <div className="mb-2 mt-6">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputclass}
            placeholder={data.name}
            required
          />
        </div>
        <div className="mb-2">
         <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputclass}
            placeholder={data.surname}
            required
          />
        </div>          
        <div className="mb-2">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputclass}
            placeholder={data.email}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputclass}
            placeholder={data.phone}
            required
          />
        </div>
      
        <div className="mb-6 mt-4">
          <label className='text-zinc-700'>
            {calltext}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputclass}
            placeholder={"Voorkeursdatum"}
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
          {button}
        </Button>
         {/* Error message */}
          {error && (
            <div className="mt-4 text-sm text-red-600">
              {error}
            </div>
          )}
    </form>
    </Container>
    
  )
}
  