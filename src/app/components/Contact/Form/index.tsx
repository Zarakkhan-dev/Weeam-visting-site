"use client";

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    Message: "",
  });
  const [loader, setLoader] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formData).every((value) => value.trim() !== "");
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const reset = () => {
    setFormData({ fullname: "", email: "", Message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setShowThanks(true);

    const { fullname, email, Message } = formData;

    try {
      const res = await axios.post("/api/email", { fullname, email, Message });
      if (res) {
        reset();
        toast.success("Email sent Successfully");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setShowThanks(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="scroll-mt-24 pt-0">
      <div className="container">
        <h2 className="mb-9 text-navyblue text-center">Contact Us</h2>
        <div
          ref={containerRef}
          className={`relative border border-navyblue/10 px-6 py-2 rounded-2xl transition-all duration-1000 ease-out transform ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap w-full m-auto justify-between"
          >
            <div className="sm:flex gap-6 w-full">
              <div className="mx-0 my-2.5 flex-1">
                <label htmlFor="fname" className="pb-3 inline-block text-base">
                  Full Name
                </label>
                <input
                  id="fname"
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full text-base px-4 rounded-2xl py-2.5 border border-black/20 transition-all duration-500 focus:border-primary focus:outline-0"
                />
              </div>
              <div className="mx-0 my-2.5 flex-1">
                <label htmlFor="email" className="pb-3 inline-block text-base">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="w-full text-base px-4 rounded-2xl py-2.5 border border-black/20 transition-all duration-500 focus:border-primary focus:outline-0"
                />
              </div>
            </div>

            <div className="w-full mx-0 my-2.5 flex-1">
              <label htmlFor="message" className="text-base inline-block">
                Message
              </label>
              <textarea
                id="message"
                name="Message"
                value={formData.Message}
                onChange={handleChange}
                className="w-full mt-2 rounded-2xl px-5 py-3 border border-black/20 transition-all duration-500 focus:border-primary focus:outline-0"
                placeholder="Anything else you wanna communicate"
              ></textarea>
            </div>

            <div className="mx-0 my-2.5 w-full">
              <button
                type="submit"
                disabled={!isFormValid || loader}
                className={`border leading-none px-6 text-lg font-medium py-4 rounded-full ${
                  !isFormValid || loader
                    ? "bg-primary/15 text-beach cursor-not-allowed"
                    : "bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer"
                }`}
              >
                Submit
              </button>
            </div>
          </form>

          {showThanks && (
            <div className="text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-3 absolute flex items-center gap-2">
              Form submitted. We’ll be in touch soon.
              <div className="w-3 h-3 rounded-full animate-spin border-2 border-white border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
