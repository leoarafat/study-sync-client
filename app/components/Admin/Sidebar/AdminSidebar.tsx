/* eslint-disable @next/next/no-img-element */
"use Client";
import React, { FC, useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css"; //
import { Box, Typography, IconButton } from "@mui/material";
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
  LogoutOutlined,
} from "@mui/icons-material";
import avatarDefault from "../../../../public/assests//user2.png";

import { useTheme } from "next-themes";
import Link from "next/link";

interface ItemProps {
  title: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
  isCollapsed: boolean;
}

const Item: FC<ItemProps> = ({
  title,

  icon,
  selected,
  setSelected,
  isCollapsed,
}) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
    >
      {!isCollapsed && (
        <Typography className="text-[16px] font-Poppins">{title}</Typography>
      )}
    </MenuItem>
  );
};

const AdminSidebar: FC = () => {
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
      className="dark:bg-slate-900 bg-opacity-90  bg-white"
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
          style={{ listStyleType: "none" }}
        >
          {!isCollapsed && (
            <Box
              justifyContent="space-between"
              ml="15px"
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
              }}
            >
              <Link style={{ textDecoration: "none" }} href="/">
                <h3
                  className={`text-[25px] font-Poppins uppercase ${
                    theme === "dark" ? "text-white" : "text-white"
                  }`}
                >
                  StudySync
                </h3>
              </Link>
              <IconButton
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="inline-block"
              >
                <ArrowBackIosIcon
                  style={{ color: theme === "dark" ? "white" : "white" }}
                />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={user?.avatar ? user.avatar.url : avatarDefault}
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
                className={`text-[20px] text-black dark:text-[#ffffffc1]  ${
                  theme === "dark" ? "text-white" : "text-white"
                }`}
                sx={{ m: "10px 0 0 0" }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{ m: "10px 0 0 0" }}
                className={`text-[20px] text-black dark:text-[#ffffffc1]  ${
                  theme === "dark" ? "text-white" : "text-white"
                }`}
              >
                - {user?.role}
              </Typography>
            </Box>
          </Box>
        )}
        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Link href={"/admin"}>
            {" "}
            <Item
              title="Dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/users"}>
            {" "}
            <Item
              title="Users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/invoices"}>
            {" "}
            <Item
              title="Invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/create-course"}>
            {" "}
            <Item
              title="Create Course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/courses"}>
            {" "}
            <Item
              title="Live Courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/hero"}>
            {" "}
            <Item
              title="Hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/faq"}>
            {" "}
            <Item
              title="FAQ"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/categories"}>
            {" "}
            <Item
              title="Categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/team"}>
            {" "}
            <Item
              title="Manage Team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/courses-analytics"}>
            {" "}
            <Item
              title="Courses Analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/orders-analytics"}>
            {" "}
            <Item
              title="Orders Analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Link href={"/admin/users-analytics"}>
            {" "}
            <Item
              title="Users Analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Link>
          <Item
            title="Logout"
            icon={<ExitToAppIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
