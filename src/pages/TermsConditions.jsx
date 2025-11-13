import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white flex flex-col items-center py-10 px-4">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-4">
          Terms & Conditions 🍔
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Welcome to <strong>FoodLovers Network</strong>!  
          By accessing or using our platform, you agree to the following terms and conditions.
        </p>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              1️⃣ Acceptance of Terms
            </h2>
            <p>
              By creating an account or using our website and mobile app, you agree
              to comply with these Terms & Conditions. If you do not agree, please
              discontinue using our services immediately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              2️⃣ User Responsibilities
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account information and for all activities under your account.
              You agree not to post misleading, offensive, or harmful content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              3️⃣ Content Ownership
            </h2>
            <p>
              All content you create (such as reviews, photos, and ratings) remains
              your property, but you grant FoodLovers Network a non-exclusive,
              royalty-free license to display and share it on our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              4️⃣ Prohibited Activities
            </h2>
            <p>
              You agree not to misuse our platform for illegal purposes, spam,
              fake reviews, or attempts to harm other users or businesses.
              We reserve the right to suspend or remove any violating accounts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              5️⃣ Service Modifications
            </h2>
            <p>
              FoodLovers Network reserves the right to modify, suspend, or discontinue
              any part of the platform at any time, with or without notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              6️⃣ Limitation of Liability
            </h2>
            <p>
              We strive to provide accurate information, but we are not liable for
              any loss or damage resulting from the use or inability to use our platform,
              including user-generated content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              7️⃣ Termination
            </h2>
            <p>
              We may suspend or terminate your access if you violate these terms
              or engage in behavior harmful to our community.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              8️⃣ Governing Law
            </h2>
            <p>
              These Terms & Conditions are governed by and interpreted under
              the laws of your country of residence.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              9️⃣ Changes to These Terms
            </h2>
            <p>
              We may update these Terms & Conditions periodically. Continued use of
              our services means you accept any future changes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              🔟 Contact Us
            </h2>
            <p>
              For questions or concerns about these Terms, please reach out to us at:  
              📧 <a href="mailto:support@foodloversnetwork.com" className="text-orange-500 hover:underline">
                support@foodloversnetwork.com
              </a>
            </p>
          </div>
        </section>

        <footer className="mt-10 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} FoodLovers Network | All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;