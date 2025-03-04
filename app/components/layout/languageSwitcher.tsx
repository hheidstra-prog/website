"use client";

import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import cookie handling
import WorldFlags from "react-world-flags";
import { useState } from "react";
import { i18nConfig, cookieName } from "@/app/lib/i18nConfig";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = (pathname.split("/")[1] as typeof i18nConfig.locales[number]) || i18nConfig.defaultLocale;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const getFlagCode = (locale: string) => {
    switch (locale) {
      case "en":
        return "gb"; // Great Britain flag for English
      case "nl":
        return "nl"; // Netherlands flag
      default:
        return "unknown"; // Fallback flag
    }
  };

  const changeLanguage = (newLang: typeof i18nConfig.locales[number]) => {
    const pathSegments = pathname.split("/").filter(Boolean);

    // If the first segment is a language code, replace it
    if (i18nConfig.locales.includes(pathSegments[0] as typeof i18nConfig.locales[number])) {
      pathSegments[0] = newLang;
    } else {
      pathSegments.unshift(newLang);
    }

    // ✅ Store the selected language in a cookie
    Cookies.set(cookieName, newLang, { expires: 365 });

    // ✅ Navigate to the new language URL
    router.push(`/${pathSegments.join("/")}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-2 rounded-md border-0 dark:border-teal-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
      >
        <WorldFlags code={getFlagCode(currentLang)} className="w-6 h-6" />
        <span>{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-32 bg-white border rounded-md shadow-lg dark:border-teal-500 dark:bg-gray-800">
          <ul>
            {i18nConfig.locales.map((locale) => (
              <li key={locale}>
                <button
                  onClick={() => changeLanguage(locale)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white ${
                    currentLang === locale ? "font-bold text-black" : "dark:text-black"
                  }`}
                >
                  <div className="flex items-center space-x-2 dark:text-white">
                    <WorldFlags code={getFlagCode(locale)} className="w-5 h-5" />
                    <span>{locale.toUpperCase()}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
