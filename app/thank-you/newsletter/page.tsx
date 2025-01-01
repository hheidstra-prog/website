import { type Metadata } from 'next'
import { SimpleLayout } from '../../components/SimpleLayout'



export const metadata: Metadata = {
  title: 'You’re subscribed',
  description: 'Thanks for subscribing to my newsletter.',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Dank voor uw inschrijving."
      intro="Ik stuur je een e-mail wanneer ik een nieuwe blogpost publiceer, 
      een nieuw project lanceer of iets interessants te delen heb waarvan 
      ik denk dat je het graag wilt weten. Je kunt je op elk moment uitschrijven, geen probleem."
    />
  )
}
