import React, { useContext, useEffect } from 'react';
import './Theme.css'
import { ThemeContext } from './context';


export const Theme = () => {
    // const { theme, setTheme } = useContext( ThemeContext )

    useEffect(() => {
        let theme = localStorage.getItem("color-theme")
        if (!theme) return;

        if (theme === "dark")
            document.documentElement.setAttribute('color-theme', 'dark');
        else
            document.documentElement.setAttribute('color-theme', 'light');
    }, [])


    function toggleTheme() {
        console.log("clicked")
        let elem = document.documentElement.getAttribute('color-theme')
        if (elem === "light") {
            document.documentElement.setAttribute('color-theme', 'dark');
            localStorage.setItem("color-theme", "dark")
        }
        else {
            document.documentElement.setAttribute('color-theme', 'light');
            localStorage.setItem("color-theme", "light")
        }

    }

    return (
        <label className="toggle text-base-content my-2 mx-auto"  >
            <input onClick={toggleTheme} type="checkbox" value="synthwave" className="theme-controller" />

            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

        </label>
    )

    // return (
    //     <button onClick={toggleTheme} className='p-1 text-center cursor-pointer' >
    //         Toggle Theme
    //     </button>
    // );
};

