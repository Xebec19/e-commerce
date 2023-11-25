import { environment } from "@/lib";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="container px-4">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
        <Image
          src="/icons8-shopaholic-48.png"
          width={40}
          height={40}
          alt={environment.SITE_NAME + ""}
        />
        <div className="flex flex-col leading-10">
          <span className="text-md cursor-pointer hover:underline">Home</span>
          <span className="text-md cursor-pointer hover:underline">About</span>
          <span className="text-md cursor-pointer hover:underline">
            Terms & Conditions
          </span>
          <span className="text-md cursor-pointer hover:underline">
            Shipping & Return Policy
          </span>
          <span className="text-md cursor-pointer hover:underline">FAQ</span>
        </div>

        <div className="col-span-2 flex flex-col justify-start items-start md:items-end">
          <span>+91 9898998989</span>
          <address>{environment.ADDRESS}</address>
        </div>
      </div>
      <div className="p-4 flex-col md:flex-row flex justify-between border-t border-neutral-200">
        <span>© 2023 All rights reserved</span>
        <span>Developed by Rohan Thakur</span>
      </div>
    </footer>
  );
}
