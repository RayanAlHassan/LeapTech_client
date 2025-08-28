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
      setSubmittingCv(true); // start loading
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
      setSubmittingCv(false); // stop loading
    }
  };

  const renderCardContent = (career: Career) => (
    <div style={{ position: "relative", height: "100%" }}>
      {/* Title & Date */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h5 className="career-title mb-0">{career.title}</h5>
        <span
          className="posting-date"
          style={{ fontSize: "0.85rem", color: "#555" }}
        >
          {new Date(career.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Meta Info */}
      <div
        className="career-meta"
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginBottom: "1rem",
        }}
      >
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

      {/* Description */}
      <p className="career-desc" style={{}}>
        {truncateDescription(career.description)}
      </p>

      {/* Fully independent View button at bottom-right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/career/${career._id}`);
        }}
        style={{
          all: "unset",
          position: "absolute",
          bottom: "15px",
          right: "15px",
          padding: "0.5rem 1.2rem",
          border: "2px solid var(--navbar-bg)",
          color: "var(--navbar-bg)",
          backgroundColor: "transparent",
          fontWeight: 600,
          borderRadius: "8px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          zIndex: 100,
          display: "inline-block",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = "var(--navbar-bg)";
          btn.style.color = "var(--gray-bg)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = "transparent";
          btn.style.color = "var(--navbar-bg)";
        }}
      >
        View
      </button>
    </div>
  );

  return (
    <section className="py-5 careers-section">
      <div className="container">
        {/* Title with gradient underline */}
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
            {/* Desktop Grid */}
            <div className="d-none d-lg-flex flex-wrap gap-4 justify-content-start mb-4">
              {openJobs.map((career) => (
                <div
                  key={career._id}
                  className="career-card single_service p-3 rounded shadow flex-fill cursor-pointer"
                  style={{ minWidth: "30%", maxWidth: "32%", height: "380px" }}
                  onClick={() => router.push(`/career/${career._id}`)} // make entire card clickable
                >
                  {renderCardContent(career)}
                </div>
              ))}
            </div>

            {/* Mobile / Tablet Swiper */}
            <div className="d-lg-none mb-4">
              <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={1.2}
                centeredSlides
                pagination={{ clickable: true }}
              >
                {openJobs.map((career) => (
                  <SwiperSlide key={career._id}>
                    <div
                      className="career-card single_service p-3 rounded shadow cursor-pointer mx-auto"
                      style={{ maxWidth: "90%", height: "380px" }}
                      onClick={() => router.push(`/career/${career._id}`)}
                    >
                      {renderCardContent(career)}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
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
                width: 100,
                marginInline: "auto",
              }}
            >
              <Lottie
                animationData={lootie}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
              {cvMsg && <p className="mt-3 text-center">{cvMsg}</p>}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Background */
        .careers-section {
          background-color: var(--gray-bg);
          min-height: 100vh;
          padding: 100px 20px;
        }

        /* Title & underline */
        .contact-title {
          font-size: clamp(2.25rem, 5vw, 4.5rem);
          font-weight: 700;
          font-family: var(--font-title);
          line-height: 1.3;
          position: relative;
          display: inline-block;
          margin-bottom: 2rem;
          color: var(--navbar-bg);
        }

        .underline-gradient {
          width: 120px;
          height: 4px;
          border-radius: 5px;
          background: linear-gradient(
            90deg,
            var(--navbar-bg) 0%,
            rgba(25, 51, 93, 0.7) 50%,
            var(--accent-blue) 100%
          );
          animation: underlinePulse 2s infinite ease-in-out;
          margin-top: 0.5rem;
          transform-origin: center;
        }

        @keyframes underlinePulse {
          0% {
            transform: scaleX(0);
            opacity: 0.6;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0);
            opacity: 0.6;
          }
        }

        /* Card hover effect: only scale, no color change */
        .career-card.single_service {
          background-color: var(--gray-bg);
          border-radius: 12px;
          border: 1px solid transparent;
          box-shadow: 0 6px 18px rgba(25, 51, 93, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          cursor: default; /* remove pointer */
          color: var(--navbar-bg);
        }
        .career-card.single_service:hover {
          box-shadow: 0 10px 24px rgba(25, 51, 93, 0.2);
          border: 1px solid var(--accent-blue);
          cursor: pointer;
        }

        /* Button view */
        /* your global CSS file */
        .btn-career {
          background-color: transparent !important; /* main color */
          color: var(--navbar-bg) !important; /* force white text */
          border: 1px solid var(--navbar-bg) !important;
          transition: all 0.3s ease !important;
        }

        .btn-career:hover {
          background-color: var(--navbar-bg) !important; /* darker shade */
          color: white !important;
        }
        .career-title {
          font-weight: 700;
          color: var(--navbar-bg);
        }
        .career-meta strong {
          font-weight: 700; /* bold labels */
          color: var(--navbar-bg);
        }
        .career-meta .meta-text {
          font-weight: 400; /* regular text after colon */
          color: #333;
        }
      `}</style>
    </section>
  );
};

export default CareersPage;
