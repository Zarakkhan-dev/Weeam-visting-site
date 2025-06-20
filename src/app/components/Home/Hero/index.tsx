"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); 
        }
      },
      {
        threshold: 0.1, 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section>
      <div className="container lg:pt-36 md:pt-32 pt-24">
        <div className="relative">
          <div
            ref={sectionRef}
            className={`flex flex-col gap-5 transform transition-all duration-1000 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
            `}
          >
            <h1 className="lg:mx-auto lg:max-w-[70%] text-center text-navyblue">
              Innovative Real Estate Solutions for Modern Living.
            </h1>
            <p className="lg:mx-auto lg:max-w-[70%] text-center text-bluegray text-lg md:leading-8 leading-7">
              At Weeam Real Estate, we specialize in transforming how real
              estate businesses operate—offering CRM solutions that streamline
              lead management, HR, listings, interviews, invoicing, and
              developer coordination. We empower agencies to attract buyers,
              build trust, and scale efficiently.
            </p>

            <div className="flex items-center justify-center gap-5">
              <Link href={"/#portfolio"}>
                <button
                  type="button"
                  className="font-medium text-white bg-primary hover:text-primary hover:bg-lightblue py-3 px-9 leafbutton transition duration-300 ease-in-out hover:cursor-pointer"
                >
                  See our portfolio
                </button>
              </Link>
              <Link href={"/#service"}>
                <button
                  type="button"
                  className="font-medium text-primary bg-lightblue hover:text-white hover:bg-primary py-3 px-9 leafbutton transition duration-300 ease-in-out hover:cursor-pointer"
                >
                  More info
                </button>
              </Link>
            </div>
          </div>

          {/* Background shape image */}
          <div className="hidden md:block absolute -top-28 left-20">
            <Image
              src={"/images/banner/bg-shape.svg"}
              alt="banner-image"
              width={1100}
              height={598}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
