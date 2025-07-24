"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Service {
  _id: string;
  category: string;
  title: string;
}

const ConsultUsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    organization: "",
    category: "",
    serviceId: "", // <-- changed from title to serviceId
    projectDescription: "",
    estimatedBudget: "",
    projectTimeline: "",
    preferredContactMethod: "",
    bestTimeToContact: "",
  });

  const [entityType, setEntityType] = useState<"company" | "organization" | "">(
    ""
  );
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000); // Hide after 5 sec
      return () => clearTimeout(timer);
    }
  }, [success]);
  
  // Fetch services
  useEffect(() => {
    setLoading(true); // <-- start loading
  
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
      .then((res) => {
        setServices(res.data);
        setError(null);         // <-- clear error if success
      })
      .catch((err) => {
        console.error("Error fetching services", err);
        setError("Failed to load services. Please try again later."); // <-- custom error
      })
      .finally(() => {
        setLoading(false); // <-- stop loading after both success/fail
      });
  }, []);
  
  

  // Extract unique categories
  const categories = Array.from(new Set(services.map((s) => s.category)));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEntityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "company" | "organization";
    setEntityType(value);
    setFormData((prev) => ({
      ...prev,
      company: value === "company" ? prev.company : "",
      organization: value === "organization" ? prev.organization : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !entityType ||
      (entityType === "company" && !formData.company.trim()) ||
      (entityType === "organization" && !formData.organization.trim())
    ) {
      setError("Please complete required fields.");
      return;
    }

    const payload = {
      ...formData,
      company: entityType === "company" ? formData.company : "",
      organization: entityType === "organization" ? formData.organization : "",
      service: formData.serviceId, // used as single field in DB
    };

    try {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

      setLoading(true);

      const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/consult`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Submitted successfully!", {
        position: "bottom-center",
        theme: "colored",
      });      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        organization: "",
        category: "",
        serviceId: "", // reset
        projectDescription: "",
        estimatedBudget: "",
        projectTimeline: "",
        preferredContactMethod: "",
        bestTimeToContact: "",
      });
      setEntityType("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Submission failed.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  const getTodayDateTimeLocal = (): string => {
    const now = new Date();
    now.setSeconds(0, 0); // Remove seconds and milliseconds for compatibility
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

    if (loading && services.length === 0) {
    return (
      <div className="text-center my-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && services.length === 0) {
    return (
      <div className="alert alert-danger my-4 text-center">
        {error}
      </div>
    );
  }
 
  return (
    
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row g-3 shadow">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="exp: Abdul rahman Al Azmi"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
          placeholder="exp@gmail.com"
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
          placeholder="exp: +965 xxxx xxxx"
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Radio buttons for choosing Company or Organization */}
        <div className="col-12 mt-3">
          <label className="form-label d-block">I represent a *</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="entity-company"
              name="entityType"
              value="company"
              className="form-check-input"
              checked={entityType === "company"}
              onChange={handleEntityTypeChange}
              required
            />
            <label htmlFor="entity-company" className="form-check-label">
              Company
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="entity-organization"
              name="entityType"
              value="organization"
              className="form-check-input"
              checked={entityType === "organization"}
              onChange={handleEntityTypeChange}
            />
            <label htmlFor="entity-organization" className="form-check-label">
              Organization
            </label>
          </div>
        </div>

        {/* Conditionally show the text input based on selection */}
        {entityType === "company" && (
          <div className="col-md-6">
            <label htmlFor="company" className="form-label">
              Company Name
            </label>
            <input
            placeholder="exp: Red Cross"
              type="text"
              className="form-control"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required={entityType === "company"}
            />
          </div>
        )}

        {entityType === "organization" && (
          <div className="col-md-6">
            <label htmlFor="organization" className="form-label">
              Organization Name
            </label>
            <input
            placeholder="exp:Red Cross"
              type="text"
              className="form-control"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required={entityType === "organization"}
            />
          </div>
        )}

        {/* Category Radio Buttons */}
        <div className="col-12 mt-3">
          <label className="form-label d-block">Choose a service *</label>
          {categories.map((cat) => (
            <div className="form-check form-check-inline" key={cat}>
              <input
                className="form-check-input"
                type="radio"
                id={`cat-${cat}`}
                name="category"
                value={cat}
                checked={formData.category === cat}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor={`cat-${cat}`}>
                {cat}
              </label>
            </div>
          ))}
        </div>

        {/* Title Dropdown (after category selection) */}
        {formData.category && (
          <div className="col-12 mt-3">
            <label htmlFor="title" className="form-label">
              Select type of a service *
            </label>
            <select
              className="form-select"
              id="title"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a service</option>
              {services
                .filter((s) => s.category === formData.category)
                .map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.title}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="col-12">
          <label htmlFor="projectDescription" className="form-label">
            Project Description
          </label>
          <textarea
          placeholder="write your message"
            className="form-control"
            id="projectDescription"
            name="projectDescription"
            rows={3}
            value={formData.projectDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="estimatedBudget" className="form-label">
            Estimated Budget (Optional)
          </label>
          <input
          placeholder="exp: 1000$"
            type="text"
            className="form-control"
            id="estimatedBudget"
            name="estimatedBudget"
            value={formData.estimatedBudget}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="projectTimeline" className="form-label">
            Project Timeline (Optional)
          </label>
          <input
          placeholder="exp: 2 months"
            type="text"
            className="form-control"
            id="projectTimeline"
            name="projectTimeline"
            value={formData.projectTimeline}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label d-block">Preferred Contact Method</label>
          {["Email", "Phone", "Visit company"].map((method) => (
            <div className="form-check form-check-inline" key={method}>
              <input
                className="form-check-input"
                type="radio"
                id={`contactMethod-${method}`}
                name="preferredContactMethod"
                value={method}
                checked={formData.preferredContactMethod === method}
                onChange={handleChange}
                required
              />
              <label
                className="form-check-label"
                htmlFor={`contactMethod-${method}`}
              >
                {method}
              </label>
            </div>
          ))}
        </div>

        <div className="col-12">
          <label htmlFor="bestTimeToContact" className="form-label">
            Best Time to Contact
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="bestTimeToContact"
            name="bestTimeToContact"
            value={formData.bestTimeToContact}
            onChange={handleChange}
            min={getTodayDateTimeLocal()} 
          />
        </div>

        <div className="col-12 text-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn lang-toggle-btn  px-4 "
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
      <style jsx>{`
      .success-toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1050;
        max-width: 90%;
        padding: 12px 20px;
        border-radius: 6px;
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
        animation: fadeInUp 0.3s ease;
        font-weight: 500;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translate(-50%, 20px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
      
        .lang-toggle-btn {
          background: linear-gradient(135deg, #003366, #1e4976);
          color: white;
          border: 2px solid transparent;
          border-radius: 6px;
          padding: 6px 24px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 2px solid white;
        }

        .shadow {
          boxshadow: "0 10px 30px rgba(0,0,0,0.2)";
        }
        .lang-toggle-btn:hover {
          background: white;
          color: var(--navbar-bg);
        }

        /* Make modal X button white (globally) */
        :global(.btn-close) {
          filter: invert(1);
          opacity: 1;
        }

        /* Ensure modal header and body blend together */
        :global(.modal-content) {
          border-radius: 0 !important;
          border: none !important;
          background: transparent;
          box-shadow: none;
        }

        :global(.modal-header),
        :global(.modal-body) {
          background: linear-gradient(135deg, #003366, #1e4976);
          color: white;
          border: none !important;
          margin: 0;
          padding: 1.5rem;
        }

        :global(.modal-title) {
          color: white;
          position: relative;
          display: inline-block;
          font-size: 2rem;
          font-weight: 700;
        }

        :global(.modal-title::after) {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            white 0%,
            rgba(255, 255, 255, 0.5) 50%,
            white 100%
          );
          animation: underlinePulse 2s infinite ease-in-out;
          border-radius: 5px;
        }

        @keyframes underlinePulse {
          0% {
            transform: scaleX(0.2);
            opacity: 0.6;
            transform-origin: left;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
            transform-origin: center;
          }
          100% {
            transform: scaleX(0.2);
            opacity: 0.6;
            transform-origin: right;
          }
        }
      `}</style>
         <ToastContainer />

    </form>

  );
};

export default ConsultUsForm;
