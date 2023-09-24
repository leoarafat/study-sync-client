"use client";

import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import DashboardHeader from "@/app/components/Admin/Sidebar/DashboardHeader";
import DashboardHero from "@/app/components/Admin/Sidebar/DashboardHero";

import AllUsers from "@/app/components/Admin/Users/AllUsers";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="dark:bg-slate-900 bg-opacity-90  bg-white">
      {/* <AdminProtected> */}
      <Heading
        title="StudySync - Admin"
        description="StudySync is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <AllUsers />
        </div>
      </div>
      {/* </AdminProtected> */}
    </div>
  );
};

export default page;
