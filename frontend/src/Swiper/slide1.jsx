import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import './slide1-style.css'

export function InfiniteSlider() {
    return (
        <div className="w-full p-4" >
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                loop={true}                 // infinite loop
                speed={3000}                // slide speed
                autoplay={{
                    delay: 0,                 // no delay → smooth continuous motion
                    disableOnInteraction: false,
                }}
                allowTouchMove={false}      // optional: disable manual swiping
                direction="horizontal"      // left to right


                breakpoints={{
                    320: { slidesPerView: 1 },   // small phones
                    480: { slidesPerView: 2 },   // phones
                    768: { slidesPerView: 3 },   // tablets
                    1280: { slidesPerView: 4 },   // desktops
                }}
            >
                <SwiperSlide><div className="slide-item">Item 1</div></SwiperSlide>
                <SwiperSlide><div className="slide-item">Item 2</div></SwiperSlide>
                <SwiperSlide><div className="slide-item">Item 3</div></SwiperSlide>
                <SwiperSlide><div className="slide-item">Item 4</div></SwiperSlide>
                <SwiperSlide><div className="slide-item">Item 5</div></SwiperSlide>
            </Swiper>
        </div>
    );
}