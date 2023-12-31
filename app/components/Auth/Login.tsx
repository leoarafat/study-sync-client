/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      setOpen(false);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [isSuccess, error, setOpen]);
  const forMik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      const data = { email, password };
      await login(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = forMik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with StudySync</h1>
      <form onSubmit={handleSubmit}>
        {/* <label className={`${styles.label}`} htmlFor="email">
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            id="password"
            onChange={handleChange}
            className={`${
              errors.password && touched.password ? "border-red-500" : ""
            } ${styles.input}`}
            placeholder="password!@%"
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute dark:text-white bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute dark:text-white bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Login"}
            className={`${styles.button}`}
          />
        </div>
        <br /> */}
        <h5 className="text-center pt-4 font-Poppins text-[20px]text-white">
          Join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            onClick={() => signIn("google")}
            size={30}
            className="cursor-pointer mr-2"
          />
          <AiFillGithub
            onClick={() => signIn("github")}
            size={30}
            className="cursor-pointer ml-2"
          />
        </div>
        <h5 className="text-center dark:text-white pt-4 font-Poppins text-[14px]">
          Don't have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
