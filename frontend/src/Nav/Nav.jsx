import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignOut } from '../auth/auth';
import { AuthContext } from '../auth/context';
import './Nav.css';
import { Theme } from '../Theme/Theme.jsx';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { DownWindowContext } from './context.jsx';
import { TbBrandStocktwits } from "react-icons/tb";
import { Breaker } from '../miscel/Breaker.jsx';
import { Flashlight } from 'lucide-react';



export const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user} = useContext(AuthContext);
    const { down1, DownWindow, navi, LargeScreenTag } = useContext(DownWindowContext)
    const [ opener1, setOpener1 ] = useState(false)
    
    //console.log(location)
    

    function handleClick(event, path) {
        event.preventDefault();
        let nav1 = document.getElementById('home-nav');
        let nav2 = document.getElementById('app-nav');
        let nav3 = document.getElementById('install-nav');
        nav1.classList.remove('marked');
        nav2.classList.remove('marked');
        nav3.classList.remove('marked');

        // console.log(event.target , path);
        event.target.classList.add('marked');
        navigate(path);

    }


    function Opener1 () {
        setOpener1( prev => !prev )
    }

    

    return (
        <nav id='top' className='flex min-h-[3rem] justify-between m-4 items-center' >
            <div className='h-[3rem]   flex gap-2' >
                <TbBrandStocktwits  className='h-full text-2xl' />
                <div className='cen-ver font-bold' >JobSphere</div>
            </div>

            {/* <div onClick={ () => navigate('/') } style={{ cursor: 'pointer' }} className={ `${location.pathname === '/'? 'hilit-1': ''}` } >Home</div> */}

            
                { down1 ? 
                <div className='flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={ () => DownWindow( false ) } >
                    Menu
                </div>
                :  
                <div className='flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={ () => DownWindow( true ) } >
                    Back
                </div> 
                }
            

            <LargeScreenTag />

            { user ? 
                <div className='cursor-pointer h-[3rem] w-[3rem] rounded-full relative bg-cover bg-center z-3' title={user.email} onClick={Opener1} style={{  backgroundImage: `url(${user.photoURL})`, border: '.1rem solid var(--color2)' }}  >
                    <div id='opener-1' className={`box-shadow-1 absolute flex-col p-2 rounded-xl w-[10rem] right-[0%] top-[105%] z-4 bg-[var(--color1)] ${opener1 ? "flex" : "hidden" }`} style={{ border: '1px solid var(--color2)'  }} >
                        {/* <div onClick={ ()=> navigate('/profile')} className='p-1 text-center w-full'  >Profile</div>
                        <Breaker />
                        <Theme /> */}

                        <div onClick={ ()=> navigate('/dashboard')} className='p-1 text-center w-full'  >Dashboard</div>
                        <Breaker />
                        <SignOut />
                    </div>
                </div>
                :
                <button onClick={()=> navigate("/auth")} className='button-2' >
                    Login
                </button>
            }
            
        </nav>
    );
};

