"use client";
import React from "react";
import DashboardHeader from "@/app/components/Admin/Sidebar/DashboardHeader";
import Sidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import EditCOurse from "@/app/components/Admin/Course/EditCOurse";
import Heading from "@/app/utils/Heading";
import EditFaq from "@/app/components/Admin/Customization/EditFaq";
import EditCategories from "@/app/components/Admin/Customization/EditCategories";
import CourseAnalytics from "@/app/components/Admin/Analytics/CourseAnalytics";
import UsersAnalytics from "@/app/components/Admin/Analytics/UsersAnalytics";
import OrdersAnalytics from "@/app/components/Admin/Analytics/OrdersAnalytics";

type Props = {};

const Page = () => {
  return (
    <div className="dark:bg-slate-900 bg-opacity-90  bg-white">
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
          <OrdersAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Page;
