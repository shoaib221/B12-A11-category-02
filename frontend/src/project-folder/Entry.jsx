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
    
    const {  DownWindowTag } = useContext(DownWindowContext);
    

    // useEffect(() => {
    //     axiosInstance.post("/auth/count", { name: "pfh" })
    //         .then(res => console.dir(res.data))
    //         .catch(err => console.dir(err))
    // }, [])

    // function scrollToTop() {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // }

    return (
        <>
            <Nav />
            <div className='flex-1 relative overflow-hidden p-4 flex flex-col' >
                <DownWindowTag />
                <Outlet />
            </div>
            <Footer />

            {/* <div onClick={ scrollToTop } className='fixed bottom-4 right-4 z-5' >Back To Top</div> */}
        </>
    );
};



// Layout & Page Structure
// Main Layout: Your site will have a main layout with a Navbar and Footer visible on most
// pages (excluding the dashboard layout).
// Navbar:
// ● Always Visible: Logo, Home, All Scholarships.
// ● Not Logged In: Login Button, Register Button.
// ● Logged In: User Profile Image (with dropdown), Dashboard link, Logout.
// Footer:
// ● A standard footer with Logo, Copyright, and Social Media links.

