"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RecordType } from "@/app/types/record";
import RecordSkeleton from "../../Skeleton/RecordSkeleton";

const Records = () => {
  const [record, setRecord] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRecord(data.RecordData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <section id="portfolio" className="scroll-mt-20">
      <div className="container">
        <div
          ref={sectionRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 transform transition-all duration-1000 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <RecordSkeleton key={i} />
              ))
            : record.map((items, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center items-center border border-bluegray/20 rounded-2xl p-5 shadow-md"
                >
                  <div className="flex justify-center border border-bluegray/20 p-2 w-10 rounded-lg">
                    <Image
                      src={items.imgSrc}
                      alt={items.imgSrc}
                      width={30}
                      height={30}
                    />
                  </div>
                  <p className="text-navyblue text-4xl lg:text-6xl font-semibold text-center my-5">
                    {items.percent}
                  </p>
                  <h3 className="text-black text-2xl font-semibold text-center">
                    {items.heading}
                  </h3>
                  <p className="text-bluegray text-lg font-normal text-center mt-2">
                    {items.subheading}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Records;
