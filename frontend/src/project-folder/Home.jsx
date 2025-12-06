import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext, useAuthContext } from '../auth/context.jsx';
import { motion } from 'framer-motion';
import { Leaflet } from '../react-leaflet/leaflet.jsx';
import { Banner2 } from '../banner/banner2.jsx'
import { InfiniteSlider } from '../Swiper/slide1.jsx';
import { ScrollProduct } from '../Slide/HorizontalScroll.jsx';
import { Timeline } from '../daisyUi/Timeline.jsx';
import { Chart } from '../Charts/charts.jsx';



export const Home = () => {
    const { axiosInstance, user } = useAuthContext()
    const [ students, setStudents ] = useState([])
    

    useEffect(() => {
        if(!user) return;

        async function fetchdata() {
            let res= await axiosInstance.get( "/miscel/students-by-country" )
            setStudents(res.data.students)
            console.log( res.data.students )
        }

        fetchdata();

    }, [user])
    

    return (
        <div className='block flex-grow relative' >
            <Chart data={students} />
            {/* <Banner2 />
            <InfiniteSlider />
            <ScrollProduct /> */}
        </div>
    );
};

