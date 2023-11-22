"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Course/Reviews";
import Faq from "./components/Route/Faq";
import Footer from "./components/Route/Footer";
import Factors from "./components/ui/Factors";
import Technology from "./components/ui/Technology";

interface props {}
const Page: FC<props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="StudySync"
        description="StudySync is learning platform"
        keywords="Programming, MERN, Redux"
      />
      <Header
        open={open}
        activeItem={activeItem}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Factors />
      <Technology />
      <Reviews />
      <Faq />
      <Footer />
    </div>
  );
};

export default Page;
