import Heading from "@/app/utils/Heading";
import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useState } from "react";
import CourseContentMedia from "./CourseContentMedia";
import Loader from "../Loader/Loader";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = { id: string; user: any };

const CourseContent: FC<Props> = ({ id, user }) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data, isLoading, refetch } = useGetCourseContentQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data?.data[activeVideo]?.title}
              description="StudySync"
              keywords={data?.data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data?.data}
                id={id}
                user={user}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                data={data?.data}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
