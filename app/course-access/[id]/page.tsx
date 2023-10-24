"use client";
import CourseContent from "@/app/components/Course/CourseContent";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: any;
};

const Pages = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data?.data?.courses.find(
        (item: any) => item._id === id
      );

      if (!isPurchased) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data, error, id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-slate-900 bg-opacity-90">
          <CourseContent id={id} user={data?.data} />
        </div>
      )}
    </>
  );
};

export default Pages;
