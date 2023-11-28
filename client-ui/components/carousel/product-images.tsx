"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { IProductImagePayload } from "@/interfaces/product.interface";

export default function ProductImages({
  images,
}: {
  images: IProductImagePayload[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  function handleNext() {
    if (selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else {
      setSelectedImage(0);
    }
  }

  function handlePrev() {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    } else {
      setSelectedImage(images.length - 1);
    }
  }

  return (
    <>
      <div>
        <div className="relative aspect-square max-h-[400px] overflow-hidden w-full flex flex-col justify-center items-center">
          <Image
            fill
            className="object-contain h-full w-full transition-all ease-in-out"
            src={images[selectedImage].image_url}
            sizes={"(min-width: 768px) 40vw, 100vw"}
            alt={images[selectedImage].img_id}
          />

          <div className="absolute bottom-4 block m-auto">
            <div className="rounded-full border-black p-2 bg-neutral-50 flex justify-center text-neutral-500 space-x-4 backdrop-blur dark:bg-black">
              <span
                className="hover:text-black dark:hover:text-white cursor-pointer hover:scale-110 transition-all ease-in-out"
                onClick={handlePrev}
              >
                <ArrowLeft />
              </span>
              <Separator
                orientation="vertical"
                className="h-auto"
                color="white"
              />
              <span
                className="hover:text-black dark:hover:text-white cursor-pointer hover:scale-110 transition-all ease-in-out"
                onClick={handleNext}
              >
                <ArrowRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
