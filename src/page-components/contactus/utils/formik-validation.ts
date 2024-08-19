import { GlobalYup } from "@/config/formik";

export const initialValuesContactUs = {
  name: "",
  phone: "",
  country: "",
  email: "",
  message: "",
};

export const FORM_VALIDATION_CONTACTUS = GlobalYup.object().shape({
  name: GlobalYup.string()
    .required("Name is required")
    .max(75, "Should be less than 75 characters"),
  phone: GlobalYup.string()
    .customPhoneSign()
    .required("Required")
    .label("Phone"),
  country: GlobalYup.string().required("Country is required"),
  message: GlobalYup.string()
    .min(2, "Too Short!")
    .max(2500, "Should be less than 2500 characters!")
    .required("Message is required"),
  email: GlobalYup.string().email("Invalid Email").required("Required"),
});
