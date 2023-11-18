"use client";

import ProductCard from "@/components/product/product-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element-bundle";
import "swiper/swiper-bundle.css";
import { IProductPayload } from "@/interfaces/product.interface";

register();

const slidesProps = {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  speed: 800,
  height: 400,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
};

export default function NewArrivals({
  products,
}: {
  products: IProductPayload[];
}) {
  return (
    <div className="pb-6 pt-1">
      <Swiper {...slidesProps}>
        {products.map((product, i) => (
          <SwiperSlide key={product.product_id}>
            <ProductCard
              payload={product}
              sizes="(min-width: 768px) 33vw, 80vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
