import React from 'react';
import { useState, useEffect } from 'react';
import './banner2.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { motion } from 'framer-motion';

export const Banner2 = () => {
    const ids = ["img1", "img2", "img3"];
    const [index, setIndex] = useState(0);

    const leftSlide = () => {

        setIndex(prev => (prev - 1 + ids.length) % ids.length)

        //console.log("left slide", index)
    }

    const rightSlide = () => {
        setIndex(prev => (prev + 1) % ids.length)
    }


    useEffect(() => {
        const interval = setInterval(() => {

            leftSlide()
        }, 4000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        < div className='w-full' >
            <div id={ids[index]} className='relative h-[25rem] bg-cover bg-center'   >
                <button onClick={leftSlide} className="absolute top-[10%] left-4 w-12 h-[80%] bg-white/50 text-5xl"  >
                    <MdKeyboardArrowLeft />
                </button>

                <button onClick={rightSlide} className="absolute top-[10%] right-4 w-12 h-[80%] bg-white/50 text-5xl"  >
                    <MdKeyboardArrowRight />
                </button>
            </div>

            <div className='relative overflow-hidden p-4' >
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "0" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className='text-3xl font-bold'
                >
                    Grab The Best{" "}
                    <span style={{ color: 'var(--color4)' }}>
                        Scholarships
                    </span>

                </motion.div>

                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    Finding the right scholarship can be life-changing, but searching for it shouldn’t feel overwhelming. Our platform is designed to make scholarship hunting simple, smart, and stress-free. We gather trusted scholarships from around the world and present them in one place, so students can easily discover opportunities that match their academic goals, skills, and backgrounds. Whether you are a high-school student, an undergraduate, or a graduate applicant, we help you stay informed about deadlines, eligibility, and application tips. With the right guidance and resources, your dream education becomes more achievable. Unlock your future by finding the scholarship that fits you.
                </motion.div>
            </div>

            <button className='bg-[var(--color4)] text-white p-2 mx-4 rounded-xl' >
                Search Scholarships
            </button>

        </div>
    )
};

