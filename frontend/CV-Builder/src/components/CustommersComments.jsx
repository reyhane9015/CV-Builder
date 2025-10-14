import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import img1 from "../assets/user1.webp";
import img2 from "../assets/user2.webp";

function CustomersComments() {
  return (
    <div className="py-12">
      <h2 className="text-center text-2xl font-bold mb-12">نظرات کاربران</h2>
      <div className="bg-black/90 text-center flex items-center justify-center bg-secondery-default rounded-md text-white p-4 mx-4 md:mx-8">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            1280: { slidesPerView: 4, spaceBetween: 50 },
          }}
        >
          {[img1, img2, img1, img2, img1].map((img, index) => (
            <SwiperSlide key={index}>
              <div className="py-4 m-2 md:m-4">
                <div className="py-4 px-2 bg-gray-800 rounded-md text-white shadow-sm">
                  <div className="py-4 px-3">
                    <div className="flex items-start gap-4">
                      <div className="relative -top-12 h-[100px] w-[90px] overflow-hidden rounded-md mx-auto md:mx-0">
                        <img
                          src={img}
                          className="filter grayscale w-full h-full object-cover"
                          alt="user"
                        />
                      </div>
                      <div className="flex flex-col items-center md:items-start justify-between gap-2 text-center md:text-left">
                        <h5>بهناز خرم</h5>
                        <span className="opacity-50 text-sm">15 مهر 1402</span>
                      </div>
                    </div>
                    <p className="opacity-70 leading-6 text-sm text-justify line-clamp-4 text-right mb-4 px-4">
                      بهترین سایت رزمه ساز موجود در بازار. بیش از چهار سال هست
                      از این سایت استفاده میکنم امکانات فوق العاده جالب و خوبی
                      دارد. باتشکر از تیم سازنده
                    </p>
                    <p className="border-dashed border-t opacity-60 text-sm py-4">
                      بهناز محمدی-برنامه نویس
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CustomersComments;
