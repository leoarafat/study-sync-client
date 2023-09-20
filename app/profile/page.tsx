"use client";

import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profiles from "../components/Profile/Profile";
import { useSelector } from "react-redux";

type Props = {};

const Profile = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const { user } = useSelector((state: any) => state.auth);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} profile`}
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
        <Profiles user={user} />
      </Protected>
    </div>
  );
};

export default Profile;
