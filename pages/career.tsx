import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
    

      {/* Add padding top equal to navbar height (e.g., 80px) */}
      <main className="container pt-5 " style={{  }}>
        <section className="mb-5">
          <h2 className="text-primary fw-bold mb-3">Section 1</h2>
          <p>This is the first section content.</p>
        </section>

        <section className="mb-5">
          <h2 className="text-primary fw-bold mb-3">Section 2</h2>
          <p>This is the second section content.</p>
        </section>

        <section className="mb-5">
          <h2 className="text-primary fw-bold mb-3">Section 3</h2>
          <p>This is the third section content.</p>
        </section>
      </main>
    </>
  );
}
