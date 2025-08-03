"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import QuotationForm from "@/components/QuotationForm";

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const CategoryDetailPage = () => {
  const router = useRouter();
  const { categoryTitle } = router.query;

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  useEffect(() => {
    if (!categoryTitle) return;

    // Fetch services by category title
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/services/category/${encodeURIComponent(categoryTitle as string)}`
      )
      .then((res) => {
        setServices(res.data);
        if (res.data.length > 0) setSelectedService(res.data[0]);
      })
      .catch((err) => console.error("Failed to fetch services:", err));
  }, [categoryTitle]);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setShowQuotationForm(false);
  };

  if (!categoryTitle) return <p>Loading category...</p>;

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      {/* Sidebar */}
      <aside>
        <div className="card">
          <span>{categoryTitle} Services</span>
          {services.length === 0 && (
            <p style={{ color: "white" }}>No services found.</p>
          )}

          <div className="card__container">
            {services.map((service) => (
              <p
                key={service._id}
                className={`element ${
                  selectedService?._id === service._id ? "active" : ""
                }`}
                onClick={() => handleSelectService(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectService(service);
                  }
                }}
              >
                {service.title}
              </p>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content: service details + quotation form */}
      <main style={{ flex: 1 }}>
        {selectedService ? (
          <section className="py-5 bg-white shapedSection">
            <div className="container">
              <div className="row align-items-center flex-md-row-reverse image-text-wrapper">
                {/* Image Placeholder or Animation */}
                <div className="col-md-6 mb-4 mb-md-0 text-center image-animate">
                  {/* You can later use a map of service images or Lottie animations */}
                  <img
                    src={` ${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${selectedService.image}`}
                    alt={selectedService.title}
                    className="img-fluid"
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                </div>

                {/* Text Content */}
                <div className="col-md-6 text-center text-md-start text-animate">
                  <h2 className="fw-bold title-blue position-relative d-inline-block mb-3">
                    {selectedService.title}
                    <div
                      className="story-underline blue-gradient mt-2 mx-auto mx-md-0"
                      style={{ height: 4, width: 120 }}
                    />
                  </h2>
                  <p className="lead" style={{ textAlign: "left" }}>
                    {selectedService.description.split(" ").map((word, i) => (
                      <span key={i} className="hover-underline">
                        {word}&nbsp;
                      </span>
                    ))}
                  </p>

                  <div className="mt-4 text-center text-md-start">
                    <button
                      onClick={() => setShowQuotationForm((prev) => !prev)}
                      className="btn btn-primary px-4 py-2"
                    >
                      {showQuotationForm
                        ? "Close Quotation Form"
                        : "Request a Quote"}
                    </button>
                  </div>

                  {showQuotationForm && (
                    <div className="mt-4">
                      <QuotationForm serviceId={selectedService._id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <p>Please select a service.</p>
        )}
      </main>

      <style jsx>{`
        .card {
          width: 100%; /* full width of sidebar */
          max-width: 280px; /* max width as before */
          border-radius: 15px;
          background: rgb(27, 26, 26);
          color: white;
          font-weight: 600;
          font-size: 1.2em;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-shadow: -5px 5px 1px 0px #004d92;
          height: 80vh;
          overflow-y: auto;
        }

        .card span {
          margin-bottom: 12px;
        }

        .card__container {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .element {
          color: grey;
          font-size: 0.9em;
          padding: 8px 15px;
          border-left: 2px solid grey;
          cursor: pointer;
          border-radius: 5px 0 0 5px;
          user-select: none;
          transition: all 0.3s ease;
        }

        .element:hover:not(.active) {
          color: #3775bb;
        }

        .active {
          background-color: #004d92;
          border-left: 2px solid #8cb4ff;
          color: azure;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .card {
            max-width: 100%;
            height: auto;
            box-shadow: none;
            border-radius: 10px;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryDetailPage;
