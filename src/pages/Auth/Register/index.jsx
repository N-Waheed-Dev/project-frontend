import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerSchema } from "./validation";
import Button from "../../../components/shared/Button";
import axios from "axios";
import { useContext, useEffect } from "react";
import { GlobalStore } from "../../../stores/MainStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Register() {
  // Hooks
  const { base_url, token, setToken } = useContext(GlobalStore);
  const navigate = useNavigate();
  // Protected Route
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  // Functions
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${base_url}/auth/local/register`,
        values,
      );

      if (response.data) {
        localStorage.setItem("token", response.data.jwt);
        setToken(response.data.jwt);
        toast.success("User Created Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } catch (error) {
 console.log(
  "Register Error:",
  JSON.stringify(error.response?.data, null, 2)
);

  toast.error(
    error.response?.data?.error?.message || "Registration Failed",
    {
      duration: 4000,
    }
  );
}

    // axios
    //   .post(`${base_url}/auth/local/register`, values)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div className="h-full flex justify-center items-center">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-6 bg-sage-secondary/20 border border-sage-secondary/50 rounded-lg shadow-2xl p-5 w-120 max-w-full">
          <h1 className="text-4xl text-center font-bold">Welcome</h1>
          <div className="flex flex-col gap-3">
            <Field
              name="username"
              className="outline-0 border border-sage-secondary rounded-lg focus:border-2 focus:border-sage-primary focus:ring-2 focus:ring-sage-secondary/50 py-1 px-3 "
              placeholder="User Name"
            />
            <ErrorMessage
              name="username"
              component={"p"}
              className="text-sage-primary font-bold"
            />
            <Field
              name="email"
              className="outline-0 border border-sage-secondary rounded-lg focus:border-2 focus:border-sage-primary focus:ring-2 focus:ring-sage-secondary/50 py-1 px-3 "
              placeholder="email"
            />
            <ErrorMessage
              name="email"
              component={"p"}
              className="text-sage-primary font-bold"
            />
            <Field
              name="password"
              type="password"
              className="outline-0 border border-sage-secondary rounded-lg focus:border-2 focus:border-sage-primary focus:ring-2 focus:ring-sage-secondary/50 py-1 px-3 "
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component={"p"}
              className="text-sage-primary font-bold"
            />
          </div>
          <Button>Register</Button>
        </Form>
      </Formik>
    </div>
  );
}
