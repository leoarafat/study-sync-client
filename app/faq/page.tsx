"use client";
import React, { useState } from "react";
import Faq from "../components/Route/Faq";
import Header from "../components/Header";

const FaqPages = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      <div className="bg-opacity-50 bg-gradient-to-b from-gray-900 to-black h-[100vh]">
        <Faq />
      </div>
    </>
  );
};

export default FaqPages;
