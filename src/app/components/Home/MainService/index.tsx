'use client'

import React from 'react'
import Image from 'next/image'

const properties = {
  residential: [
    {
      title: '2-Bedroom Apartment',
      price: 'AED250k',
      description:
        'Located in a quiet neighborhood, perfect for small families or couples.',
      image: '/images/service/service-1.jpg',
    },
    {
      title: '3-Bedroom House',
      price: 'AED420k',
      description:
        'Modern design with a spacious backyard, located near top schools.',
      image: '/images/service/service-2.jpg',
    },
  ],
  commercial: [
    {
      title: 'Retail Shop',
      price: 'AED800k',
      description:
        'High footfall location, ideal for a retail business or boutique store.',
      image: '/images/service/service-3.jpg',
    },
    {
      title: 'Office Space',
      price: 'AED1,200k',
      description:
        'Fully furnished office with conference rooms and underground parking.',
      image: '/images/service/service-4.jpg',
    },
  ],
}

const MainService = () => {
  return (
    <section className='w-full py-14 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Section Title */}
        <div className='text-center mb-12'>
          <h4 className='text-primary uppercase tracking-[5px] text-lg'>
            Properties & Pricing
          </h4>
          <h1 className='text-4xl font-bold mt-2'>
            Competitive Property Rates
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Residential Section */}
          <div>
            <h2 className='text-3xl font-semibold mb-8'>Residential</h2>
            {properties.residential.map((item, index) => (
              <div
                key={index}
                className='flex items-start gap-4 mb-8 flex-col sm:flex-row'
              >
                <div className='w-full sm:w-[100px] h-[100px] relative'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover rounded'
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='text-xl font-semibold'>{item.title}</h4>
                  <p className='text-gray-600 mt-1'>{item.description}</p>
                  <span className='text-blue-600 font-bold mt-2 inline-block'>
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Commercial Section */}
          <div>
            <h2 className='text-3xl font-semibold mb-8'>Commercial</h2>
            {properties.commercial.map((item, index) => (
              <div
                key={index}
                className='flex items-start gap-4 mb-8 flex-col sm:flex-row'
              >
                <div className='w-full sm:w-[100px] h-[100px] relative'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover rounded'
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='text-xl font-semibold'>{item.title}</h4>
                  <p className='text-gray-600 mt-1'>{item.description}</p>
                  <span className='text-blue-600 font-bold mt-2 inline-block'>
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainService
