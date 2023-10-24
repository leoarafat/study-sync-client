"use client";
import React from "react";
import Heading from "../../../app/utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "@/app/components/Admin/Sidebar/DashboardHeader";
import Sidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
// dark:bg-slate-900 bg-opacity-90  bg-white
type Props = {};

const Course = (props: Props) => {
  return (
    <div className="bg-slate-900 bg-opacity-90">
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
            <CreateCourse />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Course;
