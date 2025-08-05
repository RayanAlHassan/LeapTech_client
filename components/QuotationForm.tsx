"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface QuotationFormProps {
  serviceId: string;
  onSuccess?: () => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({
  serviceId,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    civilID: "",
    phoneNumber: "",
    email: "",
    message: "",
    budget: "",
    expectedDate: "",
    contactMethod: "Email",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [serviceTitle, setServiceTitle] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  useEffect(() => {
    const fetchServiceTitle = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`
        );
        setServiceTitle(res.data?.title || "Selected Service");
      } catch (err) {
        setServiceTitle("Selected Service");
        console.error("Failed to fetch service title", err);
      }
    };

    if (serviceId) {
      fetchServiceTitle();
    }
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/quotation`,
        {
          ...formData,
          service: serviceId,
          expectedDate: formData.expectedDate
            ? new Date(formData.expectedDate)
            : null,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          civilID: "",
          phoneNumber: "",
          email: "",
          message: "",
          budget: "",
          expectedDate: "",
          contactMethod: "Email",
        });
        onSuccess?.();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to submit quotation");
      } else {
        setError("Failed to submit quotation");
      }
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <p className="title">Request a Quote</p>
        <p className="message">
          Fill out the form and we’ll get back to you soon.
        </p>
        <p>
          This Quotation is requested for:{" "}
          <span style={{ color: "#00bfff96", fontWeight: "bold" }}>
            {serviceTitle || "Loading..."}
          </span>
        </p>

        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="given-name"
            />
            <span className="focusing">First Name</span>
          </label>

          <label>
            <input
              className="input"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="family-name"
            />
            <span className="focusing">Last Name</span>
          </label>
        </div>

        <label>
          <input
            className="input"
            type="text"
            name="civilID"
            value={formData.civilID}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <span className="focusing">Civil ID</span>
        </label>

        <label>
          <input
            className="input"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder=" "
            autoComplete="tel"
          />
          <span className="focusing">Phone Number</span>
        </label>

        <label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
            autoComplete="email"
          />
          <span className="focusing">Email</span>
        </label>

        <label>
          <textarea
            className="input"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder=" "
            rows={4}
          />
          <span className="focusing">How Can We Help You?</span>
        </label>

        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder=" "
            />
            <span className="focusing">Budget</span>
          </label>

          <label>
  <input
    className="input"
    type="date"
    name="expectedDate"
    value={formData.expectedDate}
    onChange={handleChange}
    placeholder=" "
    min={getTodayDate()}
  />
  <span className="focusing">Expected Project Delivery</span>
</label>


        </div>

        <label>
          <span className="focusing">Preferred Contact Method</span>

          <div className="mydict">
            <div>
              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="Email"
                  checked={formData.contactMethod === "Email"}
                  onChange={handleChange}
                />
                <span>Email</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="Phone"
                  checked={formData.contactMethod === "Phone"}
                  onChange={handleChange}
                />
                <span>Phone</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="Visit company"
                  checked={formData.contactMethod === "Visit company"}
                  onChange={handleChange}
                />
                <span>Visit Company</span>
              </label>
            </div>
          </div>
        </label>

        <button disabled={loading} className="submit" type="submit">
          {loading ? "Submitting..." : "Submit"}
        </button>

        {error && <p className="error-msg">{error}</p>}
        {success && (
          <p className="success-msg">Quotation submitted successfully!</p>
        )}
      </form>

      <style jsx>{`
        .input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
        /* Make sure the date input matches height & padding */
        .input[type="date"] {
          padding: 20px 5px 5px 10px; /* same as text inputs */
          height: 4rem; /* match other inputs */
          box-sizing: border-box;
          background-color: black;
          color: #fff;
          border: 1px solid rgba(105, 105, 105, 0.397);
          border-radius: 10px;
          font-size: 16px;
          appearance: none; /* remove native date picker styling */
          -webkit-appearance: none;
          -moz-appearance: none;
        }
        
        /* Fix the calendar picker icon to show properly */
        .input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        /* Floating label initial position */
        .input[type="date"] + .focusing {
          top: 12.5px;
          font-size: 0.9em;
          color: rgba(255, 255, 255, 0.5);
          left: 10px;
          pointer-events: none;
          position: absolute;
          transition: 0.3s ease;
          user-select: none;
        }
        
        /* When date input is focused or has value, move label up */
        .input[type="date"]:focus + .focusing,
        .input[type="date"]:not(:placeholder-shown) + .focusing {
          top: 0;
          font-size: 0.7em;
          font-weight: 600;
          color: #00bfff;
        }
        
        .form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 600px;
          padding: 20px;
          border-radius: 20px;
          // background-color: #003366;
          background-color: black;

          color: #fff;
          border: 1px solid #333;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
          margin: 0 auto;
        }

        .title {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -1px;
          position: relative;
          display: flex;
          align-items: center;
          padding-left: 30px;
          color: white;
          margin-bottom: 0;
        }
        .title::before,
        .title::after {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          border-radius: 50%;
          left: 0px;
          background-color: white;
        }
        .title::after {
          animation: pulse 1s linear infinite;
        }

        .message {
          font-size: 14.5px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 0;
          margin-bottom: 15px;
        }

        .signin {
          font-size: 14.5px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }
        .signin a {
          color: #00bfff;
          text-decoration: none;
        }
        .signin a:hover {
          text-decoration: underline royalblue;
        }

        .flex {
          display: flex;
          flex-direction: column; /* ✅ Stack by default */
          width: 100%;
          gap: 6px;
        }

        @media (min-width: 768px) {
          .flex {
            flex-direction: row; /* ✅ Side-by-side on tablets+ */
          }
        }
       
        @media (max-width: 768px) {
          .form-wrapper {
            overflow-y: auto;
            padding: 10px;
            max-height: 75vh;
          }
        }

        @media (max-width: 400px) {
          .mydict div {
            flex-wrap: wrap;
            justify-content: center;
          }

          .mydict label {
            flex: 0 0 50%; /* Take 50% width each */
            box-sizing: border-box;
          }

          /* Make the last label full width and centered */
          .mydict label:last-child {
            flex: 0 0 100%;
            text-align: center;
            margin-top: 8px; /* add some spacing */
          }
        }

        label {
          position: relative;
          flex: 1;

          z-index: 1000;
        }

        .input {
          // background-color: #003366;
          background-color: black;

          color: #fff;
          width: 100%;
          padding: 20px 5px 5px 10px;
          outline: 0;
          border: 1px solid rgba(105, 105, 105, 0.397);
          border-radius: 10px;
          font-size: 16px;
        }

        .input + span {
          color: rgba(255, 255, 255, 0.5);

          position: absolute;
          left: 10px;
          top: 0px;
          font-size: 0.9em;
          cursor: text;
          transition: 0.3s ease;
          user-select: none;
        }

        .input:placeholder-shown + span {
          top: 12.5px;
          font-size: 0.9em;
        }

        .input:focus + span,
        .input:not(:placeholder-shown) + span {
          color: #00bfff;
          top: 0px;
          font-size: 0.7em;
          font-weight: 600;
        }

        select.input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: none;
          padding-right: 30px;
        }

        textarea.input {
          resize: vertical;
          min-height: 80px;
        }

        .submit {
          border: none;
          outline: none;
          padding: 10px;
          border-radius: 10px;
          color: #003366;
          font-size: 16px;
          background-color: white;
          cursor: pointer;
          transition: 0.3s ease;
          font-weight: 600;
          margin-top: 10px;
        }
        .submit:hover {
          background-color: #00bfff96;
          color: white;
        }

        .error-msg {
          color: #ff4d4f;
          font-weight: 600;
          margin-top: 10px;
          text-align: center;
        }

        .success-msg {
          color: #4bb543;
          font-weight: 600;
          margin-top: 10px;
          text-align: center;
        }

        @keyframes pulse {
          from {
            transform: scale(0.9);
            opacity: 1;
          }

          to {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        :focus {
          outline: 0;
          border-color: #2260ff;
          box-shadow: 0 0 0 4px #b5c9fc;
        }

        .mydict div {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          align-items: stretch; /* make labels equal height */
        }

        /* Make labels flex containers too, so span fills height */
        .mydict label {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 1 auto; /* ← this stops weird stretching */
          min-width: 100px; /* or 120px if you prefer */
        }

        /* Make span fill label height for vertical alignment */
        .mydict label span {
          flex: 0 1 auto;
          min-width: 100px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.375em 0.75em;
          background-color: #fff;
          box-shadow: 0 0 0 0.0625em #b5bfd9;
          letter-spacing: 0.05em;
          color: #3e4963;
          text-align: center;
          transition: background-color 0.5s ease;
          border-radius: 0;
          margin-left: 0.0625em;
        }

        /* Rounded corners for first and last */
        .mydict label:first-child span {
          border-radius: 0.375em 0 0 0.375em;
        }

        .mydict label:last-child span {
          border-radius: 0 0.375em 0.375em 0;
        }

        /* Hide native radio */
        .mydict input[type="radio"] {
          clip: rect(0 0 0 0);
          clip-path: inset(100%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }

        /* Checked styling */
        .mydict input[type="radio"]:checked + span {
          box-shadow: 0 0 0 0.0625em #0043ed;
          background-color: #dee7ff;
          z-index: 1;
          color: #0043ed;
        }

        /* Responsive for narrow phones (max 340px) */
        @media (max-width: 340px) {
          .mydict div {
            flex-wrap: wrap;
            justify-content: center;
            align-items: stretch; /* keep equal height */
          }

          /* First two side-by-side */
          .mydict label:nth-child(1),
          .mydict label:nth-child(2) {
            flex: 0 0 50%;
            box-sizing: border-box;
          }

          /* Third label full width below */
          .mydict label:nth-child(3) {
            flex: 0 0 100%;
            text-align: center;
            margin-top: 8px;
          }
        }
        @media (max-width: 440px) {
          .mydict label {
            flex: 0 0 100%;
          }

          .mydict label span {
            border-radius: 0.375em !important;
          }
          .form-wrapper {
            overflow-y: auto;
            padding: 10px;
            max-height: 75vh;
          }
        }
      `}</style>
    </div>
  );
};

export default QuotationForm;
