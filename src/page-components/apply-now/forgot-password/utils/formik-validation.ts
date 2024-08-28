import { GlobalYup } from "@/config/formik";

export const initialValuesForgotPassword = {
    email: ''
}

export const FORM_VALIDATION_FORGOTPASSWORD = GlobalYup.object().shape({
    email: GlobalYup.string().email("Invalid Email").required("Required")
})