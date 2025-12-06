

import React from 'react';
import './button.css';



export const Button1 = ({ children }) => {
    return (
        <button className='w-full flex flex-col btn-1' >
            {children}
        </button>
    );
};

