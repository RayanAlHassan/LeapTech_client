"use client";

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        if (res.status === 201) {
          setStatus("Your message has been sent!");
          // ...
        } else {
          setStatus("Something went wrong. Please try again.");
        }
        setFormData({
          name: "",
          email: "",
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
    <section
      className="container-fluid contact-section py-5"
      style={{
        background: "linear-gradient(90deg, #f0f4f8 0%, #d9e2ec 100%)",
        minHeight: "70vh",
      }}
    >
      <div className="container">
        <h2 className="contact-title mb-4 text-center">
          Contact Us
          <div
            className={`underline-gradient mx-auto mt-1 ${
              isTyping ? "paused" : ""
            }`}
          ></div>
        </h2>

        <div className="row g-4">
          {/* Left Side */}
          <div className="col-md-6">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27824.723435077165!2d48.050615590253756!3d29.338345468318447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9d12012035db%3A0xe2e2beccf86b9570!2sOmniya%20Shopping%20Center!5e0!3m2!1sen!2slb!4v1753365228687!5m2!1sen!2slb"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen
              loading="eager" // 👈 replaces "lazy"
              referrerPolicy="no-referrer-when-downgrade"
            
            ></iframe>

            <h5 style={{ color: "var(--navbar-bg)", marginTop: "1.5rem" }}>
              Office Location
            </h5>
            <p style={{ color: "#4a4a4a" }}>
              123 Leap Tech Street, Kuwait City, Kuwait
            </p>

            <h5 style={{ color: "var(--navbar-bg)" }}>Email</h5>
            <p>
              <a
                href="mailto:info@leaptechkw.com"
                style={{ color: "#4a4a4a", textDecoration: "underline" }}
              >
                info@leaptechkw.com
              </a>
            </p>

            <h5 style={{ color: "var(--navbar-bg)" }}>Phone</h5>
            <p>
              <a
                href="tel:+96525713432"
                style={{ color: "#4a4a4a", textDecoration: "underline" }}
              >
                +965 2571 3432
              </a>
            </p>
          </div>

          {/* Right: Form */}
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message">Your Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>

              {status && (
                <p className="mt-3" style={{ color: "var(--navbar-bg)" }}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .contact-title {
          font-size: clamp(2.25rem, 5vw, 4.5rem);
          font-weight: 700;
          font-family: var(--font-title);
          color: var(--navbar-bg);
          position: relative;
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
          transform-origin: center;
        }
        .paused {
          animation-play-state: paused;
        }
        @keyframes underlinePulse {
          0% {
            transform: scaleX(0);
            opacity: 0.6;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0);
            opacity: 0.6;
          }
        }
        input.form-control,
        textarea.form-control {
          border-radius: 8px;
          border: 1px solid #ccc;
          padding: 0.5rem 1rem;
        }
        button.btn-primary {
          background: var(--navbar-bg);
          border: none;
          padding: 0.6rem 1.5rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
          border-radius: 8px;
        }
        button.btn-primary:hover {
          background-color: var(--accent-blue);
        }
      `}</style>
      <ToastContainer />

    </section>
  );
};

export default ContactUs;
