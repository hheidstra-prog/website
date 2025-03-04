import { Footer } from './Footer'
import { Header } from './Header'


export function Layout({ children, lang }: { children: React.ReactNode; lang: string }) {
  return (
    <>
      <Header lang={lang}/>
        <main className="flex-auto">{children}</main>
      <Footer lang={lang}/>
    </>
  )
}
