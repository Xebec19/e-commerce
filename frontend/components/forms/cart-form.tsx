"use client";

import React from "react";
import { useFormik } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as Yup from "yup";

const validationSchema = Yup.object({
  couponCode: Yup.string().required("Invalid Coupon Code"),
});

export default function CartForm() {
  const formik = useFormik({
    initialValues: {
      couponCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2">
      <div className="flex space-x-2">
        <Input
          id="couponCode"
          placeholder="Enter Coupon Code"
          onChange={formik.handleChange}
          value={formik.values.couponCode}
        />

        <Button variant={"secondary"} type="submit" className="uppercase">
          Redeem
        </Button>
      </div>
      {formik.touched.couponCode && formik.errors.couponCode ? (
        <span className="text-rose-500 text-sm my-1">
          {formik.errors.couponCode}
        </span>
      ) : (
        <></>
      )}
    </form>
  );
}
