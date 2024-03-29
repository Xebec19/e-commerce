"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/redux.store";
import { updateShippingAddress } from "@/store/checkout.slice";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string(),
  email: Yup.string().email("Email is invalid").required("Required"),
  phoneNum: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Required"),
  address: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.number().required("Required"),
  isSameAddressForBilling: Yup.boolean().default(false),
});

export default function ShippingForm() {
  const { shippingAddress } = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { ...shippingAddress },
    validationSchema,
    onSubmit: (values) => {
      dispatch({ type: updateShippingAddress, payload: values });
      router.push("/billing");
    },
  });

  return (
    <>
      <div className="text-2xl prose font-bold">Shipping Form</div>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 max-w-[768px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter Your First Name"
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
            placeholder="Enter Your Last Name"
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

        <div className="flex flex-col space-y-2 md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter Your Email"
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

        <div className="flex flex-col space-y-2 md:col-span-2">
          <Label htmlFor="phoneNum">Phone Number</Label>
          <Input
            id="phoneNum"
            placeholder="Enter Your Phone Number"
            onChange={formik.handleChange}
            value={formik.values.phoneNum}
          />
          {formik.touched.phoneNum && formik.errors.phoneNum ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.phoneNum}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="Enter Your Address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.address}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="state">State</Label>
          <Select
            onValueChange={formik.handleChange}
            defaultValue={formik.values.state}
          >
            <SelectTrigger className="border w-full px-3 py-2 h-10 rounded-md">
              <SelectValue id="state" placeholder="State" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Haryana">Haryana</SelectItem>
              <SelectItem value="UP">Uttar Pradesh</SelectItem>
            </SelectContent>
          </Select>
          {formik.touched.state && formik.errors.state ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.state}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="zip">Zip</Label>
          <Input
            id="zip"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.zip}
          />
          {formik.touched.zip && formik.errors.zip ? (
            <span className="text-rose-500 text-sm my-1">
              {formik.errors.zip}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex space-x-2 items-center">
          <Checkbox
            id="isSameAddressForBilling"
            name="isSameAddressForBilling"
            checked={formik.values.isSameAddressForBilling}
            onCheckedChange={(value) =>
              formik.setFieldValue("isSameAddressForBilling", value)
            }
          />
          <Label htmlFor="isSameAddressForBilling">
            Is same address for billing ?
          </Label>
        </div>

        <div className="md:col-span-2">
          <Button type="submit" className="w-full uppercase">
            Continue to Billing
          </Button>
        </div>
      </form>
    </>
  );
}
