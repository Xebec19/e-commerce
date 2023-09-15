import { environment } from "@/lib";
import Image from "next/image";

export default function DesktopHeader() {
  return (
    <div className="flex justify-between p-4 items-center">
      <span className="flex items-center space-x-4">
        <Image
          priority
          src="/icons8-shopaholic-48.png"
          width={40}
          height={40}
          alt={environment.SITE_NAME + ""}
        />
        <span className="text-lg font-bold">{environment.SITE_NAME}</span>
      </span>
      <span className="text-md">Category 1</span>
      <span className="text-md">Category 1</span>
    </div>
  );
}
