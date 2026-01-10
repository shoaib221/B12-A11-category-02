import React, { useEffect, useState } from 'react';
import { UpdateProfile } from "../../auth/UpdateProfile";
import { MyApplications } from './MyApplications';
import { Review } from './Review';
import { useNavigate, useSearchParams } from 'react-router-dom';


export const StudentDash = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const curBoard = searchParams.get( "board" );
    const navigate = useNavigate()
    const [ cur, setCur ] = useState( curBoard? curBoard : 'profile')
    
    useEffect(() => {
        let board = searchParams.get( "board" );
        setCur(board);
    }, [searchParams])


    return (
        <div className='flex flex-col lg:flex-row gap-8 flex-1' >
            <title> ScholarStrem | Dashboard</title>
            <div className='flex flex-row lg:flex-col lg:min-w-52  gap-2 px-2' >
                <div className={`${ cur === 'profile'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer`}  onClick={ () => navigate('/dashboard?board=profile') } > My Profile</div>
                <div className={`${ cur === 'my-apps'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer`} onClick={ () => navigate('/dashboard?board=my-apps') } > My Applications</div>
                <div className={`${ cur === 'reviews'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer`} onClick={ () => navigate("/dashboard?board=reviews") } >My Reviews</div>
            </div>

            <div className='flex-1' >
                { cur === 'profile' && <UpdateProfile /> }
                { cur === 'my-apps' && <MyApplications /> }
                { cur === 'reviews' && <Review /> }
            </div>
        </div>
    );
};

