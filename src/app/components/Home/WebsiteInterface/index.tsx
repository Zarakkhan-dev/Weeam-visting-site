"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const WebsiteInterface = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section>
      <div className="container">
        <div className="relative" ref={sectionRef}>
          <h1 className="my-4 text-center text-3xl font-bold">CRM Overview</h1>

          <div
            className={`pt-20 transition-transform transition-opacity duration-1000 ease-out
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
            `}
          >
            <Image
              src={"/images/banner/HeroDashboardU.png"}
              alt="CRM Overview"
              width={1200}
              height={598}
              className="w-full"
            />
          </div>

          <h1 className="my-4 text-center text-3xl font-bold">Report Overview</h1>

          <div
            className={`transition-transform transition-opacity duration-1000 ease-out
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
            `}
          >
            <Image
              src={"/images/banner/ReportsU.png"}
              alt="Report Overview"
              width={1200}
              height={598}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteInterface;
