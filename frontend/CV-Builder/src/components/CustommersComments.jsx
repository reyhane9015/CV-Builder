import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // Navigation module styles
import "swiper/css/pagination"; // Pagination module styles

import { Navigation, Pagination } from "swiper/modules";

import img1 from "../assets/user1.png";
import img2 from "../assets/user2.webp";

function CustomersComments() {
  return (
    <div>
      <div className="py-12">
        <h2 className="text-center text-2xl font-bold text-center mb-12">
          نظرات کاربران
        </h2>
        <div className="bg-purple-900 text-center flex items-center justify-center bg-secondery-default rounded-md text-white p-4 mx-8">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // className=""
          >
            <SwiperSlide>
              <div className="py-4 m-4">
                <div className="py-4 px-2 bg-purple-700/15 rounded-md text-white shadow-sm">
                  <div className="py-4 px-3">
                    <div className="flex items-start gap-4">
                      <div className="relative -top-12 h-[100px] overflow-hidden rounded-md">
                        <img
                          src={img1}
                          className="filter grayscale"
                          width={90}
                          height={90}
                          alt="doctor"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-between gap-2">
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

            <SwiperSlide>
              <div className="py-4 m-4">
                <div className="py-4 px-2 bg-purple-700/15  rounded-md text-white shadow-sm">
                  <div className="py-4 px-3">
                    <div className="flex items-start gap-4">
                      <div className="relative -top-12 h-[100px] overflow-hidden rounded-md">
                        <img
                          src={img2}
                          className="filter grayscale"
                          width={90}
                          height={90}
                          alt="doctor"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-between gap-2">
                        <h5>بهناز خرم</h5>
                        <span className="opacity-50 text-sm">15 مهر 1402</span>
                      </div>
                    </div>
                    <p className="opacity-70 leading-6 text-sm text-justify line-clamp-4 text-right mb-4 px-4">
                      بیش از چهار سال هست از این سایت استفاده میکنم امکانات فوق
                      العاده جالب و خوبی دارد. باتشکر از تیم سازنده
                    </p>
                    <p className="border-dashed border-t opacity-60 text-sm py-4">
                      بهناز محمدی-برنامه نویس
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="py-4 m-4">
                <div className="py-4 px-2 bg-purple-700/15  rounded-md text-white shadow-sm">
                  <div className="py-4 px-3">
                    <div className="flex items-start gap-4">
                      <div className="relative -top-12 h-[100px] overflow-hidden rounded-md">
                        <img
                          src={img1}
                          className="filter grayscale"
                          width={90}
                          height={90}
                          alt="doctor"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-between gap-2">
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

            <SwiperSlide>
              <div className="py-4 m-4">
                <div className="py-4 px-2 bg-purple-700/15  rounded-md text-white shadow-sm">
                  <div className="py-4 px-3">
                    <div className="flex items-start gap-4">
                      <div className="relative -top-12 h-[100px] overflow-hidden rounded-md">
                        <img
                          src={img2}
                          className="filter grayscale"
                          width={90}
                          height={90}
                          alt="doctor"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-between gap-2">
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

            <SwiperSlide>
              <div className="py-4 m-4">
                <div className="py-4 px-2 bg-purple-700/15  rounded-md text-white shadow-sm">
                  <div className="py-4 px-3">
                    <div className="flex items-start gap-4">
                      <div className="relative -top-12 h-[100px] overflow-hidden rounded-md">
                        <img
                          src={img1}
                          className="filter grayscale"
                          width={90}
                          height={90}
                          alt="doctor"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-between gap-2">
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
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CustomersComments;
