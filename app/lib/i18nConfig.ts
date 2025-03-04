export const i18nConfig = {
  defaultLocale: "en",
  locales: ["en", "nl"] as const, // Use `as const` to make this a tuple
};

export const cookieName = "i18nlang";