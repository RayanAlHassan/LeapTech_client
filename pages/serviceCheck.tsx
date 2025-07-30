"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import seo from "@/public/images/seo.png";
import web from "@/public/images/website.png";
import sm from "@/public/images/digital.png";
import app from "@/public/images/mobileApps.png";

interface Service {
  image: StaticImageData;
  title: string;
  description: string;
  route: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    description: "Professional websites and e-commerce platforms tailored to your brand.",
    image: web,
    route: "/web",
  },
  {
    title: "E-Business",
    description: "Boost brand visibility and engagement through digital strategies.",
    image: sm,
    route: "/socialMedia",
  },
  {
    title: "Mobile Application",
    description: "Robust, user-friendly apps for iOS and Android platforms.",
    image: app,
    route: "/mobileApp",
  },
  {
    title: "Digital Marketing",
    description: "Drive growth and conversions through targeted campaigns, SEO, and data-driven strategies.",
    image: seo,
    route: "/digitalMarketing",
  },
];

const CheckService = () => {
  const router = useRouter();

  return (
    <section className="py-5 our_service_section">
      <div className="container">
        <h2 className="contact-title mb-4 text-center text-white">
          Our Services
          <div className="story-underline mx-auto mb-4"></div>
        </h2>

        <div className="row gy-4 justify-content-center single_service_container">
          {services.map((service, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div
                className="single_service"
                onClick={() => router.push(service.route)}
                style={{ cursor: "pointer" }}
              >
                <div className="top">
                  <span className="icon">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={60}
                      height={60}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  </span>
                  <div className="text">
                    <h5 className="__one mb-2">{service.title}</h5>
                  </div>
                </div>
                <div className="bottom">{service.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
  .our_service_section {
    background-color: var(--navbar-bg);
    background-size: cover;
    background-position: left top;
    background-repeat: no-repeat;
    min-height: 100vh;
    color: var(--text-color);
    position: relative;
    padding: 100px 20px;
  }

  .our_service_section::before {
    content: "";
    background-image: linear-gradient(
      150deg,
      var(--gray-bg) 50%,
      transparent 70%
    );
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    clip-path: polygon(100% 0, 0 100%, 100% 100%);
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 2;
  }

  .single_service {
    max-width: 450px;
    background-color: var(--gray-bg);
    padding: 25px 30px;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(25, 51, 93, 0.08);
    transition: all 0.3s ease-in-out;
    color: var(--navbar-bg);
    border: 1px solid transparent;
  }

  .single_service:hover {
    background-color: var(--navbar-bg);
    color: var(--text-color);
    transform: translateY(-6px);
    box-shadow: 0 0 0 2px var(--accent-blue), 0 10px 24px rgba(0, 123, 255, 0.25);
  }

  .single_service:hover .__one,
  .single_service:hover .bottom {
    color: var(--text-color);
  }

  .top {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .icon {
    background: rgba(0, 123, 255, 0.1);
    display: inline-block;
    min-width: 90px;
    height: 90px;
    font-size: 48px;
    color: var(--accent-blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid rgba(0, 123, 255, 0.2);
  }

  .text {
    width: 100%;
    margin-left: 20px;
    font-style: normal;
  }

  .__one {
    font-family: var(--font-title);
    font-weight: 600;
    color: var(--navbar-bg);
    font-size: 1.25rem;
    transition: color 0.3s ease-in-out;
  }

  .bottom {
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    color: #444;
    transition: color 0.3s ease-in-out;
  }

  .story-underline {
    width: 120px;
    height: 4px;
    border-radius: 5px;
    background: linear-gradient(
      90deg,
      var(--text-color),
      var(--accent-blue)
    );
  }

  @media (max-width: 768px) {
    .icon {
      min-width: 70px;
      height: 70px;
    }
    .__one {
      font-size: 1.1rem;
    }
  }
`}</style>

    </section>
  );
};

export default CheckService;
