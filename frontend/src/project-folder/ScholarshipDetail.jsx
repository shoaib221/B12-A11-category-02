import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/context';
import { Review } from './student/Review';
import { PrivateRoute } from '../auth/auth';
import { Breaker } from '../miscel/Breaker';
import { toast } from 'react-toastify';
import { TimeDate } from '../miscel/TimeDate';



export const ScholarshipDetail = () => {
    const { id } = useParams();
    const [scholarship, setScholarship] = useState(null);
    const { axiosInstance, user } = useAuthContext();
    const [education, setEducation] = useState("");
    const [extras, setExtras] = useState("");
    const [message, setMessage] = useState("");
    const [reviews, setReviews] = useState(null);

    const fetchScholarshipDetails = async () => {
        let response = await axiosInstance.get(`/scholarship/fetch/${id}`);
        setScholarship(response.data.scholarship);
        console.log("Fetched scholarship details:", response.data);
    }

    const fetchReviews = async () => {
        try {
            let res = await axiosInstance.get(`/scholarship/reviews?scholarshipName=${scholarship.scholarshipName}`);
            setReviews(res.data.reviews);
            console.log("Fetched reviews:", res.data.reviews);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    useEffect(() => {
        if(!scholarship) return;
        fetchReviews();

    }, [scholarship])


    useEffect(() => {
        if (!user) return;
        fetchScholarshipDetails();

    }, [user]);

    const Apply = async () => {

        if(!education || !extras || !message ) {
            toast.error("Fill up all the fields");
            return;
        }

        let cost = parseInt(scholarship.applicationFees) + parseInt(scholarship.serviceCharge)
        let info = {
            scholarshipId: id,
            scholarshipName: scholarship.scholarshipName,
            cost,
            education, extras, message
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
            <div className='max-w-[700px] mx-auto' >
                {scholarship && <>

                    <div className='h-64 bg-contain bg-left bg-no-repeat' style={{ backgroundImage: `url(${scholarship.image})` }} >

                    </div>
                    <br />

                    <div className='text-2xl text-[var(--color4)] font-bold' >{scholarship.scholarshipName}</div>
                    <div className='font-bold' >{scholarship.degree} in {scholarship.subjectCategory}</div>
                    <div className='text-[var(--color3)]' > {scholarship.scholarshipCategory} </div>
                    <div className='text-[var(--color3)]' > Deadline <TimeDate date={scholarship?.deadline} /> </div>

                    <br />
                    <div className='font-bold text-xl' >University</div>

                    <div >{scholarship.universityName} <span className='text-[var(--color3)]' >({scholarship.worldRank})</span> </div>
                    <div className='text-[var(--color3)]' > {scholarship.city} , {scholarship.country} </div>


                    <br />




                    <div className='font-bold text-xl' > Expenses </div>
                    <div> Application Fees: {scholarship.applicationFees} </div>
                    <div> Service Charge: {scholarship.serviceCharge} </div>
                    <div> Tuition Fees: {scholarship.tuitionFees} </div>
                    

                    <br />
                    <div className='font-bold text-xl' ></div>

                    {/* <div>
                        {scholarship.postedBy} at {scholarship.postedAt}
                    </div> */}

                    <br />

                    {user.role === 'student' && <>
                        <div className="text-2xl text-[var(--color4)] font-bold"  >Apply Now</div>
                        <br/>
                        <div className='font-bold text-xl' >Education</div>
                        <textarea
                            value={education} onChange={(e) => setEducation(e.target.value)}
                            placeholder='Write your educational qualifications'
                            className='resize-none block w-full max-w-[600px]'
                            rows={3}
                            required
                        ></textarea>
                        <br />
                        <div className='font-bold text-xl' >Extra Curriculars</div>
                        <textarea
                            value={extras} onChange={(e) => setExtras(e.target.value)}
                            placeholder='Write your hobbies'
                            className='resize-none block w-full max-w-[600px]'
                            rows={3}
                        ></textarea>

                        <br />
                        <div className='font-bold text-xl' >Message</div>
                        <textarea
                            value={message} onChange={(e) => setMessage(e.target.value)}
                            placeholder='Want to add any message?'
                            className='resize-none block w-full max-w-[600px]'
                            rows={3}
                        ></textarea>

                        <button
                        onClick={Apply}
                        className='button-1234' >Submit</button>

                    </>}




                    

                    <br/><br/><br/>

                    <div className='text-2xl font-bold text-[var(--color4)]' >Top Reviews</div>

                    { reviews && reviews.map( (review) => (
                    <div key={review._id} className='box-1212 p-4 mb-4 rounded-lg flex justify-between' >
                        <div>
                            <div className='mt-2 flex gap-2' > { [ ...Array( review.rating ) ].map( elem => <span key={elem} className='text-orange-500' >★</span> ) } </div>
                            <div className='mt-2' > { review.comment } </div>
                            <div className='text-[var(--color3)]' > Reviewer: { review.reviewerName } </div>
                        </div>
                    </div>
                )) }

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
