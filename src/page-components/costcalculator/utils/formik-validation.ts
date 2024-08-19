import { GlobalYup } from "@/config/formik";

export const initialValuesCostCalculator = {
  name: "",
  number: "",
  email: "",
};
export const FORM_VALIDATION_COST_CALCULATOR = GlobalYup.object().shape({
  name: GlobalYup.string().required("Name is required"),
  number: GlobalYup.string()
    .customPhoneSign()
    .required("Required")
    .label("Contact Number"),
  email: GlobalYup.string().email("Invalid Email").required("Required"),
});
