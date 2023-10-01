"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid!").required("Email is required!"),
  password: Yup.string().required("Password can not be empty"),
});

const initialValues = {
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
    <>
      <div className="text-2xl prose font-bold">Login</div>
      <form
        className="flex flex-col space-y-4 max-w-[768px] my-4"
        onSubmit={formik.handleSubmit}
      >
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
            Login
          </Button>
        </div>
      </form>
      <Separator className="max-w-[768px] my-4" />
      <div className="flex justify-between max-w-[768px]">
        <Button variant={"link"} className="uppercase">
          Forgot Password
        </Button>

        <Button variant={"link"} className="uppercase">
          Register
        </Button>
      </div>
    </>
  );
}
