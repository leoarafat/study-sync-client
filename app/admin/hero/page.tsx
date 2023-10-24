"use client";
import React from "react";
import DashboardHeader from "@/app/components/Admin/Sidebar/DashboardHeader";
import Sidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import EditHero from "@/app/components/Admin/Customization/EditHero";
import AdminProtected from "@/app/hooks/adminProtected";

type Props = {};

const Hero = ({ params }: any) => {
  const id = params?.id;
  return (
    <div className="bg-slate-900 bg-opacity-90 ">
      <AdminProtected>
        {" "}
        <Heading
          title="StudySync - Admin"
          description="StudySync is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <Sidebar />
          </div>
          <div className="w-[85%]  ">
            <DashboardHeader />
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Hero;
