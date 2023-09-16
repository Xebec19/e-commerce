"use client";

import ProductCard, { IProductDetails } from "./product/product-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element-bundle";
import "swiper/swiper-bundle.css";

register();

export default function Carousel({
  products,
}: {
  products: IProductDetails[];
}) {
  return (
    <div className="pb-6 pt-1">
      <Swiper
        autoplay
        loop={true}
        spaceBetween={20}
        slidesPerView={3}
        speed={1000}
        height={400}
      >
        {products.map((product, i) => (
          <SwiperSlide key={product.name + i}>
            <ProductCard payload={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
