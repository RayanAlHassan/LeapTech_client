"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import categoryImages from "@/categoryImages";
import axios from "axios";

interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const CheckService = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);
  const sortedCategories = [...categories].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  
  return (
    <section className="py-5 our_service_section">
      <div className="container">
        <h2 className="contact-title mb-4 text-center text-white">
          Our Services
          <div className="story-underline mx-auto mb-4"></div>
        </h2>

        <div className="row gy-4 justify-content-center single_service_container">
          
        {sortedCategories.map((category) => {
  // Normalize title for lookup: lowercase & trimmed
  const key = category.title.trim().toLowerCase();

  // Lookup image or fallback to "web development"
  const image = categoryImages[key] || categoryImages["web development"];

  // Titles of the new two services you want unclickable
  const unclickableTitles = ["smart home", "cloud storage"];

  const isClickable = !unclickableTitles.includes(key);

  return (
    <div key={category._id} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
      <div
        className="single_service"
        onClick={() => {
          if (isClickable) {
            router.push(`/services/category/${encodeURIComponent(category.title)}`);
          }
        }}
        style={{
          cursor: isClickable ? "pointer" : "default",
          pointerEvents: isClickable ? "auto" : "none", // disable click interactions on these
          opacity: isClickable ? 1 : 0.6, // optionally dim unclickable services
        }}
      >
        <div className="top">
          <span className="icon">
            <Image
              src={image}
              alt={category.title}
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
            <h5 className="__one mb-2">{category.title}</h5>
          </div>
        </div>
        <div className="bottom">{category.description}</div>
      </div>
    </div>
  );
})}

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
