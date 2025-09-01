"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Lottie from "lottie-react";
import lootie from "@/public/animations/LoadingPaperplane.json";

interface Career {
  _id: string;
  title: string;
  description?: string;
  status: "Open" | "Closed";
  location?: string;
  profession: string;
  employmentType?: string;
  experienceLevel?: string;
  createdAt: string;
}

const MAX_DESC_LENGTH = 120;

const CareersPage: React.FC = () => {
  const router = useRouter();
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  const [cvForm, setCvForm] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    cv: null as File | null,
  });
  const [cvMsg, setCvMsg] = useState<string>("");

  useEffect(() => {
    axios
      .get<Career[]>(`${process.env.NEXT_PUBLIC_API_URL}/career`)
      .then((res) => setCareers(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  const openJobs = careers.filter((c) => c.status === "Open");

  const truncateDescription = (desc?: string) => {
    if (!desc) return "";
    return desc.length > MAX_DESC_LENGTH
      ? desc.slice(0, MAX_DESC_LENGTH) + "…"
      : desc;
  };

  const [submittingCv, setSubmittingCv] = useState(false);

  const handleCvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCvMsg("");
    if (!cvForm.cv) {
      setCvMsg("❌ Please attach your CV (PDF).");
      return;
    }

    try {
      setSubmittingCv(true);
      const fd = new FormData();
      fd.append("name", cvForm.name);
      fd.append("email", cvForm.email);
      fd.append("phone", cvForm.phone);
      fd.append("profession", cvForm.profession);
      fd.append("cvUrl", cvForm.cv);

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/career/apply`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCvMsg("✅ Thanks! Your CV has been received.");
      setCvForm({ name: "", email: "", phone: "", profession: "", cv: null });
    } catch (err: unknown) {
      let message = "❌ Could not submit your CV.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setCvMsg(message);
    } finally {
      setSubmittingCv(false);
    }
  };

  const renderCardContent = (career: Career) => (
    <div className="d-flex flex-column h-100 justify-content-between">
      <div>
        <h5 className="career-title mb-1">{career.title}</h5>
        <span className="posting-date">
          {new Date(career.createdAt).toLocaleDateString()}
        </span>
        <div className="career-meta mt-2">
          {career.location && (
            <div>
              <strong>Location:</strong>{" "}
              <span className="meta-text">{career.location}</span>
            </div>
          )}
          {career.employmentType && (
            <div>
              <strong>Type:</strong>{" "}
              <span className="meta-text">{career.employmentType}</span>
            </div>
          )}
          {career.experienceLevel && (
            <div>
              <strong>Level:</strong>{" "}
              <span className="meta-text">{career.experienceLevel}</span>
            </div>
          )}
        </div>
        <p className="career-desc mt-2">
          {truncateDescription(career.description)}
        </p>
      </div>

      <div className="text-end mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/career/${career._id}`);
          }}
          className="btn-view"
        >
          View
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-5 careers-section">
      <div className="container">
        <h2 className="contact-title mb-4 text-center">
          Careers
          <div className="underline-gradient mx-auto mt-1"></div>
        </h2>

        {loading && <p className="text-center text-white">Loading jobs...</p>}

        {!loading && openJobs.length === 0 && (
          <div className="p-4 text-center rounded shadow mb-4 bg-gray">
            <h5>No open positions right now.</h5>
            <p>
              Send us your CV — we’ll contact you when a role matches your
              profile.
            </p>
          </div>
        )}

        {!loading && openJobs.length > 0 && (
          <>
            {/* Responsive Grid */}
            <div className="row justify-content-center gap-4 mb-4">
  {openJobs.map((career) => (
    <div key={career._id} className="career-card-col mb-4">
    <div
      className="career-card single_service p-3 rounded shadow h-100 d-flex flex-column justify-content-between cursor-pointer"
      onClick={() => router.push(`/career/${career._id}`)}
    >
      {renderCardContent(career)}
    </div>
  </div>
  
  ))}
</div>

          </>
        )}

        {/* CV Form */}
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="p-4 rounded shadow bg-gray">
              <h5 className="mb-2 text-center text-nav">
                Didn’t find a match?
              </h5>
              <p className="mb-4 text-center text-dark">
                Send us your CV — we’ll keep it on file and reach out when
                something fits.
              </p>
              <form
                onSubmit={handleCvSubmit}
                className="row g-3"
                encType="multipart/form-data"
              >
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Your Name"
                    value={cvForm.name}
                    onChange={(e) =>
                      setCvForm({ ...cvForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Your Email"
                    value={cvForm.email}
                    onChange={(e) =>
                      setCvForm({ ...cvForm, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Your Phone"
                    value={cvForm.phone}
                    onChange={(e) =>
                      setCvForm({ ...cvForm, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Your Profession"
                    value={cvForm.profession}
                    onChange={(e) =>
                      setCvForm({ ...cvForm, profession: e.target.value })
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
                      setCvForm({ ...cvForm, cv: e.target.files?.[0] || null })
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-career w-100"
                    disabled={submittingCv}
                  >
                    {submittingCv ? "Submitting..." : "Submit CV"}
                  </button>
                </div>
              </form>

              {submittingCv && (
                <div
                  style={{
                    marginTop: "20px",
                    width: "150px",
                    marginInline: "auto",
                  }}
                >
                  <Lottie
                    animationData={lootie}
                    loop
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
              )}
              {cvMsg && <p className="mt-3 text-center">{cvMsg}</p>}
            </div>
          </div>
        </div>
      </div>

      <style global>{`
        .careers-section {
          background-color: var(--gray-bg);
          min-height: 100vh;
          padding: 100px 20px;
        }

        .contact-title {
          font-size: clamp(2.25rem, 5vw, 4.5rem);
          font-weight: 700;
          font-family: var(--font-title);
          line-height: 1.3;
          position: relative;
          display: inline-block;
          color: var(--navbar-bg);
        }

        .underline-gradient {
          width: 120px;
          height: 4px;
          border-radius: 5px;
          background: linear-gradient(90deg, var(--navbar-bg) 0%, rgba(25,51,93,0.7) 50%, var(--accent-blue) 100%);
          animation: underlinePulse 2s infinite ease-in-out;
          margin-top: 0.5rem;
          transform-origin: center;
        }

        @keyframes underlinePulse {
          0% { transform: scaleX(0); opacity: 0.6; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0.6; }
        }

        .career-card.single_service {
          background-color: var(--gray-bg);
          border-radius: 12px;
          border: 1px solid transparent;
          box-shadow: 0 6px 18px rgba(25, 51, 93, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          color: var(--navbar-bg);
          height: 100%;
        }

        .career-card.single_service:hover {
          box-shadow: 0 10px 24px rgba(25, 51, 93, 0.2);
          border: 1px solid var(--accent-blue);
          cursor: pointer;
        }

        .btn-career {
          background-color: transparent !important;
          color: var(--navbar-bg) !important;
          border: 1px solid var(--navbar-bg) !important;
          transition: all 0.3s ease !important;
        }

        .btn-career:hover {
          background-color: var(--navbar-bg) !important;
          color: white !important;
        }

        .career-title {
          font-weight: 700;
          color: var(--navbar-bg);
        }

        .career-meta strong {
          font-weight: 700;
          color: var(--navbar-bg);
        }

        .career-meta .meta-text {
          font-weight: 400;
          color: #333;
        }

        .btn-view {
          padding: 0.5rem 1.2rem;
          border: 2px solid var(--navbar-bg);
          color: var(--navbar-bg);
          background-color: transparent;
          font-weight: 600;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .btn-view:hover {
          background-color: var(--navbar-bg);
          color: var(--gray-bg);
        }

        @media (max-width: 991px) {
          .btn-view {
            padding: 0.3rem 0.8rem;
            font-size: 0.85rem;
          }
        }
        /* Mobile: 1 column */
        .career-card-col {
          flex: 0 0 100%;
          max-width: 100%;
        }
        
        /* Tablet (iPad Mini & Air): 2 columns */
        @media (min-width: 768px) and (max-width: 1024px) {
          .career-card-col {
            flex: 0 0 48%;
            max-width: 48%;
          }
        }
        
        /* Desktop (iPad Pro 12.9 and bigger): 3 columns */
        @media (min-width: 1025px) {
          .career-card-col {
            flex: 0 0 31%;
            max-width: 31%;
          }
        }
        
        /* Row container flex */
        .row-careers {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2%;
        }
        
        
      `}</style>
    </section>
  );
};

export default CareersPage;
