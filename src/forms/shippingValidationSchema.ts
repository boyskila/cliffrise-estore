import * as Yup from "yup";

export const shippingSchema = Yup.object().shape({
  country: Yup.string()
    .required("Country is required")
    .oneOf(["Bulgaria", "Greece", "Romania"], "Please select a valid country"),
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "Full name must be at least 3 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Full name must be at least 3 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),
  city: Yup.string().required("City is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  zipCode: Yup.string()
    .required("Zip code is required")
    .matches(/^\d{4}$/, "Invalid Bulgarian zip code (must be 4 digits)"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^(0(88|89|87|91|92|95)\d{6}|\d{2}\s?\d{7})$/,
      "Expected valid Bulgarian phone number"
    ),
});
