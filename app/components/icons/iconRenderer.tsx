import { icons } from "lucide-react";

interface IconRendererProps {
  name: keyof typeof icons; // Ensures type safety for valid Lucide icons
  className?: string;
}

export function IconRenderer({ name, className }: IconRendererProps) {
  const LucideIcon = icons[name]; // Retrieve the icon dynamically

  if (!LucideIcon) {
    console.warn(`⚠️ Warning: Icon "${name}" not found in Lucide!`);
    return null;
  }

  return <LucideIcon className={className} />;
}
