"use client";
import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";
import React from "react";

const Page = ({ params }: any) => {
  return (
    <div className="bg-slate-900 bg-opacity-90">
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default Page;
