"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import { Icon } from "@iconify/react";
import { HeaderItem } from "@/app/types/menu";

const Header: React.FC = () => {
  const [headerLink, setHeaderLink] = useState<HeaderItem[]>([]);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // const navbarRef = useRef<HTMLDivElement>(null)
  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setHeaderLink(data.HeaderData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  const handleScroll = () => {
    setSticky(window.scrollY >= 20);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky ? "shadow-lg bg-white py-2" : "shadow-none py-4"
      }`}
    >
      <div>
        <div className="container flex items-center justify-between">
          <div>
            <Logo />
          </div>
          <nav className="hidden lg:flex grow items-center gap-4 xl:gap-6  justify-center">
            {headerLink.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex items-center justify-between gap-2 p-4">
            <div>
              <Logo />
            </div>
            {/*  */}
            <button
              onClick={() => setNavbarOpen(false)}
              className="hover:cursor-pointer"
              aria-label="Close menu Modal"
            >
              <Icon
                icon="material-symbols:close-rounded"
                width={24}
                height={24}
                className="text-black hover:text-primary text-24 inline-block me-2"
              />
            </button>
          </div>
          <nav className="flex flex-col items-start p-4">
            {headerLink.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            {/* <div className='mt-4 flex flex-col space-y-4 w-full'>
              <button
                className='bg-primary text-white px-4 py-2 rounded-lg border  border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
                onClick={() => {
                  setIsSignInOpen(true)
                  setNavbarOpen(false)
                }}>
                Sign In
              </button>
              <button
                className='bg-primary text-white px-4 py-2 rounded-lg border  border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
                onClick={() => {
                  setIsSignUpOpen(true)
                  setNavbarOpen(false)
                }}>
                Sign Up
              </button>
            </div> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
