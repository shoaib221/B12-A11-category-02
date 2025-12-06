// npm install date-fns

import React from 'react';
import { format } from "date-fns";



export const TimeDate = () => {
    return (
        <div>
            <p>{format(new Date() , "EEEE, MMMM do, yyyy 'at' h:mm a")}</p>
        </div>
    );
};

