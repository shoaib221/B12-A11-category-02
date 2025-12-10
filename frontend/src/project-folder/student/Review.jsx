import React, { useEffect } from 'react';
import {  useReviewDetail } from './useReview';
import { useEditReview } from "./EditRevieHook"
import { useAuthContext } from '../../auth/context';



export const Review = () => {
    const [ reviews, setReviews ] = React.useState([]);
    const { axiosInstance, user } = useAuthContext();
    const { ModalTag: EditReviewTag , showModal: showEdit } = useEditReview();
    const { ReviewDetailTag, showReviewDetail } = useReviewDetail();

    useEffect( () => {
        if(!user) return;
        const fetchReviews = async () => {
            try {   
                let res = await axiosInstance.get('/scholarship/my-reviews');
                setReviews(res.data.reviews);
                console.log("Fetched reviews:", res.data.reviews);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        fetchReviews();
    }, [axiosInstance, user] );

    return (
        <div>
            <EditReviewTag />
            <ReviewDetailTag  />
            <div className='text-2xl font-bold' >My Reviews</div>
            <div className='mt-4 flex flex-col gap-4' >
                { reviews && reviews.map( (review) => (
                    <div key={review._id} className='border p-4 rounded-lg flex justify-between' >
                        <div>
                            <div className='mt-2' > { review.scholarshipDetails.scholarshipName } </div>                            
                        </div>

                        <div>
                            <button onClick={ () => showEdit( review, true ) } >Edit</button>
                            <button onClick={ () => showReviewDetail( review, true ) } >Detail</button>
                        </div>
                        
                    </div>
                )) }
            </div>

        </div>
    );
};

