"use client";

import { ServiceType } from "@/app/types/service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ServiceSkeleton from "../../Skeleton/ServiceSkeleton";

const Service = () => {
  const [service, setService] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setService(data.ServiceData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
const services = [
  {
    icon: 'fa-home',
    title: 'Wide Range of Properties',
    description:
      'We offer a wide selection of residential and commercial properties tailored to your needs, locations, and budget.',
    image: '/images/provide/wide_range_property.png',
  },
  {
    icon: 'fa-handshake',
    title: 'Trusted Dealings',
    description:
      'We ensure all transactions are safe and transparent. Your satisfaction and trust are our top priorities.',
    image: '/images/provide/Trust_partener.png',
  },
  {
    icon: 'fa-tags',
    title: 'Affordable Pricing',
    description:
      'Whether you’re buying or selling, we help you get the best value in the current market.',
    image: '/images/provide/Affordable_price.png',
  },
  {
    icon: 'fa-calendar-alt',
    title: 'Easy Viewing Schedule',
    description:
      'Book property visits at your convenience. We make the process smooth and efficient for busy buyers.',
    image: '/images/provide/Easy_view_schedule.png',
  },
]
  return (
    <section id="service" className="scroll-mt-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* COLUMN-1 */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="flex flex-col align-middle justify-center md:p-10">
              <h2 className="pt-4 mt-5 text-center lg:text-start">
                Built to Empower Real Estate Teams
              </h2>
              <p className="text-lg pt-4 font-normal leading-6 lg:leading-7 text-center lg:text-start text-bluegray">
                At Weeam, we provide an all-in-one CRM platform designed for
                real estate businesses. From lead and listing management to HR,
                interviews, reporting, and invoicing — our tools streamline
                operations and help your team work smarter, not harder.
              </p>

              <Link
                href={"/"}
                className="mt-4 text-xl font-medium text-primary flex gap-2 mx-auto lg:mx-0 hover:underline"
              >
                Learn more{" "}
                <Image
                  src={"/images/provide/arrow.svg"}
                  alt={"arrow"}
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>

          {/* COLUMN-2 */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-x-36 px-10 py-12 bg-bluebg rounded-2xl">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ServiceSkeleton key={i} />
                  ))
                : service.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl lg:-ml-32 p-6 shadow-md"
                    >
                      <Image
                        src={item.imgSrc}
                        alt={item.imgSrc}
                        width={64}
                        height={64}
                        className="mb-5"
                      />
                      <p className="text-2xl font-semibold">{item.country}</p>
                      <p className="text-lg font-normal text-bluegray my-2">
                        {item.paragraph}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </div>

           <section className='w-full py-10 bg-white ' >
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h4 className='uppercase tracking-[5px] text-lg text text-primary'>
            Our Services
          </h4>
          <h1 className='text-4xl font-bold mt-2'>
            Trusted & Professional Property Sales
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          {services.map((service, index) => (
            <div
              className='flex flex-col sm:flex-row items-center gap-6'
              key={index}
            >
              {/* IMAGE */}
              <div className='w-full sm:w-1/3'>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={200}
                  className='rounded shadow-md w-full h-auto'
                />
              </div>

              {/* CONTENT */}
              <div className='w-full sm:w-2/3'>
                <h4 className='text-xl font-semibold flex items-center gap-2'>
                  <i className={`fa ${service.icon} text-blue-600 text-xl`} />
                  {service.title}
                </h4>
                <p className='text-gray-600 mt-2'>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      </div>
    </section>
  );
};

export default Service;
