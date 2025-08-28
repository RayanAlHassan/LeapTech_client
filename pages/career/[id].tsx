"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Career {
  _id: string;
  title: string;
  description: string;
  location?: string;
  employmentType?: string;
  experienceLevel?: string;
  skills?: string[];
  keyResponsibilities?: string[];
}

const CareerDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showApply, setShowApply] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null as File | null,
  });
  const [applyMsg, setApplyMsg] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get<Career>(`${process.env.NEXT_PUBLIC_API_URL}/career/${id}`)
      .then((res) => {
        setCareer(res.data);
        setError(null);
      })
      .catch(() => setError("Career not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const [submitting, setSubmitting] = useState(false);

const submitApplication = async (e: React.FormEvent) => {
  e.preventDefault();
  setApplyMsg(""); // clear previous messages

  if (!applyForm.cv) {
    setApplyMsg("❌ Please attach your CV (PDF).");
    return;
  }

  try {
    setSubmitting(true); // start loading
    const fd = new FormData();
    fd.append("name", applyForm.name);
    fd.append("email", applyForm.email);
    fd.append("phone", applyForm.phone);
    fd.append("cvUrl", applyForm.cv as File);
    fd.append("careerId", String(id));

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/career/apply`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setApplyMsg("✅ Application submitted successfully!");
    setApplyForm({ name: "", email: "", phone: "", cv: null });
    setShowApply(false);

    setTimeout(() => setApplyMsg(""), 5000);
  } catch (err: unknown) {
    let message = "❌ Could not submit your application.";
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      message = err.response.data.message;
    }
    setApplyMsg(message);
  } finally {
    setSubmitting(false); // stop loading
  }
};
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error || !career)
    return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <section className="career-page py-5">
      <div className="container">
        {/* Back Button */}
        <div className="mb-4 text-center">
          <button className="career-btn" onClick={() => router.push("/career")}>
            ← Back to Careers
          </button>
        </div>

        <div className="career-card">
          {/* Title */}
          <h1 className="career-title mb-4 text-center">{career.title}</h1>

          {/* Meta Info */}
          <div className="career-meta mb-4 text-center text-muted">
            {career.location && (
              <span className="me-3">
                <strong>Location:</strong> {career.location}
              </span>
            )}
            {career.employmentType && (
              <span className="me-3">
                <strong>Type:</strong> {career.employmentType}
              </span>
            )}
            {career.experienceLevel && (
              <span>
                <strong>Level:</strong> {career.experienceLevel}
              </span>
            )}
          </div>
          {/* Job Description */}
          <div className="mb-5">
            <h5>Job Description:</h5>
            <p style={{ whiteSpace: "pre-line" }}>{career.description}</p>
          </div>

          {/* Skills */}
          {career.skills && career.skills.length > 0 && (
            <div className="mb-4">
              <h5>Skills Required:</h5>
              <div className="skills-tags">
                {career.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Responsibilities */}
          {career.keyResponsibilities &&
            career.keyResponsibilities.length > 0 && (
              <div className="mb-4">
                <h5>Key Responsibilities:</h5>
                <ul className="ps-4">
                  {career.keyResponsibilities.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            )}

          {/* Apply Button */}
          <div className="text-center mb-4">
            <button
              className="career-btn btn-lg px-5"
              onClick={() => setShowApply((s) => !s)}
            >
              {showApply ? "Close Form" : "Easy Apply"}
            </button>
          </div>

          {/* Apply Form */}
          {showApply && (
            <div className="apply-form p-4 rounded bg-light border border-primary">
              <form onSubmit={submitApplication} className="row g-3">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Your Name"
                    value={applyForm.name}
                    onChange={(e) =>
                      setApplyForm({ ...applyForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={applyForm.email}
                    onChange={(e) =>
                      setApplyForm({ ...applyForm, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Your Phone"
                    value={applyForm.phone}
                    onChange={(e) =>
                      setApplyForm({ ...applyForm, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setApplyForm({
                        ...applyForm,
                        cv: e.target.files?.[0] || null,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-12 text-center">
                <button
  type="submit"
  className="career-btn w-50 btn-lg"
  disabled={submitting}
>
  {submitting ? "Submitting..." : "Submit Application"}
</button>
                </div>
              </form>
            </div>
          )}
          {applyMsg && (
            <p
              className={`mt-3 text-center ${
                applyMsg.startsWith("✅") ? "text-success" : "text-danger"
              }`}
            >
              {applyMsg}
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .career-btn {
          background-color: transparent;
          color: var(--navbar-bg);
          border: 1px solid var(--navbar-bg);
          transition: all 0.3s ease;
          font-weight: 600;
          border-radius: 8px;
          padding: 8px 20px;
          margin: 0 5px;
        }
        .career-btn:hover {
          background-color: var(--navbar-bg);
          color: white;
        }
        .btn-lg {
          font-size: 1.1rem;
        }

        .career-title {
          color: var(--navbar-bg);
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
        }

        .career-page {
          background-color: #f5f5f5;
          min-height: 100vh;
          padding: 80px 20px;
        }

        .career-card {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 40px;
          background-color: #fff;
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          background-color: #e7f0ff;
          color: #0d6efd;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .career-card {
            padding: 25px;
          }
          .apply-form button {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CareerDetailPage;
