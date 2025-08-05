"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import QuotationForm from "@/components/QuotationForm";
import Image from "next/image";
// import ProjectServiceCarousel from "@/components/Home/carousel/ProjectServiceCarousel";
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
    <div className="container-fluid py-4 " style={{minHeight:"55vh"}}>
      <div className="row d-flex flex-column flex-md-row justify-content-center align-items-stretch">
        {/* Sidebar */}
        <aside className="col-12 col-md-3 mb-4 d-flex justify-content-center">
          <div className="card text-center text-md-start">
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

        {/* Main Content */}
        <main className="col-12 col-md-9">
          {selectedService ? (
            <div className="d-flex flex-column-reverse flex-md-row align-items-center justify-content-between">
              {/* Text Section */}
              <div className="col-12 col-md-6 text-section text-center text-md-start mb-4 mb-md-0">
                <h1 className="category-title">{categoryTitle}</h1>
                <h2 className="service-title">
                  {selectedService.title}
                  <span className="underline-gradient" />
                </h2>
                <p className="lead description">
                  {selectedService.description}
                </p>

                <div className="mt-3">
                  <button
                    onClick={() => setShowQuotationForm((prev) => !prev)}
                    className="btn btn-primary px-4 py-2"
                  >
                    {showQuotationForm
                      ? "Close Quotation Form"
                      : "Request a Quote"}
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
                <Image
                    width={600}   // or any max width you want
                    height={400}  // approximate height for aspect ratio
                    style={{ maxWidth: "100%", height: "auto", borderRadius: "12px" }}
                  
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${selectedService.image}`}
                  alt={selectedService.title}
                  className="img-fluid service-image"
                />
              </div>
            </div>
          ) : (
            <p className="text-center">Please select a service.</p>
          )}
        </main>
      </div>

      {/* Modal */}
      {showQuotationForm && (
        <div className="quotation-modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setShowQuotationForm(false)}
            >
              &times;
            </button>
            <QuotationForm serviceId={selectedService!._id} />
          </div>
        </div>
      )}
      {/* <ProjectServiceCarousel/> */}

      {/* Styles */}
      <style jsx>{`
        .card {
          width: 89%;
          border-radius: 15px;
          background: rgb(27, 26, 26);
          color: white;
          font-weight: 600;
          font-size: 1.2em;
          padding: 15px;
          box-shadow: -5px 5px 1px 0px #004d92;
          height: 100%;
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

        .quotation-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: #ffffff00;
          padding: 2rem;
          border-radius: 12px;
          max-width: 600px;
          width: 90%;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          z-index: 10000;
        }

        .close-button {
          position: absolute;
          top: 2.5rem;
          right: 3rem;
          background: #00000000;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #ffffff;
          z-index: 10001; /* Make sure it's above other elements */

        }

        .category-title {
          font-size: 2rem;
          font-weight: 700;
          color: #004d92;
          margin-bottom: 0.5rem;
        }

        .service-title {
          font-size: 1.6rem;
          font-weight: 600;
          color: #004d92;
          position: relative;
          padding-bottom: 6px;
          display: inline-block;
        }

        .underline-gradient {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 4px;
          width: 100%;
          border-radius: 10px;
          background: linear-gradient(to right, #004d92, #8cb4ff);
        }

        .description {
          text-align: left;
        }

        .service-image {
          max-height: 350px;
          object-fit: contain;
          width: 100%;
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .card {
            max-width: 100%;
            height: auto;
            margin-bottom: 1rem;
            text-align: center;
            box-shadow: none;
          }

          .text-section,
          .category-title,
          .service-title,
          .description {
            text-align: center !important;
          }

          .service-image {
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryDetailPage;
