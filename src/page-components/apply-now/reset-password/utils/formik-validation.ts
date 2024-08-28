import { GlobalYup } from "@/config/formik";

export const FORM_VALIDATION_RESETPASSWORD = GlobalYup.object().shape({
    password: GlobalYup.string()
    .required('Required')
    .min(8, 'Password is too short - should be 8 characters minimum.')
    .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
    .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
    .matches(/^(?=.*[!@#$%^&*])/, '  Must Contain  One Special Case Character'),

  confirmPassword: GlobalYup.string()
    .oneOf([GlobalYup.ref('password'), ""], 'Passwords must match')
    .required('Required'),
})