"use client";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    Message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(isValid);
  }, [formData]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const reset = () => {
    formData.fullname = "";
    formData.email = "";
    formData.Message = "";
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    const { fullname, email, Message } = formData;
    setShowThanks(true);
    try {
      const res = await axios.post("/api/email", { fullname, email, Message });

      const data = await res?.data;
      if (res) {
        setFormData({ fullname: "", email: "", Message: "" });
        reset()
        toast.success("Email sent Successfully");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setShowThanks(false)
      setLoader(false)
    }
  };
  return (
    <section id="contact" className="scroll-mt-24 pt-0">
      <div className="container">
        <h2 className="mb-9 text-navyblue text-center">Contact Us</h2>
        <div className="relative border border-navyblue/10 px-6 py-2 rounded-2xl">
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
                  className="w-full text-base px-4 rounded-2xl py-2.5 border-solid border border-black/20 transition-all duration-500 focus:border-primary focus:outline-0"
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
                  className="w-full text-base px-4 rounded-2xl py-2.5 border-solid border border-black/20 transition-all duration-500 focus:border-primary focus:outline-0"
                />
              </div>
            </div>
            <div className="sm:flex gap-3 w-full"></div>
            <div className="w-full mx-0 my-2.5 flex-1">
              <label htmlFor="message" className="text-base inline-block">
                Message
              </label>
              <textarea
                id="message"
                name="Message"
                value={formData.Message}
                onChange={handleChange}
                className="w-full mt-2 rounded-2xl px-5 py-3 border-solid border border-black/20 transition-all duration-500 focus:border-primary focus:outline-0"
                placeholder="Anything else you wanna communicate"
              ></textarea>
            </div>
            <div className="mx-0 my-2.5 w-full">
              <button
                type="submit"
                disabled={!isFormValid || loader}
                className={`border leading-none px-6 text-lg font-medium py-4 rounded-full 
                    ${
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
              <div className="w-3 h-3 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
