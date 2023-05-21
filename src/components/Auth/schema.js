import * as yup from "yup";

export const schemaLogIn = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Email must be in format: email@domain.com")
    .min(6, "Minimal email length is 6 symbols")
    .max(32, "Max email length is 32 symbols")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(7, "Minimal password length is 8 symbols")
    .max(32, "Max password length is 32 symbols")
    .required("Password is required"),
});

export const schemaSignUp = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Email must be in format: email@domain.com")
    .min(6, "Minimal email length is 6 symbols")
    .max(32, "Max email length is 32 symbols")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(7, "Minimal password length is 7 symbols")
    .max(32, "Max password length is 32 symbols")
    .matches(/^[^\s]*$/u, "Password cannot contain spaces")
    .required("Password is required"),

  cpassword: yup
    .string()
    .trim()
    .min(7, "Minimal password length is 7 symbols")
    .max(32, "Max password length is 32 symbols")
    .matches(/^[^\s]*$/u, "password cannot contain spaces")
    .required("Please repeat password")
    .oneOf([yup.ref("password")], "Password do not match"),
});
