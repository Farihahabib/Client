import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white flex flex-col items-center py-10 px-4">
      <div className="max-w-5xl bg-white shadow-lg rounded-2xl p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-3">
          About Us 🍽️
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Welcome to <strong>FoodLovers Network</strong> — where food brings people together!
        </p>

        {/* Section 1: Story */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed">
            FoodLovers Network was born from a simple idea — to connect food
            enthusiasts, home cooks, and restaurant lovers on one friendly platform.
            From discovering local dishes to sharing honest reviews, we make
            every bite count. Whether you’re hunting for hidden gems or showing
            off your favorite meal, FoodLovers is your go-to food companion.
          </p>
        </section>

        {/* Section 2: Mission */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to build a trusted community that celebrates food,
            culture, and creativity. We empower users to explore restaurants,
            share experiences, and connect with people who share their taste for
            adventure — one plate at a time.
          </p>
        </section>

        {/* Section 3: What We Offer */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">
            What We Offer
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>🍕 Honest food reviews from real users</li>
            <li>🍜 Discover trending dishes and hidden gems nearby</li>
            <li>🍰 Save favorites and build your food diary</li>
            <li>🍔 Connect with foodies, chefs, and restaurant owners</li>
            <li>🍹 Celebrate the joy of eating and sharing</li>
          </ul>
        </section>

        {/* Section 4: Team */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">
            Meet the Team
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We’re a passionate team of developers, designers, and food lovers
            working together to create something meaningful.  
            Every feature, every review, and every flavor on this platform is crafted
            with love — because we believe good food connects the world.
          </p>
        </section>

        {/* Section 5: Join Us */}
        <section className="text-center">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">
            Join the FoodLovers Family ❤️
          </h2>
          <p className="text-gray-700 mb-4">
            Become a part of our growing community.  
            Share your taste, discover new dishes, and spread the love of food.
          </p>
          <a
            href="/contact"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Contact Us
          </a>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} FoodLovers Network | All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;