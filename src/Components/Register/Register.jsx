import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Register() {
  const [isloading, setIsloading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let [sucessMsg, setSucessMsg] = useState("");
  const navigate = useNavigate();

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      },
      onSubmit: register,
      validationSchema: Yup.object({
        name: Yup.string()
          .required("Name is requrie")
          .min(3, "Name length must be at least 3 chars")
          .max(20, "Name length must be at less then 20 chars"),
        email: Yup.string()
          .required("Email is requrie")
          .email("Enter valid email"),
        password: Yup.string()
          .required("Password is requrie")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Password must be at least 8 characters long and include at least one letter, one number, and one special character (e.g., @, $, !, %, , #, ?, &)."
          ),
        rePassword: Yup.string()
          .required("rePassword is requrie")
          .oneOf([Yup.ref("password")], "Password and Repassword not matched"),
        phone: Yup.string()
          .required("Phone is requrie")
          .matches(/^\+?\d{10,15}$/, "Phone not valid"),
      }),
    });


  async function register() {
    setErrorMsg("");
    setSucessMsg("");
    setIsloading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        setIsloading(false);
        setSucessMsg(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch(({ response }) => {
        setIsloading(false);

        setErrorMsg(response.data.message);
      });
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className=" flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-green-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center ">
          <h1 className="text-xl font-bold text-center text-white-700 dark:text-white-200 mb-8">
            Welcome to FreshCart
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="name"
                className="text-sm text-white-700 dark:text-white-200 mr-2"
              >
                Name:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                type="text"
                id="name"
                name="name"
                className="w-full px-3 dark:text-white-200 dark:bg-green-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.name && errors.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="email"
                className="text-sm text-white-700 dark:text-white-200 mr-2"
              >
                Email:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                type="email"
                id="email"
                name="email"
                className="w-full px-3 dark:text-white-200 dark:bg-green-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="password"
                className="text-sm text-white-700 dark:text-white-200 mr-2"
              >
                Password:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                type="password"
                id="password"
                name="password"
                className="w-full px-3 dark:text-white-200 dark:bg-green-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.password && errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-white-700 dark:text-white-200 mr-2"
              >
                Confirm Password:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rePassword}
                type="password"
                id="confirmPassword"
                name="rePassword"
                className="w-full px-3 dark:text-white-200 dark:bg-green-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.rePassword && errors.rePassword && (
                <p className="text-red-500">{errors.rePassword}</p>
              )}
            </div>
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="phone"
                className="text-sm text-white-700 dark:text-white-200 mr-2"
              >
                Phone Number:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 dark:text-white-200 dark:bg-green-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500">{errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-main hover:bg-sec hover:text-main text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-green-400"
              disabled={isloading}
            >
              Register {isloading && <i className="fas fa-spinner fa-spin"></i>}
            </button>
            {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
            {sucessMsg && (
              <p className="text-green-500 text-center">{sucessMsg}</p>
            )}
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-white-500 dark:text-white-300">
              Already have an account?{" "}
            </span>
            <Link to={"/login"} className="text-main hover:text-four">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
