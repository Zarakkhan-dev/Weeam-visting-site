import { Metadata } from 'next'
import Hero from './components/Home/Hero'
import Company from './components/Home/Company'
import Records from './components/Home/Records'
import Service from './components/Home/Service'
import AboutUs from './components/Home/AboutUs'
import Network from './components/Home/Network'
import Review from './components/Home/Review'
import ContactForm from './components/Contact/Form'
import Newsletter from './components/Home/Newsletter/Newsletter'
import MainService from './components/Home/MainService'
import WebsiteInterface from './components/Home/WebsiteInterface'

export const metadata: Metadata = {
  title: 'weeam.',
}

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Company /> */}
      <Records />
      <Service />
      <MainService/>
      <WebsiteInterface/>
      <AboutUs />
      <Network />
      <Review />
      <ContactForm />
      <Newsletter />
    </main>
  )
}
