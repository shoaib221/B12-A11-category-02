import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import './slide1-style.css'
import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/context";
import { useNavigate } from "react-router-dom";
import "swiper/css/free-mode";

export function InfiniteSlider() {
    const { axiosInstance, user } = useAuthContext();
    const [scholarships, setScholarships] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        axiosInstance
            .get("/scholarship/all?sortBy=tuitionFees&sortOrder=asc&count=6")
            .then((res) => setScholarships(res.data.scholarships))
            .catch(console.error);
    }, [user]);

    return (
        <div className="w-full p-4 h-60">
            <Swiper
                className="h-full"
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                loop={true}
                speed={3000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                slidesPerView="auto"
                spaceBetween={20}
                allowTouchMove={false}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {scholarships && scholarships.map((elem) => (
                    <SwiperSlide key={elem._id} className="h-full" >
                        <div
                            onClick={() =>
                                navigate(`/scholarship-detail/${elem._id}`)
                            }
                            className="slide-item text-outline-123"
                            style={{ backgroundImage: `url(${elem.image})`, backgroundSize: "cover", height: "100%",
                                backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: 'var(--color1)', textAlign: 'center' }}
                        >
                            {elem.scholarshipName}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
