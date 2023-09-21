/* eslint-disable @next/next/no-img-element */
"use Client";
import React, { FC, useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css"; //
import { Box, Typography, IconButton, Link } from "@mui/material";
import { useSelector } from "react-redux";
import {
  HomeOutlined as HomeOutlinedIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBackIos as ArrowBackIosIcon,
  PeopleOutlined as PeopleOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  BarChartOutlined as BarChartOutlinedIcon,
  MapOutlined as MapOutlinedIcon,
  Groups as GroupsIcon,
  OndemandVideo as OndemandVideoIcon,
  VideoCall as VideoCallIcon,
  Web as WebIcon,
  Quiz as QuizIcon,
  Wysiwyg as WysiwygIcon,
  ManageHistory as ManageHistoryIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import avatarDefault from "../../../../public/assests//user2.png";

import { useTheme } from "next-themes";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
    >
      <Typography className="text-[16px] font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "&.pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },
        "&.pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "&.pro-inner-item:hover": { color: "#868dfb !important" },
        "& pro-menu-item.active": { color: "#6870fa !important" },
        "&.pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "&.pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Link href="/">
                <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                  StudySync
                </h3>
              </Link>
              <IconButton
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="inline-block"
              >
                <ArrowBackIosIcon className="text-black" />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={user.avatar ? user.avatar.url : avatarDefault}
                alt="profile-user"
                width={100}
                height={100}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  border: "3px solid #5b6fe6",
                }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h4"
                className="text-[20px] text-black dark:text-[#ffffffc1]"
                sx={{ m: "10px 0 0 0" }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{ m: "10px 0 0 0" }}
                className="text-[20px] text-black dark:text-[#ffffffc1] capitalize"
              >
                - {user?.role}
              </Typography>
            </Box>
          </Box>
        )}
        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Dashboard"
            to="/admin"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Users"
            to="/admin/users"
            icon={<GroupsIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Invoices"
            to="/admin/invoices"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Create Course"
            to="/admin/create-course"
            icon={<VideoCallIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Live Courses"
            to="/admin/courses"
            icon={<OndemandVideoIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Hero"
            to="/admin/hero"
            icon={<WebIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="FAQ"
            to="/faq"
            icon={<QuizIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Categories"
            to="/admin/categories"
            icon={<WysiwygIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Manage Team"
            to="/admin/team"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Courses Analytics"
            to="/admin/courses-analytics"
            icon={<BarChartOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Orders Analytics"
            to="/admin/orders-analytics"
            icon={<MapOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Users Analytics"
            to="/admin/users-analytics"
            icon={<ManageHistoryIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
