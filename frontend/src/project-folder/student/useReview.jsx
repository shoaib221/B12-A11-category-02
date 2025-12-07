import React, { useEffect } from "react";
import { useAuthContext } from "../../auth/context";
import { set } from "react-hook-form";


export const useReview = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [applicationData, setApplicationData] = React.useState(null);
    let ratingRef = React.useRef();
    let commentRef = React.useRef();
    const { axiosInstance } = useAuthContext();

    useEffect( () => {
        if (applicationData && isOpen) {
            //console.log("Populating review modal with data:", applicationData);
            if (commentRef.current) {
                //console.log("Setting comment ref value:", applicationData.review ? applicationData.comment : "");
                commentRef.current.value =  applicationData.comment;
            }
            if(ratingRef.current) {
                ratingRef.current.value = applicationData.rating;
            }
        }
    }, [applicationData, isOpen] );



    const AddReview = async () => {
        if (!applicationData) return;

        const info = {
            applicationId: applicationData._id,
            scholarshipId: applicationData.scholarshipId,
            comment: commentRef.current?.value,
            rating: ratingRef.current?.value
        };

        console.log("Submitting review:", info);

        try {
            let res = await axiosInstance.post("/scholarship/add-review", info);
            console.log("Review submitted:", res.data);
            setIsOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const showReview = (app, flag) => {
        setIsOpen(flag);
        if (app) {
            setApplicationData(app);
        }
        
    };

    // ✨ Here is the KEY FIX — returning JSX, not a component function
    const ReviewTag = () => (

        <div className={`fixed inset-0 ${isOpen ? 'flex' : 'hidden'} items-center justify-center bg-black/40 z-10`}>
            <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Review Application</h2>

                <textarea
                    ref={commentRef}
                    placeholder="Write your review here..."
                    className="w-full h-40 border p-2 rounded-lg"
                />

                <div className="mt-4">Rating</div>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={AddReview}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Submit Review
                    </button>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

    );

    return { ReviewTag, showReview };
};



export const useReviewDetail = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [review, setReview] = React.useState(null);

    let ReviewDetailTag = () => (
        <div
            className={`
                ${isOpen ? "flex" : "hidden"}
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full 
                bg-black/40
            `}
        >
            {review && <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col gap-2 mt-4" >
                    Scholarship Name, University Name, Comment, Rating, Date
                    <div>Rating: {review.rating} / 5</div>
                    <div>Comment: {review.comment}</div>
                </div>
                <div className="flex justify-center gap-4 mt-4" >
                    <button onClick={() => setIsOpen(false)} >Close</button>
                    <button>Delete</button>
                </div>
            </div>}
        </div>
    )   
    let showReviewDetail = (rev, flag) => {
        if( rev ) setReview( rev );
        console.log(rev)
        setIsOpen(flag)
    }

    return { ReviewDetailTag, showReviewDetail };
}