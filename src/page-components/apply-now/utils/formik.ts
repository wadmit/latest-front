import { GlobalYup } from "@/config/formik";

export const FORM_VALIDATION_SIGN_IN = GlobalYup.object().shape({
    email: GlobalYup.string().email('Invalid Email').required('Required'),
    password: GlobalYup.string().required('Required'),
  });
  
export const FORM_VALIDATION_SIGN_UP = GlobalYup.object().shape({
    email: GlobalYup.string()
      .matches(/^[^\s][\s\S]*$/, 'Email cannot start with a space')
      .email('Invalid Email')
      .required('Required'),
    phone: GlobalYup.string().required('Required').customPhoneSign().label('Phone'),
    password: GlobalYup.string()
      .required('Required')
      .min(8, 'Password is too short - should be 8 characters minimum.')
      .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
      .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
      .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
      .matches(/^(?=.*[!@#$%^&*])/, '  Must Contain  One Special Case Character'),
    first_name: GlobalYup.string()
      .matches(/^[^\s][\s\S]*$/, 'First Name cannot start with a space')
      .required('Required'),
    last_name: GlobalYup.string()
      .matches(/^[^\s][\s\S]*$/, 'Last name cannot start with a space')
      .required('Required'),
    confirmPassword: GlobalYup.string()
      .oneOf([GlobalYup.ref('password'), ""], 'Passwords must match')
      .required('Required'),
  });
  