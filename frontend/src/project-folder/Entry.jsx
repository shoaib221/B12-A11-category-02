import { Outdent } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from '../Nav/Nav.jsx';
import { Footer } from '../Nav/Footer.jsx';
import "./project.css";
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext } from '../auth/context.jsx';
import { ReactHookFormExample } from '../react-hook-form/react-hook-form.jsx';
import { SwiperDemo }  from '../Swiper/swiper.jsx';



export const Entry = () => {
    const navigate = useNavigate();
    const { navi, DownWindowTag } = useContext(DownWindowContext);
    const { user, axiosInstance } = useContext(AuthContext);

    // useEffect(() => {
    //     axiosInstance.post("/auth/count", { name: "pfh" })
    //         .then(res => console.dir(res.data))
    //         .catch(err => console.dir(err))
    // }, [])

    return (
        <>
            <Nav />
            <div className='flex-grow relative overflow-hidden p-4' >
                <DownWindowTag />
                <Outlet />
            </div>
            <Footer />
        </>
    );
};


