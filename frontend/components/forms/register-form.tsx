"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string(),
  email: Yup.string().email("Email is invalid!").required("Email is required!"),
  password: Yup.string().required("Password can not be empty"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function LoginForm() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <h1 className="text-2xl prose font-bold">Register</h1>
      <form
        className="flex flex-col space-y-4 max-w-[768px] my-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.firstName}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.lastName}
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="you@domain.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.email}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.password}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="uppercase">
            Register
          </Button>
        </div>
      </form>
      <Separator className="max-w-[768px] my-4" />
      <div className="flex justify-between max-w-[768px]">
        <Button variant={"link"} className="uppercase">
          Forgot Password
        </Button>

        <Button variant={"link"} className="uppercase">
          Login
        </Button>
      </div>
    </div>
  );
}
