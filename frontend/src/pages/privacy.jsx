import React from 'react';
import Footer from '../components/footer.component';

const PrivacyPolicy = () => {
  return (
    <>
    <div className="min-h-screen bg-white-50 flex flex-col items-center py-8">
      <div className="max-w-3xl w-full px-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-black-800 mb-6">Privacy Policy</h1>
        
        <div className="text-white-700 space-y-4">
          <section>
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              Welcome to my resume project! This Privacy Policy explains how I handle any personal data you may provide while visiting this page. Please note this is a simple demo for my portfolio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Data Collection</h2>
            <p>
              I do not collect any personal information from users of this website. There are no forms or data tracking on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Cookies</h2>
            <p>
              Since this is a basic project, I do not use cookies or any tracking technologies on this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Third-Party Services</h2>
            <p>
              This page does not share or sell any personal information to third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Changes to this Policy</h2>
            <p>
              As this is part of my personal portfolio, I may update this Privacy Policy occasionally, but expect no major changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, feel free to reach out to me through the contact form on my resume page.
            </p>
          </section>
        </div>
      </div>
    </div>
</>
  );
};

export default PrivacyPolicy;
