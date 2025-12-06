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
            <div id={ids[index]} className='relative h-[15rem] bg-cover bg-center'   >
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
                    animate={{ x:  "0"  }}      
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    Grab Your Opportunities
                </motion.div>

                <motion.div
                    initial={{ x: "-100%" }}               
                    animate={{ x:  "0"  }}      
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores maiores quibusdam nihil ullam incidunt autem, qui placeat dignissimos suscipit corrupti consectetur nesciunt error at dolores quo ea quas similique aliquam!
                </motion.div>
            </div>

        </div>
    )
};

