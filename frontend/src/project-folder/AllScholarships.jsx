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



// All Scholarships Page
// Display all scholarships available on the platform in a responsive grid layout.
// Search Functionality: Include a search bar to find scholarships by Scholarship Name,
// University Name, or Degree.
// Filter Functionality: Include options to filter scholarships by specific criteria (e.g.,
// Scholarship Category, Subject Category, or Location).
// Card Information: Each scholarship card must display the University Image, University
// Name, Scholarship Category, Location, Application Fees (if any), and a "View Details"
// button. "View Details" Button: Clicking this button navigates the user to the Scholarship
// Details page.
