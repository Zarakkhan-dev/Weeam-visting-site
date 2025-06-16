"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AboutType } from "@/app/types/about";
import AboutSkeleton from "../../Skeleton/AboutSkeleton";

const AboutUs = () => {
  const [about, SetAbout] = useState<AboutType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch.");
        const data = await res.json();
        SetAbout(data.AboutData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="about" className="scroll-mt-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* COLUMN-1 */}
          <div className="lg:-ml-64 sm:-ml-40 -ml-20">
            <Image
              src="/images/why/iPad.png"
              alt="iPad-image"
              width={4000}
              height={900}
              className="w-full"
            />
          </div>

          {/* COLUMN-2 */}
          <div>
            <h2 className="pt-4 mt-5 text-center lg:text-start">
              Why Choose Us?
            </h2>
            <p className="text-lg text-bluegray pt-4 font-normal text-center lg:text-start">
              We combine innovation, strategy, and reliability to deliver an
              all-in-one CRM solution that helps real estate businesses manage
              leads, HR, listings, developers, interviews, and invoices — faster
              and smarter.
            </p>

            <div className="mt-10">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <AboutSkeleton key={i} />
                  ))
                : about.map((items, i) => (
                    <div className="flex mt-4" key={i}>
                      <div className="rounded-full h-10 w-12 p-1.5 flex items-center justify-center bg-circlebg">
                        <Image
                          src="/images/why/check.svg"
                          alt="check-image"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="ml-5">
                        <p className="text-2xl text-black font-semibold">
                          {items.heading}
                        </p>
                        <p className="text-lg text-beach font-normal mt-2">
                          {items.subheading}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        {/* ROW */}
        <div className="section-title mt-10">
          <h4
            className="text-primary text-uppercase text-center text-3xl"
            style={{ letterSpacing: 5 }}
          >
            About Us
          </h4>
          <h1 className="text-center ">Serving Since 1950</h1>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-3 gap-10 w-full sm:grid-cols-1">
          {/* Our Story */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3">Our Story</h2>
            <h5 className="text-lg font-medium mb-3">
              Delivering trusted property solutions with integrity and
              excellence since 1950.
            </h5>
            <p className="text-gray-600">
              Founded over seven decades ago, our company has become a
              cornerstone in the real estate industry. We started with a vision
              to help people find their dream homes and ideal business spaces.
              Today, we continue that legacy by offering a wide range of
              residential and commercial properties, combining traditional
              values with modern strategies.
            </p>
            <button className="btn-secondary w-max font-semibold py-2 px-4 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700">
              Learn More
            </button>
          </div>

          {/* Center Image */}
          <div className="w-full flex justify-center">
            <Image
              src="/images/why/about.png"
              alt="About Image"
              className="object-cover"
              width={200}
              height={500}
            />
          </div>

          {/* Our Vision */}
          <div className="flex flex-col justify-center flex-wrap ">
            <h2 className="text-3xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-600 mb-4">
              We aim to redefine real estate by building lasting relationships
              and delivering property solutions that create long-term value for
              our clients. Our vision is to be the most trusted and
              customer-centric real estate company in the region.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mt-1 mr-2">
                  <i className="fa fa-check" />
                </span>
                <span>Client-first approach in every transaction</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mt-1 mr-2">
                  <i className="fa fa-check" />
                </span>
                <span>Wide portfolio of verified properties</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mt-1 mr-2">
                  <i className="fa fa-check" />
                </span>
                <span>Transparent and hassle-free process</span>
              </li>
            </ul>

            <button className="btn-secondary w-max font-semibold py-2 px-4 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
