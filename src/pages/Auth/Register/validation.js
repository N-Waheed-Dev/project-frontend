import * as yup from "yup";
export const registerSchema = yup.object({
  username: yup.string().trim().required().min(5).max(12),
  email: yup.string().email().trim().required().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: yup.string().required().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{7,}$/,"Password must be at least 7 characters long and contain at least one uppercase letter, one number, and one special character.",
    ),
});
