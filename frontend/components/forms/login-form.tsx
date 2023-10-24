"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { loginHttp } from "@/lib/http/auth.http";
import { useToast } from "../ui/use-toast";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password can not be empty"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );

  const { toast } = useToast();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginHttp,
    onSuccess: (response) => {
      if (response.status) {
        toast({
          title: "Logged in successfully!",
        });
        let token = response.payload;

        localStorage.setItem("token", token);
        formik.resetForm();
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
    onSubmit: (values) => {
      let payload = {
        email: values.email.trim().toLowerCase(),
        password: values.password,
      };
      login(payload);
    },
  });

  return (
    <div>
      <h1 className="text-2xl prose font-bold">Login</h1>
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

        <div className="flex justify-end">
          {isPending ? (
            <Button disabled size={"icon"}>
              <Loader size={20} />
            </Button>
          ) : (
            <Button type="submit" className="uppercase">
              Login
            </Button>
          )}
        </div>
      </form>
      <Separator className="max-w-[768px] my-4" />
      <div className="flex justify-between max-w-[768px]">
        <Button variant={"link"} className="uppercase">
          Forgot Password
        </Button>

        <Link href={"/auth/register"} className="uppercase">
          Register
        </Link>
      </div>
    </div>
  );
}
