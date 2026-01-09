import React, { useState } from 'react';
import { ManageApplications } from './ManageApplications';
import { AllReviews } from './AllReviews';
import { UpdateProfile } from "../../auth/UpdateProfile"


export const ModeratorDash = () => {
    const [ cur, setCur ] = useState('profile')

    return (
        <div className='flex flex-col lg:flex-row gap-4 flex-1' >
            
            <div className='flex flex-row  lg:flex-col lg:w-60 lg:min-w-60 gap-2 p-2' >
                <div className={`${ cur === 'profile'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer`}  onClick={ () => setCur('profile') }   >My Profile</div>
                <div className={`${ cur === 'manage-apps'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer`}  onClick={ () => setCur('manage-apps') } > Manage Applications </div>
                <div className={`${ cur === 'reviews'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer`}  onClick={ () => setCur('reviews') } > All Reviews </div>
                
            </div>

            <div className='flex-1' >
                { cur === 'profile' && <UpdateProfile /> }
                { cur === 'reviews' && <AllReviews /> }
                { cur === 'manage-apps' && <ManageApplications /> }
            </div>
        </div>
    );
};

