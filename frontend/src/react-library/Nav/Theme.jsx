import React from 'react';

export const Theme = () => {
    function toggleTheme () {
        let elem = document.documentElement.getAttribute('color-theme')
        if( elem === "light" )
            document.documentElement.setAttribute( 'color-theme', 'dark' );
        else
            document.documentElement.setAttribute( 'color-theme', 'light' );
    }

    return (
        <button onClick={toggleTheme} >
            Toggle Theme
        </button>
    );
};

