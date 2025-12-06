import React, { use, useEffect } from 'react';
import { useAuthContext } from '../auth/context';
import { useNavigate } from 'react-router-dom';

export const AllScholarships = () => {
    const [ scholarships, setScholarships ] = React.useState([])
    const { axiosInstance } = useAuthContext();
    const navigate = useNavigate();

    async function fetchScholarships() {
        let response = await axiosInstance.get("/scholarship/all");
        setScholarships(response.data.scholarships);
    }

    useEffect( () => {
        fetchScholarships();
    }, [] )
        

    return (
        <div>
            All Scholarships

            <div className='mt-4 flex flex-col gap-4' >
                { scholarships && scholarships.map( (scholarship) => (
                    <div 
                        onClick={ () => navigate(`/scholarship-detail/${scholarship._id}`) }
                        key={scholarship._id} className='border p-4 rounded-lg flex justify-between items-center' >
                        <div>
                            <div className='font-semibold text-lg' >{ scholarship.scholarshipName }</div>
                            <div className='text-sm text-gray-600' >{ scholarship.universityName }</div>
                        </div>
                        <div>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-lg' >Delete</button>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
};

