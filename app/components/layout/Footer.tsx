import Image from 'next/image'
import { Button } from '../buttons/Button'
import { Container } from './Container'
import { TextField } from '../fields/Fields'
import NavLinks from '../navigation/NavLinks'
import { sanityClient } from '@/app/lib/sanityClient'
import { fetchMenuQuery } from '@/app/lib/queries'
import logofile from '@/images/logos/logo-lm-text-hor.png'



export async function Footer({ lang }: { lang: string }) {

  // ✅ Fetch menu once on the server
  let menu = await sanityClient.fetch(fetchMenuQuery, { menuId: "bottom", language: lang });

  // ✅ Fall back to English if the menu is missing
  if (!menu) {
    menu = await sanityClient.fetch(fetchMenuQuery, { menuId: "bottom", language: "en" });
  }


  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pt-16 pb-6 lg:flex-row lg:items-center lg:py-6">
          <div>
            <div className="flex items-center text-gray-900 mt-6">
            <Image 
                src={logofile}
                alt="Launch Minds Logo"
                width={300}
                height={100} 
              />
            </div>

          </div>
          <div className="group relative flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <nav className="mt-0 flex gap-8">
              <NavLinks menu={menu}/>
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pt-8 pb-12 md:flex-row-reverse md:justify-between md:pt-6">
          
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
