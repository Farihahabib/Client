import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can integrate your backend API here
    console.log("Form Data:", formData);

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Contact Us 🍽️
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Have questions, feedback, or partnership ideas?  
          We’d love to hear from you!
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              ✅ Message Sent Successfully!
            </h2>
            <p className="text-gray-600">
              Thanks for reaching out. We’ll get back to you soon!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
            >
              Send Another Message
            </button>
          </div>
        )}
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} FoodLovers Network | All rights reserved.
      </footer>
    </div>
  );
};

export default ContactUs;