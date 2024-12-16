"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const route = useRouter()
  const handleSubmit = async (values: any) => {
    console.log("Form Values:", values);

    let response = await axios.post("https://exam.elevateegy.com/api/v1/auth/forgotPassword", values)
    console.log(response.data);
    if(response.data.message == "success"){
      setSuccessMessage("OTP send to your email successfully")
      setTimeout(() => {
        route.push("/VerifyResetCode")
      } , 1000)
    } else {
      setErrorMessage(response.data.message)
    }
  
    
  };
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-[35%] flex flex-col gap-6">
            <p className="font-semibold text-lg">Forgot Password</p>

            <Field
              type="text"
              name="email"
              className="w-full shadow-lg border-2 p-2 rounded-lg"
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-md"
            />

            {errorMessage && <p className="text-red-500 text-md">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-md">{successMessage}</p>}

            <button
              type="submit"
              className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
              disabled={isSubmitting}
            >
              send code
            </button>
          </Form>
        )}
      </Formik>



   
    </div>
  );
}
