import React, { useContext, useEffect } from 'react';
import './Theme.css'
import { ThemeContext } from './context';


export const Theme = () => {
    // const { theme, setTheme } = useContext( ThemeContext )

    useEffect( () => {
        let theme = localStorage.getItem( "color-theme" )
        if(!theme) return;

        if( theme === "dark" ) 
            document.documentElement.setAttribute( 'color-theme', 'dark' );
        else
            document.documentElement.setAttribute( 'color-theme', 'light' );
    }, [])


    function toggleTheme () {
        let elem = document.documentElement.getAttribute('color-theme')
        if( elem === "light" )
        {
            document.documentElement.setAttribute( 'color-theme', 'dark' );
            localStorage.setItem("color-theme", "dark" )
        }
        else {
            document.documentElement.setAttribute( 'color-theme', 'light' );
            localStorage.setItem( "color-theme", "light" )
        }
            
    }

    return (
        <button onClick={toggleTheme} className='p-1 text-center cursor-pointer' >
            Toggle Theme
        </button>
    );
};

