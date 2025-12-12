import React, { useState } from 'react';
import { UpdateProfile } from "../../auth/UpdateProfile";
import { MyApplications } from './MyApplications';
import { Review } from './Review';
import { useSearchParams } from 'react-router-dom';


export const StudentDash = () => {
    const [ cur, setCur ] = useState('profile')
    let some = useSearchParams()
    console.log(some)


    return (
        <div className='flex flex-col lg:flex-row gap-8' >
            <title> ScholarStrem | Dashboard</title>
            <div className='flex flex-row lg:flex-col min-w-12 gap-2' >
                <div className={`${ cur === 'profile'? 'button-1234': ""  } box-1212`}  onClick={ () => setCur('profile') } > My Profile</div>
                <div className={`${ cur === 'my-apps'? 'button-1234': ""  } box-1212`} onClick={ () => setCur('my-apps') } > My Applications</div>
                <div className={`${ cur === 'reviews'? 'button-1234': ""  } box-1212`} onClick={ () => setCur('reviews') } >My Reviews</div>
            </div>

            <div className='flex-1' >
                { cur === 'profile' && <UpdateProfile /> }
                { cur === 'my-apps' && <MyApplications /> }
                { cur === 'reviews' && <Review /> }
            </div>
        </div>
    );
};

