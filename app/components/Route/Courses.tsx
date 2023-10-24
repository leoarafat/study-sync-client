import { useGetUsersAllCOursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading, error } = useGetUsersAllCOursesQuery({});

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.data);
  }, [data?.data]);

  return (
    <div className="bg-opacity-50 bg-gradient-to-b from-black to-gray-900">
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl text-white 800px:leading-[60px] font-[700] tracking-tight">
          Expand Your Career <span className="text-gradient">Opportunity</span>{" "}
          <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 xl:gap-[35px]  border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <>
                <CourseCard item={item} key={index} />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
