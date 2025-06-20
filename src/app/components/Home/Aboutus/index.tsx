"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AboutType } from "@/app/types/about";
import AboutSkeleton from "../../Skeleton/AboutSkeleton";

const AboutUs = () => {
  const [about, setAbout] = useState<AboutType[]>([]);
  const [loading, setLoading] = useState(true);

  // Refs
  const topLeftRef = useRef<HTMLDivElement | null>(null);
  const topRightRef = useRef<HTMLDivElement | null>(null);
  const bottomLeftRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const bottomRightRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState({
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    center: false,
    bottomRight: false,
  });

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };

    const createObserver = (
      ref: React.RefObject<HTMLDivElement | null>,
      key: keyof typeof visible
    ) => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible((prev) => ({
          ...prev,
          [key]: entry.isIntersecting,
        }));
      }, observerOptions);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    };

    const observers = [
      createObserver(topLeftRef, "topLeft"),
      createObserver(topRightRef, "topRight"),
      createObserver(bottomLeftRef, "bottomLeft"),
      createObserver(centerRef, "center"),
      createObserver(bottomRightRef, "bottomRight"),
    ];

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch.");
        const data = await res.json();
        setAbout(data.AboutData);
      } catch (error) {
        console.error("Error fetching about data:", error);
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
          {/* COLUMN-1 (Image) */}
          <div
            ref={topLeftRef}
            className={`lg:-ml-64 sm:-ml-40 -ml-20 transition-all duration-1000 ease-out transform ${
              visible.topLeft ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <Image
              src="/images/why/iPad.png"
              alt="iPad-image"
              width={4000}
              height={900}
              className="w-full"
            />
          </div>

          {/* COLUMN-2 (Text) */}
          <div
            ref={topRightRef}
            className={`transition-all duration-1000 ease-out transform ${
              visible.topRight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="pt-4 mt-5 text-center lg:text-start">Why Choose Us?</h2>
            <p className="text-lg text-bluegray pt-4 font-normal text-center lg:text-start">
              We combine innovation, strategy, and reliability to deliver an
              all-in-one CRM solution that helps real estate businesses manage
              leads, HR, listings, developers, interviews, and invoices — faster
              and smarter.
            </p>

            <div className="mt-10">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => <AboutSkeleton key={i} />)
                : about.map((item, i) => (
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
                        <p className="text-2xl text-black font-semibold">{item.heading}</p>
                        <p className="text-lg text-beach font-normal mt-2">{item.subheading}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="section-title mt-10">
          <h4
            className="text-primary text-uppercase text-center text-3xl"
            style={{ letterSpacing: 5 }}
          >
            About Us
          </h4>
          <h1 className="text-center">Serving Since 1950</h1>
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-3 gap-10 w-full sm:grid-cols-1">
          {/* Left Text */}
          <div
            ref={bottomLeftRef}
            className={`flex flex-col justify-center transition-all duration-1000 ease-out transform ${
              visible.bottomLeft ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
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
          <div
            ref={centerRef}
            className={`w-full flex justify-center transition-all duration-1000 ease-out transform ${
              visible.center ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Image
              src="/images/why/about.png"
              alt="About Image"
              className="object-cover"
              width={200}
              height={500}
            />
          </div>

          {/* Right Text */}
          <div
            ref={bottomRightRef}
            className={`flex flex-col justify-center transition-all duration-1000 ease-out transform ${
              visible.bottomRight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-3xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-600 mb-4">
              We aim to redefine real estate by building lasting relationships...
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
