/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const HeroSection = () => {
  return (
    <div className="dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black py-12 px-4 1000px:flex flex-col md:flex-row items-center">
      {/* Left Side (Image) */}
      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
        <img
          src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
          alt="Hero Image"
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>

      {/* Right Side (Content) */}
      <div className="w-full md:w-1/2 px-4">
        <h1 className="text-2xl md:text-4xl font-semibold text-black dark:text-white mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to Your App
        </h1>
        <p className="text-black dark:text-white text-base md:text-lg mb-6 animate__animated animate__fadeIn animate__delay-2s">
          Your app's tagline or description goes here. Make it catchy!
        </p>
        <div className="flex flex-col md:flex-row items-center md:space-x-4 animate__animated animate__fadeIn animate__delay-3s">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg w-full md:w-2/3 bg-gray-700 dark:bg-white text-white dark:text-gray-800 focus:outline-none mb-2 md:mb-0"
          />
          <button className="px-4 py-2 rounded-lg bg-green-500 text-black dark:text-white hover:bg-green-600 transition duration-300 w-full md:w-1/3 lg:w-1/4">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
