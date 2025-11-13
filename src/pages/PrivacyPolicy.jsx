import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">
        🍔 Privacy Policy — FoodLovers Network
      </h1>

      <p className="text-sm text-gray-500 text-center mb-10">
        <strong>Last Updated:</strong> November 12, 2025
      </p>

      <p className="mb-6">
        Welcome to <strong>FoodLovers Network!</strong> Your privacy is important
        to us. This Privacy Policy explains how we collect, use, and protect your
        personal information when you use our website, mobile app, and related
        services (collectively, the “Platform”).
      </p>

      {/* 1️⃣ Information We Collect */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1️⃣ Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, profile
            photo, and contact details when you register or log in.
          </li>
          <li>
            <strong>Usage Data:</strong> Details of how you use our platform —
            such as viewed restaurants, submitted reviews, ratings, and favorites.
          </li>
          <li>
            <strong>Device Information:</strong> IP address, browser type, and
            device identifiers for analytics and security purposes.
          </li>
          <li>
            <strong>Cookies & Tracking:</strong> We use cookies to enhance your
            browsing experience and remember your preferences.
          </li>
        </ul>
      </section>

      {/* 2️⃣ How We Use Your Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2️⃣ How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create and manage your account.</li>
          <li>Display your reviews, favorites, and food posts.</li>
          <li>Improve our services and user experience.</li>
          <li>Send important updates, promotional offers, or alerts.</li>
          <li>Prevent fraud and ensure compliance with our Terms of Service.</li>
        </ul>
      </section>

      {/* 3️⃣ How We Share Your Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3️⃣ How We Share Your Information</h2>
        <p>
          We <strong>do not sell</strong> your personal data. However, we may
          share limited information with:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            <strong>Service Providers</strong> (e.g., hosting, analytics, payment
            processors).
          </li>
          <li>
            <strong>Legal Authorities</strong> if required by law.
          </li>
          <li>
            <strong>Other Users</strong> — only data you choose to make public
            (like reviews or profile name).
          </li>
        </ul>
      </section>

      {/* 4️⃣ Data Security */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4️⃣ Data Security</h2>
        <p>
          We use industry-standard security measures to protect your data from
          unauthorized access, loss, or misuse. However, no system is 100% secure
          — please keep your login information private.
        </p>
      </section>

      {/* 5️⃣ Your Rights & Choices */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5️⃣ Your Rights & Choices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access, edit, or delete your personal information anytime.</li>
          <li>Opt-out of marketing emails by clicking “unsubscribe.”</li>
          <li>
            Request data deletion by contacting our support team.
          </li>
        </ul>
      </section>

      {/* 6️⃣ Children’s Privacy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6️⃣ Children’s Privacy</h2>
        <p>
          FoodLovers Network is intended for users aged <strong>13 and above</strong>.
          We do not knowingly collect data from children under 13.
        </p>
      </section>

      {/* 7️⃣ Updates */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7️⃣ Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we’ll
          update the “Last Updated” date at the top of this page.
        </p>
      </section>

      {/* 8️⃣ Contact */}
      <section>
        <h2 className="text-xl font-semibold mb-3">8️⃣ Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or your personal
          data, please contact us:
        </p>
        <p className="mt-2 font-medium text-blue-600">
          📧 support@foodloversnetwork.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
