"use client";
import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";
import React from "react";

const Page = ({ params }: any) => {
  return (
    <div className="dark:bg-slate-900 bg-opacity-90  bg-white">
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default Page;
