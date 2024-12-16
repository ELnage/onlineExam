"use client";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegisterForm() {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "First Name must only contain letters")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Last Name must only contain letters")
      .required("Last Name is required"),
    username: Yup.string()
      .min(3, "User Name must be at least 3 characters")
      .required("User Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone must only contain numbers")
      .required("Phone is required"),
  });

  const handleSubmit = async (values: any) => {
    console.log("Form Values:", values);

    let response = await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", values)
    console.log(response.data);
    
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          rePassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-[35%] flex flex-col gap-6">
            <p className="font-semibold text-lg">Sign Up</p>

            <div>
              <Field
                name="firstName"
                type="text"
                placeholder="First Name"
                className="w-full shadow-lg border-2 p-2 rounded-lg"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="w-full shadow-lg border-2 p-2 rounded-lg"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="username"
                type="text"
                placeholder="User Name"
                className="w-full shadow-lg border-2 p-2 rounded-lg"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full shadow-lg border-2 p-2 rounded-lg"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Field
                name="phone"
                type="phone"
                placeholder="phone"
                className="w-full shadow-lg border-2 p-2 rounded-lg"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full shadow-lg border-2 p-2 rounded-lg"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="rePassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full shadow-lg border-2 p-2 rounded-lg"
              />
              <ErrorMessage
                name="rePassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <p className="text-sm text-center tracking-widest">
              Already have an account?{" "}
              <span className="text-[#4461F2]">Login</span>
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
            >
              Create Account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
