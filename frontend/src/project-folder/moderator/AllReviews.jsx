import React from 'react';
import { useAuthContext } from '../../auth/context';
import { useReviewDetail } from "../student/useReview.jsx"

export const AllReviews = () => {
    const { axiosInstance, user } = useAuthContext();
    const [ reviews, setReviews ] = React.useState([]);
    const { ReviewDetailTag, showReviewDetail } = useReviewDetail()

    async function FetchReviews() {
        let res = await axiosInstance.get('scholarship/reviews');
        setReviews(res.data.reviews);
    }

    React.useEffect( () => {
        if(!user) return;
        FetchReviews();
    }, [user] );


    return (
        <div>
            <ReviewDetailTag />
            <div className='text-2xl font-bold' >All Reviews</div>
            <div className='mt-4 flex flex-col gap-4' >
                { reviews && reviews.map( (review) => (
                    <div key={review._id} className='justify-between border p-4 rounded-lg flex' >
                        <div>
                            <div className='font-semibold text-lg' >Scholarship: { review.scholarshipName }</div>
                            <div className='text-sm text-gray-600' >Reviewer: { review.reviewerName }</div>
                            <div>Rating: { review.rating }</div>
                            <div>Comments: { review.comments }</div>
                        </div>

                        <div>
                            <button onClick={ () => showReviewDetail( review, true ) } >Detail</button>
                            
                        </div>

                    </div>
                )) }
            </div>
        </div>
    );
};

