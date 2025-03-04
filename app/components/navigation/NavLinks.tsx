import Link from 'next/link';
import { MenuItem } from '@/app/lib/types';


interface NavLinksProps {
  menu: { items: MenuItem[] };
}

export default async function NavLinks({ menu }: NavLinksProps) {

  // Fetch menu data from Sanity
  if (!menu || !menu.items) return <div>No menu available</div>;

  return (
    <nav>
      <ul className="flex space-x-4">
        {menu.items.map((item: MenuItem) => (
          <li key={item.label} className="relative group">
            <Link href={item.link} className="text-gray-700 hover:text-gray-900">
              {item.label}
            </Link>

            {/* Dropdown menu if subMenu exists */}
            {item.subMenu && (
              <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
                {item.subMenu.map((subItem) => (
                  <li key={subItem.label} className="border-b last:border-none">
                    <Link
                      href={subItem.link}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
