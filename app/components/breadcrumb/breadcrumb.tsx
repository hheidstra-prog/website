import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  lang: string;
}

export default function Breadcrumbs({ breadcrumbs, lang }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex text-lg md:text-xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? 'page' : undefined}
            className={clsx(
              'flex items-center',
              breadcrumb.active ? 'text-gray-900 font-semibold' : 'text-gray-500'
            )}
          >
            {!breadcrumb.active ? (
              <Link href={`/${lang}${breadcrumb.href}`} className="hover:underline">
                {breadcrumb.label}
              </Link>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="mx-3 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
