"use client";

import React, { useState } from "react";
import QuotationForm from "@/components/QuotationForm";

const Web = () => {
  const [showForm, setShowForm] = useState(false);
  const serviceId = "64e0a1234abcd5678ef90123"; // Replace with actual ID

  return (
    <div className="container">
      <button className="quote-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Get a Quote"}
      </button>

      {showForm && (
        <div className="form-wrapper">
          <QuotationForm serviceId={serviceId} />
        </div>
      )}

      <style jsx>{`
        .container {
          text-align: center;
          padding: 2rem;
        }

        .quote-btn {
          background-color: #00bfff;
          border: none;
          padding: 12px 24px;
          color: white;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .quote-btn:hover {
          background-color: #0080ff;
        }

        .form-wrapper {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Web;
