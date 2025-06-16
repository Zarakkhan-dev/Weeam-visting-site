"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { FooterLinkType } from "@/app/types/footer";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const [footerLink, setFooterLink] = useState<FooterLinkType[]>([]);
  const [apkUrl, setApkUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFooterLink(data.FooterLinkData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();

    const fetchApkLink = async() => {
      try {
        const res = await axios.get("https://stageapi.weeam.info/api/upload/apk")
        console.log("res", res?.data?.url)
        setApkUrl(res?.data?.url)
      } catch (error) {
        console.error("Error in fetching Url")
      }
    }
    fetchApkLink()
  }, []);

  const handlerDownloadAPK = async () => {
    const url = `https://stageapi.weeam.info/${apkUrl}`
    		try {

			if (!apkUrl) {
				toast.error('APK file not available');
				return;
			}


			// Check file existence with HEAD request
			const response = await fetch(url, { method: 'HEAD' });

			if (!response.ok) {
				toast.error('APK file not found on server');
				return;
			}

			// Trigger download
			const link:HTMLAnchorElement = document.createElement('a');
			link.href = url;
			link.download = url.split('/').pop() ?? 'download.apk';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			toast.success('Download started');
		} catch (error) {
			console.error('Error downloading APK:', error);
			toast.error('Failed to download APK');
		}
  }

  return (
    <footer className="bg-darkblue">
      <div className=" container -mt-48">
        <div className="mx-auto max-w-2xl pt-28 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-24 mb-20 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
            {/* COLUMN-1 */}

            <div className="col-span-4 md:col-span-12 lg:col-span-4">
              <div className="mb-10">
                <Image
                  src={"/images/logo/logo.png"}
                  alt="dsign-logo"
                  width={222}
                  height={64}
                />
              </div>
              <div className="flex gap-6 items-center">
                <Link
                  href="https://www.facebook.com/share/1Cc6zjHAaD/"
                  className="bg-white/20 hover:bg-primary rounded-full shadow-xl p-3"
                >
                  <Icon
                    icon="fa6-brands:facebook-f"
                    width="16"
                    height="16"
                    className="text-white"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/weeam_elnagar?igsh=MTBzNW9pOXQ4Y3RxZQ=="
                  className="bg-white/20 hover:bg-primary rounded-full shadow-xl p-3"
                >
                  <Icon
                    icon="fa6-brands:instagram"
                    width="16"
                    height="16"
                    className="text-white"
                  />
                </Link>
                <Link
                  href="https://www.tiktok.com/@weeam_elnagar?_t=ZS-8vMVlGpq40e&_r=1"
                  className="bg-white/20 hover:bg-primary rounded-full shadow-xl p-3"
                >
                  <Icon
                    icon="fa6-brands:tiktok"
                    width="16"
                    height="16"
                    className="text-white"
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/weeam-el-nagar"
                  className="bg-white/20 hover:bg-primary rounded-full shadow-xl p-3"
                >
                  <Icon
                    icon="fa6-brands:linkedin-in"
                    width="16"
                    height="16"
                    className="text-white"
                  />
                </Link>
              </div>

              <div className="my-10 flex gap-5 sm:flex-col md:flex-row">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  width={200}
                  height={40}
                  onClick={handlerDownloadAPK}
                  className=" cursor-pointer"
                />
                <a href="https://apps.apple.com/pk/app/weeam-crm/id6744808346" target="_blank">
                <Image
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Google Play"
                  width={200}
                  height={40}
                />
                </a>
              </div>
            </div>

            {/* CLOUMN-2/3 */}

            {footerLink.map((item, i) => (
              <div
                key={i}
                className="group relative col-span-2 md:col-span-4 lg:col-span-2"
              >
                <ul>
                  {item.links.map((link, i) => (
                    <li key={i} className="mb-5">
                      <Link
                        href={link.href}
                        className="text-white text-sm font-normal mb-6 hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CLOUMN-4 */}

            <div className="col-span-4 md:col-span-4 lg:col-span-4">
              <div className="flex gap-2">
                <Image
                  src={"/images/footer/mask.svg"}
                  alt="mask-icon"
                  width={24}
                  height={24}
                />
                <p className="text-base font-normal text-offwhite">
                  Office 203, API World Tower, Dubai, UAE
                </p>
              </div>
              <div className="flex gap-2 mt-10">
                <Image
                  src={"/images/footer/telephone.svg"}
                  alt="telephone-icon"
                  width={24}
                  height={24}
                />
                <Link href="tel:+971 585577271">
                  <p className="text-base font-normal text-offwhite hover:text-primary">
                    +971 585577271
                  </p>
                </Link>
              </div>
              <div className="flex gap-2 mt-10">
                <Image
                  src={"/images/footer/email.svg"}
                  alt="email-icon"
                  width={24}
                  height={24}
                />
                <Link href="mailto:info@aqarybay.com">
                  <p className="text-base font-normal text-offwhite hover:text-primary">
                    info@aqarybay.com
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* All Rights Reserved */}

          <div className="py-5 lg:flex items-center justify-between border-t border-t-bordertop">
            <h4 className="text-offwhite text-sm text-center lg:text-start font-normal">
              @2025 Weeam. All Rights Reserved by{" "}
              <Link href="" className="hover:text-primary hover:underline">
                Weeam
              </Link>
            </h4>
            {/* <div className='flex gap-5 mt-5 lg:mt-0 justify-center lg:justify-start'>
              <h4 className='text-offwhite text-sm font-normal hover:text-primary hover:underline'>
                <Link
                  href='/'
                  target='_blank'
                  className='hover:text-primary hover:underline'>
                  Privacy policy
                </Link>
              </h4>
              <div className='h-5 bg-bordertop w-0.5'></div>
              <h4 className='text-offwhite text-sm font-normal hover:text-primary hover:underline'>
                <Link href='/' target='_blank'>
                  Terms & conditions
                </Link>
              </h4>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
