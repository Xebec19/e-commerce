"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { registerHttp } from "@/lib/http/auth.http";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string(),
  email: Yup.string().email("Email is invalid!").required("Email is required!"),
  phone: Yup.string().matches(
    /^(?:\+[0-9]{1,3}[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
    "Invalid phone number"
  ),
  password: Yup.string()
    .required("Password can not be empty")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function LoginForm() {
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "text" | "password"
  >("password");
  const router = useRouter();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: registerHttp,
    onSuccess: (response) => {
      if (response.status) {
        toast({
          title: "Registered successfully!",
        });
        formik.resetForm();
        router.push("/auth/login");
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: response.message,
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      let payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      mutate(payload);
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+1 (123) 456-7890"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.phone}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative flex items-center">
            <Input
              id="password"
              type={passwordType}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="cursor-pointer absolute right-2">
              {passwordType == "password" ? (
                <Eye size={"20"} onClick={() => setPasswordType("text")} />
              ) : (
                <EyeOff
                  size={"20"}
                  onClick={() => setPasswordType("password")}
                />
              )}
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.password}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative flex items-center">
            <Input
              id="confirmPassword"
              type={confirmPasswordType}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <div className="cursor-pointer absolute right-2">
              {confirmPasswordType == "password" ? (
                <Eye
                  size={"20"}
                  onClick={() => setConfirmPasswordType("text")}
                />
              ) : (
                <EyeOff
                  size={"20"}
                  onClick={() => setConfirmPasswordType("password")}
                />
              )}
            </div>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.confirmPassword}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-end">
          {isPending ? (
            <Button disabled size={"icon"}>
              <Loader2 size={20} className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="uppercase">
              Register
            </Button>
          )}
        </div>
      </form>
      <Separator className="max-w-[768px] my-4" />
      <div className="flex justify-between max-w-[768px]">
        <Button variant={"link"} className="uppercase">
          Forgot Password
        </Button>

        <Link href={"/auth/login"} className="uppercase">
          Login
        </Link>
      </div>
    </div>
  );
}
