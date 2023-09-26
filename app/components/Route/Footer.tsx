import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
      <footer>
        <div className="border border-[#0000000e] dark:border-[#ffffff1e]"></div>
        <br />
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-20px font-[600] text-black dark:text-white">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white font-[600]"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] text-black dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/courses"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Social Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UCHz6Sne9splmvm-q2w1_HWQ"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/shahriar_sajeeb_/"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.github.com/shahriarsajeeb"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Github
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
                Contact Info
              </h3>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Call Us: 1-885-665-2022
              </p>
              {/* Add more contact info here if needed */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
