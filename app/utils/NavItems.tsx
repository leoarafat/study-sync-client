import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  { name: "Home", url: "/" },
  // { name: "Profile", url: "/profile" },
  { name: "Courses", url: "/courses" },
  // { name: "About", url: "/about" },
  // { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
  // { name: "Login", url: "/login" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden md:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${
                  activeItem === index ? "text-[#37839a]" : "text-white "
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>

      {isMobile && (
        <div className="flex flex-col items-center 800px:hidden mt-5">
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link className="py-2" key={index} href="/" passHref>
                <span
                  className={`${
                    activeItem === index ? "text-[#37839a] " : "text-white "
                  } text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
