"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  resetCode: Yup.string()
    .required("resetCode is required")
    .length(6, "resetCode must be 6 digits"),
});

export default function VerifyResetCode() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const route = useRouter();

  const handleSubmit = async (values: any) => {
    console.log("Form Values:", values);

    try {
      const response = await axios.post("https://exam.elevateegy.com/api/v1/auth/verifyResetCode", values);
      console.log(response.data);

      console.log("resetCode verified successfully! Now you can reset your password.");
      if (response.data.status === "Success") {





        setSuccessMessage("resetCode verified successfully! Now you can reset your password.");
        setTimeout(() => {
          route.push("/resetpassword");
        }, 1000);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while verifying resetCode.");
    }
  };


  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <Formik
        initialValues={{ resetCode: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-[35%] flex flex-col gap-6">
            <p className="font-semibold text-lg">reset Code Verification </p>

            <Field
              type="text"
              name="resetCode"
              className="w-full shadow-lg border-2 p-2 rounded-lg"
              placeholder="Enter resetCode"
            />
            <ErrorMessage name="resetCode" component="div" className="text-red-500 text-md" />

            {errorMessage && <p className="text-red-500 text-md">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-md">{successMessage}</p>}

            <button
              type="submit"
              className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
              disabled={isSubmitting}
            >
              Verify resetCode
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
