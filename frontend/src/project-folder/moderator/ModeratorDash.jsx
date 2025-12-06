import React, { useState } from 'react';
import { ManageApplications } from './ManageApplications';
import { AllReviews } from './AllReviews';
import { UpdateProfile } from "../../auth/UpdateProfile"


export const ModeratorDash = () => {
    const [ cur, setCur ] = useState('profile')

    return (
        <div className='flex gap-4' >
            <title>DashBoard | Moderator</title>
            <div className='flex flex-col min-w-12' >
                <div onClick={ () => setCur('profile') } >My Profile</div>
                <div onClick={ () => setCur('manage-apps') } > Manage Applications </div>
                <div onClick={ () => setCur('reviews') } > All Reviews </div>
                
            </div>

            <div className='flex-1' >
                { cur === 'profile' && <UpdateProfile /> }
                { cur === 'reviews' && <AllReviews /> }
                { cur === 'manage-apps' && <ManageApplications /> }
            </div>
        </div>
    );
};

