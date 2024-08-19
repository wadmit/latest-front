import { GlobalYup } from "@/config/formik";

export const initialValuesFeedbackForm = {
  name: "",
  email: "",
  title: "",
  description: "",
  ratings: 0,
  photo: "",
};

export const FORM_VALIDATION_FEEDBACK = GlobalYup.object().shape({
  name: GlobalYup.string().required("Name is Required"),
  email: GlobalYup.string()
    .email("Invalid Email")
    .required("Email is required"),
  title: GlobalYup.string(),
  description: GlobalYup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Description is required"),
  ratings: GlobalYup.number().required("Ratings is required"),
  photo: GlobalYup.string(),
});
