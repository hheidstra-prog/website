import { type Metadata } from 'next'
import { SimpleLayout } from '../../components/SimpleLayout'



export const metadata: Metadata = {
  title: 'You’re subscribed',
  description: 'Thanks for subscribing to my newsletter.',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Bedankt voor je bericht."
      intro="We nemen zo snel mogelijk contact met je op!"
    />
  )
}
