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
        console.log("Fetched scholarship details:", response.data);
    }


    useEffect(() => {
        if (!user) return;
        fetchScholarshipDetails();
    }, [user]);

    const Apply = async () => {
        let info = {
            scholarshipId: id,
            scholarshipName: scholarship.scholarshipName,
            cost: scholarship.applicationFees
        }

        console.log("Checkout info:", info);

        try {
            let response = await axiosInstance.post('/scholarship/apply', info);
            window.location.href = response.data.url;
        } catch (err) {
            console.error("Checkout error:", err);
        }
    }


    return (
        <PrivateRoute>
            <div className='max-w-[1000px] mx-auto' >
                {scholarship && <>

                    <div className='h-32 bg-contain bg-center' style={{ backgroundImage: `url(${scholarship.image})` }} >

                    </div>


                    <div className='font-bold text-2xl' >{scholarship.scholarshipName}</div>
                    
                    <div className='text-lg text-gray-600' >{scholarship.universityName}, { scholarship.worldRank } </div>
                    <div> { scholarship.city } , { scholarship.country } </div>

                    <div> { scholarship.scholarshipCategory } </div>
                    <div> { scholarship.subjectCategory } </div>

                    <div> { scholarship.degree } </div>

                    <div>
                        Deadline { scholarship.deadline }
                    </div>

                    <div>
                        {scholarship.applicationFees},
                        { scholarship.serviceCharge },
                        { scholarship.tuitionFees }
                    </div>

                    <div>
                        {scholarship.postedAt} by {scholarship.postedBy}
                    </div>


                    <button
                        onClick={Apply}
                        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg' >Apply Now</button>
                    <div className='text-2xl font-bold' >Review</div>

                </>}
            </div>
        </PrivateRoute>
    );
};



// Scholarship Details Page
// Display comprehensive information about the selected scholarship, including University
// Image, Scholarship Name, University World Rank, Deadline, Location, Application Fees,
// Scholarship Description, and Stipend/Coverage details.
// Apply Button: A prominent "Apply for Scholarship" button.
// ● By clicking this redirects the user to the Payment/Checkout page.
// Reviews Section: Display all reviews associated with this scholarship/university. Show
// the reviewer's image, name, date, rating, and comment. This data comes from the
// Reviews Collection.
