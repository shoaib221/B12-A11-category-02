import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignOut } from '../auth/auth';
import './Nav.css';
import { useNavContext } from './context.jsx';
import { Breaker } from '../miscel/Breaker.jsx';
import { FaGraduationCap } from "react-icons/fa6";
import { useTheme } from '../Theme/Theme.jsx';


export const Logo = () => {
    return (
        <div className='h-[3rem] text-[var(--color4)] flex gap-2' >
            <FaGraduationCap className='h-full text-2xl' />
            <div className='cen-ver font-black' >ScholarStream</div>
        </div>
    )
}

export const Nav = () => {
    const { ThemeChoice } = useTheme()
    
    const { down1, DownWindow, navi, LargeScreenTag } = useNavContext();
    const [opener1, setOpener1] = useState(false)

    function Opener1() {
        setOpener1(prev => !prev)
    }



    return (
        <nav id='top' className='flex min-h-[3rem] justify-between m-4 items-center' >
            <Logo/ >

            {/* <div onClick={ () => navigate('/') } style={{ cursor: 'pointer' }} className={ `${location.pathname === '/'? 'hilit-1': ''}` } >Home</div> */}

            <ThemeChoice />

            {down1 ?
                <div className='flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(false)} >
                    Menu
                </div>
                :
                <div className='flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(true)} >
                    Back
                </div>
            }


            <LargeScreenTag />



            

        </nav>
    );
};

