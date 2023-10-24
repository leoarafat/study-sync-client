/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <div className="bg-opacity-50 bg-gradient-to-b from-gray-900 to-black py-12 px-4 1000px:flex flex-col md:flex-row items-center">
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
        <h1 className="text-2xl md:text-4xl font-semibold text-white mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Unlock Your Learning Potential with StudySync
        </h1>
        <p className="text-white text-base md:text-lg mb-6 animate__animated animate__fadeIn animate__delay-2s">
          ive into a world of endless educational possibilities with StudySync!
          Our innovative e-learning platform is designed to empower students and
          educators alike. Whether you're a student striving for academic
          excellence or an educator dedicated to fostering a love for learning,
          StudySync provides the tools, resources, and support you need. Explore
          interactive lessons, engaging content, and a collaborative community
          that fosters growth and achievement. Join us on a journey of
          discovery, where knowledge knows no bounds, and your success is our
          mission. Welcome to StudySync - where learning comes to life!
        </p>
        <div className="flex flex-col md:flex-row items-center md:space-x-4 animate__animated animate__fadeIn animate__delay-3s">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg w-full md:w-2/3 bg-white text-gray-800 focus:outline-none mb-2 md:mb-0"
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-300 w-full md:w-1/3 lg:w-1/4"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
