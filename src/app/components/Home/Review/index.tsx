'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Review = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState({
    heading: false,
    paragraph: false,
    image: false,
    card: false,
  });

  useEffect(() => {
    const options = { threshold: 0.2 };

    const observeElement = (
      ref: React.RefObject<HTMLElement>,
      key: keyof typeof visible
    ) => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible((prev) => ({
          ...prev,
          [key]: entry.isIntersecting,
        }));
      }, options);
      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const hObserver = observeElement(headingRef, 'heading');
    const pObserver = observeElement(paragraphRef, 'paragraph');
    const iObserver = observeElement(imageRef, 'image');
    const cObserver = observeElement(cardRef, 'card');

    return () => {
      hObserver.disconnect();
      pObserver.disconnect();
      iObserver.disconnect();
      cObserver.disconnect();
    };
  }, []);

  return (
    <section>
      <div className="container">
        <div className="relative">
          {/* Heading and Paragraph */}
          <div>
            <h2
              ref={headingRef}
              className={`text-navyblue text-center max-w-2xl mx-auto transition-all duration-1000 ease-out transform ${
                visible.heading ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              What Our Clients Say About Weeam
            </h2>
            <p
              ref={paragraphRef}
              className={`text-lg font-normal text-darkgray text-center mt-4 transition-all duration-1000 ease-out transform ${
                visible.paragraph ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              Trusted by real estate professionals and developers, Weeam
              simplifies operations — from lead tracking to HR and invoicing —
              all in one CRM.
            </p>
          </div>

          {/* Background Images */}
          <div
            ref={imageRef}
            className={`transition-all duration-1000 ease-out transform ${
              visible.image ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <Image
              src={'/images/clientsay/avatars.png'}
              alt="avatar-image"
              width={1061}
              height={733}
              className="hidden lg:block mx-20"
            />
            <Image
              src={'/images/clientsay/bgimage.svg'}
              alt="avatar-image"
              width={1061}
              height={733}
              className="hidden lg:block z-10 absolute top-56 xl:left-20 -left-10"
            />
          </div>

          {/* Client Card */}
          <div
            ref={cardRef}
            className={`lg:absolute lg:top-[45%] xl:left-[32%] lg:left-[29%] transition-all duration-1000 ease-out transform ${
              visible.card ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Image
              src={'/images/clientsay/user.png'}
              alt="user-image"
              width={168}
              height={168}
              className="mx-auto pt-10 lg:pb-10"
            />
            <div className="lg:inline-block bg-white rounded-2xl p-5 shadow-md">
              <p className="text-base font-normal text-center text-darkgray">
                Weeam has transformed how we manage our property <br />
                listings. Client communications, share people from <br />
                interviews to invoicing, is now centralized.
              </p>
              <p className="text-2xl font-medium text-center py-2">Ameer Khan</p>
              <p className="text-sm font-normal text-center">
                Director, Silverline Real Estate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
