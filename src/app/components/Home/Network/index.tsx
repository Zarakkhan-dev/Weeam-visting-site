'use client';

import { NetworkType } from "@/app/types/network";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NetworkSkeleton from "../../Skeleton/NetworkSkeleton";

const Network = () => {
  const [network, setNetwork] = useState<NetworkType[]>([]);
  const [loading, setLoading] = useState(true);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState({
    title: false,
    image: false,
    grid: false,
  });

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };

    const createObserver = (
      ref: React.RefObject<HTMLElement>,
      key: keyof typeof visible
    ) => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible((prev) => ({
          ...prev,
          [key]: entry.isIntersecting,
        }));
      }, observerOptions);

      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const titleObserver = createObserver(titleRef, "title");
    const imageObserver = createObserver(imageRef, "image");
    const gridObserver = createObserver(gridRef, "grid");

    return () => {
      titleObserver.disconnect();
      imageObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setNetwork(data.NetworkData);
      } catch (error) {
        console.error("Error fetching service", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="network" className="bg-babyblue scroll-mt-20">
      <div className="container">
        {/* Title */}
        <h2
          ref={titleRef}
          className={`text-center mb-10 max-w-2xl mx-auto lg:leading-20 transition-all duration-1000 ease-out transform ${
            visible.title ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          Connecting Globally, Delivering Locally
        </h2>

        {/* Map Image */}
        <div
          ref={imageRef}
          className={`transition-all duration-1000 ease-out transform ${
            visible.image ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            src={"/images/network/map.webp"}
            alt={"map-image"}
            width={1400}
            height={800}
            className="mx-auto"
          />
        </div>

        {/* Grid with fade-up animation */}
        <div
          ref={gridRef}
          className={`transition-all duration-1000 ease-out transform ${
            visible.grid ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-20`}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <NetworkSkeleton key={i} />
              ))
            : network.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="flex justify-start items-center gap-2 border-b border-black/10">
                    <Image
                      src={item.imgSrc}
                      alt={item.country}
                      width={55}
                      height={55}
                      className="mb-2"
                    />
                    <h4 className="text-xl font-medium text-midnightblue">
                      {item.country}
                    </h4>
                  </div>
                  <h4 className="text-lg font-normal text-bluegrey my-2">
                    {item.paragraph}
                  </h4>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Network
