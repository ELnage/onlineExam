"use client";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { signIn } from "next-auth/react";
import {useState  } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

export default function LoginForm() {
  const [loginError, setLoginError] = useState("")
  const route = useRouter()
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });

          if (result?.error) {
            setLoginError(result.error);
          } else {
              route.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-[35%] flex flex-col gap-6">
            <p className="font-semibold text-lg">Sign in</p>

            <Field
              type="text"
              name="email"
              className="w-full shadow-lg border-2 p-2 rounded-lg"
              placeholder="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-md"
            />

            <Field
              type="password"
              name="password"
              className="w-full shadow-lg border-2 p-2 rounded-lg"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-md"
            />
              {loginError && <p className="text-red-500 text-md">{loginError}</p>}
            <button
              type="submit"
              className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
              disabled={isSubmitting}
            >
              Sign in
            </button>
          </Form>
        )}
      </Formik>
          <Link href="/forgetpassword" className="text-[#122D9C] font-medium cursor-pointer" >Forgot Password</Link>
      <div className="flex gap-3 items-center">
        <div className="divider h-[1px] bg-[#E7E7E7] w-12"></div>
        <p>or Continue with</p>
        <div className="divider h-[1px] bg-[#E7E7E7] w-12"></div>
      </div>

      <div className="social-login flex gap-4">
        <div className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={20} height={20} alt="google" src={"/Vector.png"} />
        </div>
        <div
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer"
        >
          <Image width={20} height={20} alt="google" src={"/Logo Google.png"} />
        </div>
      </div>
    </div>
  );
}
