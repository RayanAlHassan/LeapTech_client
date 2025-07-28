"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import insta from "@/public/images/instagram.png";
import linkedin from "@/public/images/linkedin.png";
import fb from "@/public/images/facebook.png";
import tiktok from "@/public/images/tiktok.png";
import wp from "@/public/images/whatsapp (1).png";
import office from "@/public/images/location.png";
import PrimaryButton from "@/components/ui/PrimaryButton";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+965", 

    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [, setIsTyping] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsTyping(true);
  };
  

  const handleBlur = () => setIsTyping(false);
  const handleFocus = () => setIsTyping(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/`,
        formData
      );

      if (res.status === 201) {
        toast.success("Your message has been sent!", {
          position: "bottom-center",
          theme: "colored",
        });
        setStatus("Your message has been sent!");
        setFormData({
          name: "",
          email: "",
          countryCode: "+965",  // default GCC code
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-center",
          theme: "colored",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.", {
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  return (
    <>
      <section className="contact_us py-5">
        <div className="container">
          <div className="contact_inner row mx-auto">
            {/* Contact Form */}
            <div className="col-lg-7 col-md-12 contact_form_inner px-4">
              <h2 className="contact-title mb-4 text-center">
                Contact Us
                <div className={`underline-gradient mx-auto mt-1`}></div>
              </h2>{" "}
              <p>
                Feel Free to contact us any time. We will get back to you as
                soon as we can!
              </p>
              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  className="form-control form-group"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />

                <input
                  type="email"
                  className="form-control form-group"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />

<div className="form-group d-flex gap-2 align-items-center">
  <select
    name="countryCode"
    className="form-control country-code-select"
    value={formData.countryCode}
    onChange={handleChange}
    required
  >
    <option value="+965">🇰🇼 +965</option>
    <option value="+966">🇸🇦 +966</option>
    <option value="+971">🇦🇪 +971</option>
    <option value="+973">🇧🇭 +973</option>
    <option value="+968">🇴🇲 +968</option>
    <option value="+974">🇶🇦 +974</option>
  </select>

  <input
    type="text"
    name="phone"
    className="form-control"
    placeholder="Phone Number"
    value={formData.phone}
    onChange={handleChange}
    onFocus={handleFocus}
    onBlur={handleBlur}
    required
  />
</div>


                <input
                  type="text"
                  className="form-control form-group"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />

                <textarea
                  className="form-control form-group"
                  name="message"
                  placeholder="Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button className="contact_form_submit " type="submit">
                  Send
                </button>
                {/* <PrimaryButton
                  className="contact_form_submit mt-4"
                  type="submit"
                >
                  Send
                </PrimaryButton> */}
                {status && (
                  <p className="mt-3 text-success fw-semibold">{status}</p>
                )}
              </form>
            </div>

            {/* Contact Info Side with Gradient Column */}
            <div className="col-lg-5 col-md-12 contact_info_wrapper px-0 position-relative">
              {/* Gradient column behind black box */}
              <div className="gradient_column d-none d-lg-block"></div>

              {/* Black contact info box */}
              <div className="contact_info_sec position-relative">
                <h4 className="mb-4">Contact Info</h4>

                <div className="map_container mb-4">
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27824.723435077165!2d48.050615590253756!3d29.338345468318447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9d12012035db%3A0xe2e2beccf86b9570!2sOmniya%20Shopping%20Center!5e0!3m2!1sen!2slb!4v1753365228687!5m2!1sen!2slb"
                    width="100%"
                    height="220"
                    style={{ border: 0, borderRadius: "15px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="info_single d-flex align-items-center mb-3">
                  <a
                    href="tel:+96592220798"
                    className="footer-link"
                    target="_blank"
                  >
                    <Image
                      src={wp}
                      alt="Logo Large"
                      width={23}
                      height={23}
                      priority
                      // className="d-none d-lg-inline" // Show only on large screens and up
                    />
                    &nbsp; +965 9222 0798
                  </a>
                  &nbsp;
                </div>

                <div className="info_single d-flex align-items-center mb-3">
                  <p className="mb-2">
                    &nbsp;
                    <Image
                      src={office}
                      alt="Logo Large"
                      width={23}
                      height={23}
                      priority
                      // className="d-none d-lg-inline" // Show only on large screens and up
                    />
                    &nbsp; Omniya Centre - G Floor - Office 8
                  </p>
                </div>
              </div>

              {/* Social icons inside the gradient column, pinned at bottom on desktop */}
              <div className="social_icons_container d-none d-lg-flex flex-column justify-content-end">
                <div className="social_icons d-flex justify-content-center gap-3">
                  <div className="mt-4 d-flex gap-3">
                    <a
                      href="https://www.tiktok.com/@leaptechkw?_t=ZS-8yCvz1g4UIU&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon"
                    >
                      &nbsp;
                      <Image
                        src={tiktok}
                        alt="Logo Large"
                        width={23}
                        height={23}
                        priority
                      />
                      &nbsp;
                    </a>
                    <a
                      href="https://www.instagram.com/leaptechkw?igsh=enp4anBubjJ4YWVv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon"
                    >
                      &nbsp;
                      <Image
                        src={insta}
                        alt="Logo Large"
                        width={23}
                        height={23}
                        priority
                      />
                      &nbsp;
                    </a>
                    <a
                      href="https://www.linkedin.com/company/leap-tech-kw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon"
                    >
                      &nbsp;
                      <Image
                        src={linkedin}
                        alt="Logo Large"
                        width={23}
                        height={23}
                        priority
                      />
                      &nbsp;
                    </a>
                    <a
                      href="https://www.facebook.com/share/1TbEaveqqE/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon"
                    >
                      &nbsp;
                      <Image
                        src={fb}
                        alt="Logo Large"
                        width={23}
                        height={23}
                        priority
                      />
                      &nbsp;{" "}
                    </a>
                  </div>
                </div>
              </div>

              {/* On mobile, show social icons below contact info normally */}
              <div className="social_icons_mobile d-lg-none mt-4 d-flex justify-content-center gap-3">
                <div className="mt-4 d-flex gap-3">
                  <a
                    href="https://www.tiktok.com/@leaptechkw?_t=ZS-8yCvz1g4UIU&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon"
                  >
                    &nbsp;
                    <Image
                      src={tiktok}
                      alt="Logo Large"
                      width={23}
                      height={23}
                      priority
                    />
                    &nbsp;
                  </a>
                  <a
                    href="https://www.instagram.com/leaptechkw?igsh=enp4anBubjJ4YWVv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon"
                  >
                    &nbsp;
                    <Image
                      src={insta}
                      alt="Logo Large"
                      width={23}
                      height={23}
                      priority
                    />
                    &nbsp;
                  </a>
                  <a
                    href="https://www.linkedin.com/company/leap-tech-kw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon"
                  >
                    &nbsp;
                    <Image
                      src={linkedin}
                      alt="Logo Large"
                      width={23}
                      height={23}
                      priority
                    />
                    &nbsp;
                  </a>
                  <a
                    href="https://www.facebook.com/share/1TbEaveqqE/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon"
                  >
                    &nbsp;
                    <Image
                      src={fb}
                      alt="Logo Large"
                      width={23}
                      height={23}
                      priority
                    />
                    &nbsp;{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact_us {
          background-color: #f1f1f1;
          padding: 80px 0;
          color: #000;
        }

        .container {
          max-width: 1140px; /* enforce max width */
          margin-left: auto;
          margin-right: auto;
          padding-left: 15px;
          padding-right: 15px;
        }

        .contact_inner {
          background-color: #fff;
          border-radius: 25px;
          padding: 40px 30px;
          box-shadow: 20px 22px 44px #ccc;
        }

        h3 {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        p {
          font-size: 14px;
          margin-bottom: 35px;
          letter-spacing: 1px;
        }

        form {
          width: 100%;
        }

        .form-control {
          border-radius: 0;
          border: none;
          border-bottom: 1px solid #ccc;
          margin-bottom: 1.5rem;
          font-size: 14px;
          padding: 8px 5px;
          color: #000;
          background: transparent;
          outline: none;
          transition: border-color 0.3s ease;
          width: 100%;
        }

        .form-control::placeholder {
          font-size: 13px;
          letter-spacing: 1px;
          color: #666;
        }

        .form-control:focus {
          box-shadow: none;
          border-bottom: 2px solid #1325e8;
        }

        .contact_form_submit {
          padding: 12px 0;
          width: 100%;
          margin-top: 20px;
          cursor: pointer;
          font-size: 14px;
          letter-spacing: 2px;
          font-weight: 600;
          font-weight: 500;
          font-size: 1rem;
          border-radius: 0.375rem;
          background-color: var(--navbar-bg);
          color: var(--text-color);
          border: 1px solid var(--navbar-bg);

        }
        .contact_form_submit:hover {
        
          background-color: var(--text-color);
          color: var(--navbar-bg);
          animation: verticalShakeHover 0.5s ease-in-out;
        }
        
        @keyframes verticalShakeHover {
          0%,
          100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-4px);
          }
          50% {
            transform: translateY(4px);
          }
          75% {
            transform: translateY(-2px);
          }
        }
        .contact_info_wrapper {
          position: relative;
          padding-left: 50%;
          min-height: 420px;
        }

        /* The gradient column behind contact info on desktop */
        .gradient_column {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          box-shadow: -1px 1rem 1rem rgba(0, 0, 0, 0.15) !important;

          border-radius: 25px 0 0 25px;
          z-index: 0;
        }

        .contact_info_sec {
          position: relative;
          background-color: var(--navbar-bg);
          border-radius: 25px 0 0 25px;
          padding: 30px 40px 30px 60px; /* add left padding to clear gradient */
          color: #fff;
          min-height: 420px;
          box-sizing: border-box;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .contact_info_sec h4 {
          letter-spacing: 1px;
          padding-bottom: 20px;
          font-weight: 600;
          font-size: 1.8rem;
        }

        .map_container iframe {
          border-radius: 15px;
          border: none;
          width: 100%;
          height: 220px;
        }

        .info_single {
          font-size: 14px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: #ccc;
          margin-bottom: 20px;
        }

        .info_single i {
          font-size: 20px;
          width: 25px;
          color: #d4afff;
          flex-shrink: 0;
          text-align: center;
        }

        /* Social icons inside gradient column pinned bottom on desktop */
        .social_icons_container {
          position: absolute;
          bottom: 30px;
          right: 0;
          width: 50%;
          height: auto;
          padding-left: 0;
          padding-right: 0;
          z-index: 2;
          background: transparent;
        }

        .social_icons_container .social_icons a {
          font-size: 28px;
          color: #fff;
          transition: color 0.3s ease;
        }

        .social_icons_container .social_icons a:hover {
          color: #d3b8ff;
        }

        /* Mobile social icons below contact info */
        .social_icons_mobile a {
          font-size: 28px;
          color: #2d2d2d;
          transition: color 0.3s ease;
        }
        .social_icons_mobile a:hover {
          color: #8f10b7;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .contact_inner {
            padding: 30px 20px;
          }

          .contact_info_wrapper {
            padding-left: 0 !important;
            min-height: auto;
          }

          .gradient_column {
            display: none !important;
          }

          .contact_info_sec {
            padding-left: 30px !important;
            min-height: auto;
            margin-top: 3rem;
            border-radius: 25px;
          }

          .social_icons_container {
            display: none !important;
          }
        }

        @media (max-width: 575px) {
          h3 {
            font-size: 1.8rem;
          }
          .contact_info_sec h4 {
            font-size: 1.5rem;
          }
          .form-control {
            font-size: 13px;
          }
          .contact_form_submit {
            font-size: 13px;
            padding: 10px 0;
          }
        }

        .contact-title {
          font-size: clamp(2.25rem, 5vw, 4.5rem);
          font-weight: 700;
          font-family: var(--font-title);
          line-height: 1.3;
          color: var(--navbar-bg);
          position: relative;
          display: inline-block;
          margin-bottom: 2rem;
        }

        .underline-gradient {
          width: 120px;
          height: 4px;
          border-radius: 5px;
          background: linear-gradient(
            90deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
          animation: underlinePulse 2s infinite ease-in-out;
          margin-top: 0.5rem;
          transform-origin: center;
        }
      `}</style>

      <ToastContainer />
    </>
  );
};

export default ContactUs;

