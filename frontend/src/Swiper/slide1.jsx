import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import './slide1-style.css'
import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/context";
import { useNavigate } from "react-router-dom";

export function InfiniteSlider() {
    const { axiosInstance } = useAuthContext()
    const [ scholarships, setScholarships ] =  useState([])
    const navigate = useNavigate()

    async function GetTopScholarships() {
        console.log("infinite slide")
        try {
            let res = await axiosInstance.get("/scholarship/all?sort=tuitionFees&order=asc&count=6")
            setScholarships( res.data.scholarships )
            console.log( res.data )
        } catch (err) {
            console.error(err)
        }
        
    }

    useEffect(() => {
        GetTopScholarships()
    }, [])

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
                {/* <div class="bg-[url('/images/hero.jpg')] bg-cover bg-center h-64"></div> */}
                { scholarships && scholarships.map( elem => (
                    <SwiperSlide><div onClick={ () => navigate( `/scholarship-detail/${elem._id}` ) }  className={`slide-item bg-[url(${ elem.image })`} >{ elem.scholarshipName }</div></SwiperSlide>
                ) ) }
                
            </Swiper>
        </div>
    );
}