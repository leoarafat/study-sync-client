"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import userImage from "../../public/assests/user2.png";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);

  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  console.log(data, "Social data");
  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (isSuccess) {
      toast.success("Login Successfully");
    }
  }, [data, user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative mb-[95px]">
      <div
        className={`${
          active
            ? " dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black"
            : "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black"
        } fixed top-0 left-0 w-full z-80 border-b shadow-xl transition duration-500`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href="/"
                className={`text-[25px] font-Poppins font-1580 text-black ${
                  active ? "dark:text-white" : "dark:text-white"
                }`}
              >
                StudySync
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* This is only for mobile */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className={`cursor-pointer ${
                    active ? "dark:text-white" : "dark:text-white"
                  }`}
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <>
                  <Link href={`/profile`}>
                    {" "}
                    <Image
                      className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      src={user?.avatar ? user?.avatar : userImage}
                      alt=""
                    />
                  </Link>
                </>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className={`hidden 800px:block cursor-pointer text-black dark:text-white ${
                    active ? "dark:text-white" : "dark:text-white"
                  }`}
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* Mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="text-center w-[70%] fixed z-[1999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <div className="flex flex-col items-center">
                {/* Add a flex container */}
                <NavItems activeItem={activeItem} isMobile={true} />
                <HiOutlineUserCircle
                  size={25}
                  className={`cursor-pointer ml-5 my-2 ${
                    active ? "dark:text-white" : "text-black"
                  }`}
                  onClick={() => setOpen(true)}
                />
              </div>
              <br />
              <br />
              <p
                className={`text-[16px] px-2 pl-5 ${
                  active ? "dark:text-white" : "text-black"
                }`}
              >
                Copyright &copy; 2023 StudySync
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}
      {route === "Sign-Up" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}

      {route === "Verification" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};

export default Header;
