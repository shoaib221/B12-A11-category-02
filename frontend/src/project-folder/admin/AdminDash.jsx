import React, { useState } from 'react';
import { AddScholarship } from './AddScholarship';
import { ManageScholarships } from './ManageScholarships';
import { ManageUsers } from './ManageUsers';
import { Analytics } from './Analytics';
import { UpdateProfile } from '../../auth/UpdateProfile';


export const AdminDash = () => {
    const [ cur, setCur ] = useState("profile")


    return (
        <div className='flex gap-8' >

            <div className='flex flex-col min-w-12' >
                <div onClick={ () => setCur('profile') } >My Profile</div>
                <div onClick={ () => setCur('add') } >Add Scholarship</div>
                <div onClick={ () => setCur('scholarships') } > Manage Scholarships </div>
                <div onClick={ () => setCur( 'users' ) } > Manage Users </div>
                <div onClick={ () => setCur( 'ana' ) } > Analytics </div>
            </div>

            <div className='flex-1' >
                { cur === 'add' && <AddScholarship /> }
                { cur === 'scholarships' && <ManageScholarships /> }
                { cur === 'users' && <ManageUsers /> }
                { cur === 'ana' && <Analytics /> }
                { cur === 'profile' && <UpdateProfile /> }
            </div>
            
        </div>
    );
};

