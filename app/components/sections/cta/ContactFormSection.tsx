'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/buttons/Button";
import { ContactFormSectionType } from "@/app/lib/types";
import { Container } from "../../layout/Container";

interface ContactFormProps {
  data: ContactFormSectionType; // Now passing the entire section object
  lang: string;
}

export default function ContactFormSection({ data, lang }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    lang: lang,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      router.push(`/${lang}/thank-you/contact`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="space-y-20 max-w-2xl">
      {/* Form Container */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl rounded-2xl border border-zinc-200 p-6 mt-6">
          <div className="pb-2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder={data.name}
            />
          </div>

          <div className="pb-2">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder={data.surname}
            />
          </div>

          <div className="pb-2">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder={data.phone}
            />
          </div>

          <div className="pb-2">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder={data.email}
            />
          </div>

          <div className="pb-2">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder={data.message}
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full bg-[#06b6d4] text-white py-2 px-4 rounded-md hover:bg-[#06b6d4] hover:shadow-lg">
            {isSubmitting ? "Submitting..." : data.button}
          </Button>
        </form>
    </Container>
  );
}
