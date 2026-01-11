import { h } from 'preact';
import MyContainer from '../Components/MyContainer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-10">
      <MyContainer>
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-[#FF4500] text-center mb-3">
            About Us 🍽️
          </h1>
          <p className="text-gray-600 text-center mb-8 text-lg">
            Welcome to <strong className="text-gray-900">FoodLovers Network</strong> — where food brings people together!
          </p>

          {/* Section 1: Story */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#FF4500] mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              FoodLovers Network was born from a simple idea — to connect food
              enthusiasts, home cooks, and restaurant lovers on one friendly platform.
              From discovering local dishes to sharing honest reviews, we make
              every bite count. Whether you're hunting for hidden gems or showing
              off your favorite meal, FoodLovers is your go-to food companion.
            </p>
          </section>

          {/* Section 2: Mission */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#FF4500] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is to build a trusted community that celebrates food,
              culture, and creativity. We empower users to explore restaurants,
              share experiences, and connect with people who share their taste for
              adventure — one plate at a time.
            </p>
          </section>

          {/* Section 3: What We Offer */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#FF4500] mb-4">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🍕 Honest Reviews</h3>
                <p className="text-gray-600">Real food reviews from authentic users</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🍜 Discover Gems</h3>
                <p className="text-gray-600">Find trending dishes and hidden local spots</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🍰 Save Favorites</h3>
                <p className="text-gray-600">Build your personal food diary</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🍔 Connect</h3>
                <p className="text-gray-600">Meet foodies, chefs, and restaurant owners</p>
              </div>
            </div>
          </section>

          {/* Section 4: Team */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#FF4500] mb-4">
              Meet the Team
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              We're a passionate team of developers, designers, and food lovers
              working together to create something meaningful. Every feature, every review, 
              and every flavor on this platform is crafted with love — because we believe 
              good food connects the world.
            </p>
          </section>

          {/* Section 5: Join Us */}
          <section className="text-center bg-orange-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-[#FF4500] mb-4">
              Join the FoodLovers Family ❤️
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Become a part of our growing community. Share your taste, discover new dishes, 
              and spread the love of food.
            </p>
            <a
              href="/contact"
              className="btn px-8 py-3 text-lg"
            >
              Contact Us
            </a>
          </section>

          {/* Footer */}
          <footer className="mt-10 text-gray-500 text-sm text-center border-t border-gray-200 pt-6">
            © {new Date().getFullYear()} FoodLovers Network | All Rights Reserved.
          </footer>
        </div>
      </MyContainer>
    </div>
  );
};

export default AboutUs;