import React, { use, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/context';
import { Review } from './student/Review';
import { PrivateRoute } from '../auth/auth';

export const ScholarshipDetail = () => {
    const { id } = useParams();
    const [scholarship, setScholarship] = React.useState(null);
    const { axiosInstance, user } = useAuthContext();

    const fetchScholarshipDetails = async () => {
        let response = await axiosInstance.get(`/scholarship/fetch/${id}`);
        setScholarship(response.data.scholarship);
    }


    useEffect(() => {
        if (!user) return;
        fetchScholarshipDetails();
    }, [user]);

    const Apply = async () => {
        let info ={
            
            scholarshipId: id,
            scholarshipName: scholarship.scholarshipName,
            cost: scholarship.applicationFees
        }

        console.log("Checkout info:", info);

        try {
            let response = await axiosInstance.post('/scholarship/apply', info);
            window.location.href = response.data.url;
        } catch(err) {
            console.error("Checkout error:", err);
        }

        
    }


    return (
        <PrivateRoute>
            <div>
                <div>Scholarship Detail</div>
                {scholarship && (
                    <div className='mt-4 border p-4 rounded-lg' >
                        <div className='font-bold text-2xl' >{scholarship.scholarshipName}</div>
                        <div className='text-lg text-gray-600' >{scholarship.universityName}</div>
                        <div className='mt-2' >{scholarship.description}</div>
                    </div>
                )}

                <button 
                    onClick={Apply}
                    className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg' >Apply Now</button>

                <div className='text-2xl font-bold' >Review</div>
            </div>
        </PrivateRoute>
    );
};

