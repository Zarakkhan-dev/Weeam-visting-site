import { NextResponse } from 'next/server'

import { HeaderItem } from '@/app/types/menu'
import { RecordType } from '@/app/types/record'
import { ServiceType } from '@/app/types/service'
import { AboutType } from '@/app/types/about'
import { NetworkType } from '@/app/types/network'
import { FooterLinkType } from '@/app/types/footer'

const HeaderData: HeaderItem[] = [
  { label: 'Service', href: '/#service' },
  { label: 'About', href: '/#about' },
  { label: 'Network', href: '/#network' },
  { label: 'Contact Us', href: '/#contact' },
]

const CompanyData: { imgSrc: string }[] = [
  {
    imgSrc: '/images/carousel/google.svg',
  },
  {
    imgSrc: '/images/carousel/garnier.png',
  },
  {
    imgSrc: '/images/carousel/slack.png',
  },
  {
    imgSrc: '/images/carousel/udemy.png',
  },
  {
    imgSrc: '/images/carousel/google.svg',
  },
  {
    imgSrc: '/images/carousel/garnier.png',
  },
  {
    imgSrc: '/images/carousel/slack.png',
  },
  {
    imgSrc: '/images/carousel/udemy.png',
  },
]

const RecordData: RecordType[] = [
  {
    imgSrc: '/images/buyers/ourbuyers.svg',
    percent: '50k+',
    heading: 'Active Leads',
    subheading:
      'Weeam CRM empowers over 50,000+ real estate leads across the platform.',
  },
  {
    imgSrc: '/images/buyers/projectcompleted.svg',
    percent: '10k+',
    heading: 'Listings Managed',
    subheading:
      'Thousands of real estate properties efficiently tracked and listed through Weeam.',
  },
  {
    imgSrc: '/images/buyers/happybuyers.svg',
    percent: '95%',
    heading: 'Client Satisfaction',
    subheading:
      'High customer satisfaction through streamlined workflows and automation.',
  },
  {
    imgSrc: '/images/buyers/teammembers.svg',
    percent: '60+',
    heading: 'Team Members',
    subheading:
      'Our dedicated team builds and supports real estate CRM innovation.',
  },
]


const ServiceData: ServiceType[] = [
  {
    imgSrc: '/images/provide/marketing.svg',
    country: 'Lead Management',
    paragraph:
      'Track, nurture, and convert leads with our powerful, real-time lead management tools.',
  },
  {
    imgSrc: '/images/provide/graphic.svg',
    country: 'HR & Interviews',
    paragraph:
      'Manage hiring, candidate interviews, and HR operations from one centralized dashboard.',
  },
  {
    imgSrc: '/images/provide/heaking.svg',
    country: 'Property Listings',
    paragraph:
      'Organize and promote real estate listings with smart filtering and performance insights.',
  },
  {
    imgSrc: '/images/provide/uidesign.svg',
    country: 'Reports & Invoices',
    paragraph:
      'Generate accurate reports and invoices instantly, tailored to real estate workflows.',
  },
]

const AboutData: AboutType[] = [
  {
    heading: 'Efficiency',
    subheading:
      'We automate the complex workflows of real estate to save you time and resources.',
  },
  {
    heading: 'Transparency',
    subheading:
      'From lead tracking to invoicing, our CRM ensures clarity at every stage.',
  },
  {
    heading: 'Scalability',
    subheading:
      'Weeam grows with your real estate business—whether you are a small agency or a large developer.',
  },
]

const NetworkData: NetworkType[] = [
  {
    imgSrc: '/images/network/United_Arab_Emirates.svg',
    country: 'Dubai',
    paragraph:
      'Empowering real estate developers and agencies in Dubai with end-to-end CRM solutions.',
  },
  {
    imgSrc: '/images/network/Egypt.png',
    country: 'Egypt',
    paragraph:
      'Helping property businesses in Egypt manage leads, listings, HR, and reporting with ease.',
  },
]

const FooterLinkData: FooterLinkType[] = [
  {
    links: [
      { label: 'Service', href: '/#service' },
      { label: 'About', href: '/#about' },
      { label: 'Network', href: '/#network' },
      { label: 'Contact Us', href: '/#contact' },
    ],
  },
]

export const GET = () => {
  return NextResponse.json({
    HeaderData,
    CompanyData,
    RecordData,
    ServiceData,
    AboutData,
    NetworkData,
    FooterLinkData,
  })
}
