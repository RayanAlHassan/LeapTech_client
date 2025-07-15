import React from 'react';
import StoryAnimation from '../Animation/StoryAnimation';

const OurStorySection: React.FC = () => {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        {/* Text Column */}
        <div className="col-md-6 bounce-down">
          <h2 className="mb-4">Our Story</h2>
          <p>
            Leap Tech has been instrumental in transforming the digital landscape for businesses
            of all sizes, from ambitious startups to established enterprises. By delivering tailored
            Software-as-a-Service (SaaS) and Platform-as-a-Service (PaaS) solutions, the
            company has empowered local businesses to optimize their operations, streamline
            workflows, and enhance customer experiences. As a result, clients have witnessed
            significant revenue growth, improved efficiency, and strengthened brand loyalty.
          </p>
          <p>
            With a commitment to innovation and excellence, Leap Tech has not only enabled
            companies to thrive in a competitive market but has also set new benchmarks for
            superior customer service, fostering lasting relationships between businesses and
            their audiences.
          </p>
        </div>

        {/* Animation Column */}
        <div className="col-md-6 d-flex justify-content-center bounce-down">
          <StoryAnimation />
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
