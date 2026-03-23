import * as yup from 'yup';
const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required.')
    .matches(regExpEmail, 'Invalid email address.'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters.'),
});

export const registerSchema = loginSchema.concat(
  yup.object().shape({
    name: yup
      .string()
      .required('Name is required.')
      .min(2, 'Name is too short.')
      .max(120),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords should match.')
      .required('Confirmation is required'),
  }),
);
