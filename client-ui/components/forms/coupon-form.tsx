"use client";

import React from "react";
import { useFormik } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as Yup from "yup";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { addCoupon } from "@/lib/http/coupon.http";
import { queryClient } from "@/store/query.provider";

const validationSchema = Yup.object({
  couponCode: Yup.string().required("Invalid Coupon Code"),
});

export default function CouponForm() {
  const { toast } = useToast();

  const { mutate: apply } = useMutation({
    mutationFn: addCoupon,
    onSuccess: (response) => {
      if (!response?.status) {
        toast({
          variant: "destructive",
          title: "Coupon could not be added",
        });
        return;
      }

      toast({
        title: "Coupon added successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      couponCode: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      apply({ code: values.couponCode });
      resetForm();
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
