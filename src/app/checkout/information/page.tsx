"use client";

import React, { useEffect, useState } from "react";
import { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage, FormikConfig } from "formik";
import { shippingSchema } from "@/forms/shippingValidationSchema";
import { appFetch } from "@/lib/fetch";

// Initial form values
const initialValues = {
  country: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  phoneNumber: "",
  zipCode: "",
  email: "",
};

const InfoPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    const savedFormData = localStorage.getItem("shippingFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setFormData(parsedData);
    }
  }, [pathName]);

  const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    const { target } = event as unknown as MouseEvent;
    const formData = new FormData(target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const { error, recipientCity } = await appFetch<{
      error: string;
      recipientCity: { name: string };
    }>("/api/checkout/validation/city", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (error === "City or post code not valid!") {
      setFieldError("city", "Check city name");
      setFieldError("zipCode", "Check zip code");
      return;
    }

    try {
      await appFetch("/api/checkout/information", {
        method: "POST",
        body: JSON.stringify({ address: data, recipientCity }),
      });
      localStorage.setItem("shippingFormData", JSON.stringify(values));
      router.push("/checkout/shipping");
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false); // Reset form submission state
  };
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <Formik
            initialValues={formData}
            enableReinitialize
            validationSchema={shippingSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <fieldset aria-describedby="personal-details">
                    <label id="personal-details">
                      <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                        Personal Details
                      </h3>
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Field
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Field
                          type="number"
                          name="phoneNumber"
                          placeholder="Phone No:"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="mt-8">
                    <label>
                      <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                        Shipping Address
                      </h3>
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Address"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="city"
                          placeholder="City"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="country"
                          placeholder="Country"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="zipCode"
                          placeholder="Zip code"
                          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                        />
                        <ErrorMessage
                          name="zipCode"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 max-md:flex-col mt-8">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : "Continue to shipping"}
                      </Button>
                    </div>
                  </fieldset>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
