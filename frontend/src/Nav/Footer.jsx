import React from 'react';
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { TbBrandStocktwits } from "react-icons/tb";


export const Footer = () => {

    return (
        <div id='footer' className='px-8' >
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <div className='h-[3rem]   flex gap-2' >
                    <TbBrandStocktwits className='h-full text-2xl' />
                    <div className='cen-ver font-bold' >JobSphere</div>
                </div>

                <div>
                    <div>Social Links</div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '1.5rem', marginTop: '1rem' }} >
                        <RiTwitterXFill title='X' onClick={ () => window.open("https://x.com", "_blank") } />
                        <FaLinkedin title='Linkedin' onClick={ () => window.open( "https://www.linkedin.com/", "_blank" ) } />
                        <FaFacebook title='Facebook' onClick={ () => window.open( "https://www.facebook.com", "_blank" ) } />
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }} >
                Copyright © 2025 - All right reserved
            </div>
        </div>
    );
};