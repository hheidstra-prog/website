import Link from 'next/link'
import { Container } from '../layout/Container'
import LanguageSwitcher from '../layout/languageSwitcher'
import NavLinks from '../navigation/NavLinks'
import { sanityClient } from '@/app/lib/sanityClient'
import { fetchMenuQuery } from '@/app/lib/queries'
import MobileMenu from '../navigation/Mobile'
import logofile from '@/images/logos/lm-logo-2.png'
import Image from 'next/image'


export async function Header({ lang }: { lang: string }) {

  // ✅ Fetch menu once on the server
  let menu = await sanityClient.fetch(fetchMenuQuery, { menuId: "main", language: lang });

  // ✅ Fall back to English if the menu is missing
  if (!menu) {
    menu = await sanityClient.fetch(fetchMenuQuery, { menuId: "main", language: "en" });
  }

  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-2">
          
          <div className="relative z-100 flex items-center gap-16">

            <Link href={`/${lang}`} aria-label="Home" className='-ml-2'>
              <Image 
                src={logofile}
                alt="Launch Minds Logo"
                width={140}
                height={20} 
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks menu={menu}/>
            </div>

          </div>

          <div className='flex flex-row'>

            <div className="flex items-center gap-6">
              <LanguageSwitcher />
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden items-center flex">
              {menu && <MobileMenu menu={menu} />}
            </div>

          </div>

        </Container>
      </nav>
    </header>
  );
}