"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Test from "./components/Test";

interface props {}
const Page: FC<props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <Heading
        title="StudySync"
        description="StudySync is learning platform"
        keywords="Programming, MERN, Redux"
      />
      <Header open={open} activeItem={activeItem} setOpen={setOpen} />
      <Hero />
      {/* <Test /> */}
    </div>
  );
};

export default Page;
