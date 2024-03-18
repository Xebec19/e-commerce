import { environment } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container px-4">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
        <Image
          src={environment.LOGO + ""}
          width={40}
          height={40}
          alt={environment.SITE_NAME + ""}
        />
        <div className="flex flex-col leading-10">
          <Link className="text-md cursor-pointer hover:underline" href={"/"}>
            Home
          </Link>
          <Link
            className="text-md cursor-pointer hover:underline"
            href={"/terms-and-conditions"}
          >
            Terms & Conditions
          </Link>
          <Link
            className="text-md cursor-pointer hover:underline"
            href={"/privacy-policy"}
          >
            Privacy Policy
          </Link>
        </div>

        <div className="col-span-2 flex flex-col justify-start items-start md:items-end">
          <span>{environment.PHONE_NUMBER}</span>
          <address>{environment.ADDRESS}</address>
        </div>
      </div>
      <div className="p-4 flex-col md:flex-row flex justify-between border-t border-neutral-200">
        <span>© 2024 All rights reserved</span>
        {/* <span>Developed by Rohan Thakur</span> */}
      </div>
    </footer>
  );
}
