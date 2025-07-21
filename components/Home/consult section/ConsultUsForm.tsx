"use client";

import React, { useState } from "react";
import axios from "axios";

const ConsultUsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    organization: "",
    service: "",
    projectDescription: "",
    estimatedBudget: "",
    projectTimeline: "",
    preferredContactMethod: "",
    bestTimeToContact: "",
  });

  // To track whether user selected company or organization
  const [entityType, setEntityType] = useState<"company" | "organization" | "">("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle radio button change for entity type
  const handleEntityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "company" | "organization";
    setEntityType(value);

    // Clear the other field when switching
    if (value === "company") {
      setFormData((prev) => ({ ...prev, organization: "" }));
    } else {
      setFormData((prev) => ({ ...prev, company: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation: exactly one of company or organization must be provided and match entityType
    if (!entityType) {
      setError("Please select either Company or Organization.");
      return;
    }
    if (entityType === "company" && !formData.company.trim()) {
      setError("Please enter your Company name.");
      return;
    }
    if (entityType === "organization" && !formData.organization.trim()) {
      setError("Please enter your Organization name.");
      return;
    }

    setLoading(true);

    try {
      // Build payload with either company or organization set
      const payload = {
        ...formData,
        company: entityType === "company" ? formData.company : "",
        organization: entityType === "organization" ? formData.organization : "",
      };

      const response = await axios.post("http://localhost:5001/consult", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setSuccess(response.data.message || "Consultation submitted successfully.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        organization: "",
        service: "",
        projectDescription: "",
        estimatedBudget: "",
        projectTimeline: "",
        preferredContactMethod: "",
        bestTimeToContact: "",
      });
      setEntityType("");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
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
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
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
            <label htmlFor="entity-company" className="form-check-label">Company</label>
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
            <label htmlFor="entity-organization" className="form-check-label">Organization</label>
          </div>
        </div>

        {/* Conditionally show the text input based on selection */}
        {entityType === "company" && (
          <div className="col-md-6">
            <label htmlFor="company" className="form-label">Company Name</label>
            <input
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
            <label htmlFor="organization" className="form-label">Organization Name</label>
            <input
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

        <div className="col-12">
          <label htmlFor="service" className="form-label">Service</label>
          <select
            className="form-select"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Software Integration">Software Integration</option>
            <option value="Social media">Social Media</option>
            <option value="Marketing">Marketing</option>
            <option value="Branding">Branding</option>
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="projectDescription" className="form-label">Project Description</label>
          <textarea
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
          <label htmlFor="estimatedBudget" className="form-label">Estimated Budget (Optional)</label>
          <input
            type="text"
            className="form-control"
            id="estimatedBudget"
            name="estimatedBudget"
            value={formData.estimatedBudget}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="projectTimeline" className="form-label">Project Timeline</label>
          <input
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
              <label className="form-check-label" htmlFor={`contactMethod-${method}`}>
                {method}
              </label>
            </div>
          ))}
        </div>

        <div className="col-12">
          <label htmlFor="bestTimeToContact" className="form-label">Best Time to Contact</label>
          <input
            type="datetime-local"
            className="form-control"
            id="bestTimeToContact"
            name="bestTimeToContact"
            value={formData.bestTimeToContact}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 text-end">
     
          <button type="submit" disabled={loading} className="btn lang-toggle-btn  px-4 " >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
      <style jsx>{`
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

  .lang-toggle-btn:hover {
    background: white;
    color:var(--navbar-bg)
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
    background: linear-gradient(90deg, white 0%, rgba(255, 255, 255, 0.5) 50%, white 100%);
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

    </form>
    
    
  
    );
  
};

export default ConsultUsForm;
