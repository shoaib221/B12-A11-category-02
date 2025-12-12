import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../auth/context";
import { set } from "react-hook-form";
import { StarRating } from "../utils/StarRating";
import { toast } from "react-toastify";

const ReviewTag = ({ open, app, show }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { axiosInstance } = useAuthContext();
    const textareaRef = useRef(null);

    // ✅ sync state ONLY when modal opens or review changes
    

    useEffect(() => {
        if (open) textareaRef.current?.focus();
    }, [open]);

    const AddReview = async () => {
        if (!app) return;

        const info = {
            applicationId: app._id,
            scholarshipId: app.scholarshipId,
            rating, comment
        };

        console.log("Submitting review:", info);

        try {
            let res = await axiosInstance.post("/scholarship/add-review", info);
            toast.success("Review Added")
            show( null, false )
        } catch (err) {
            console.error(err);
        }
    };

    if (!open || !app) return null;

    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
                <h2 className="mb-2 text-lg font-semibold">Add review</h2>

                <textarea
                    ref={textareaRef}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="h-40 w-full resize-none rounded border p-2 focus:outline-none focus:ring"
                    placeholder="Write your review..."
                />

                <div className="mt-4">Rating</div>
                <StarRating value={rating} onChange={setRating} />

                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={() => show(null, false)}
                        className="rounded bg-gray-200 px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={AddReview}
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};


export const useAddReview = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [applicationData, setApplicationData] = React.useState(null);
    

    const showReview = (app, flag) => {
        setIsOpen(flag);
        console.log(app);
        if (app) {
            setApplicationData(app);
        }
    };

    let Tag = () => {
        return <ReviewTag open={isOpen} app={applicationData} show={showReview} />
    }


    return { ReviewTag: Tag, showReview };
};



export const useReviewDetail = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [review, setReview] = React.useState(null);
    const { axiosInstance } = useAuthContext();

    const DeleteReview = async () => {
        try {
            let res = await axiosInstance.post(`/scholarship/remove-review`, review);
            console.log("Review deleted:", res.data);
            setIsOpen(false);
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    }

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
                    <div>
                        <span className="font-bold" >Scholarship: </span>
                        <span>{review.scholarshipDetails.scholarshipName} </span>
                    </div>
                    <div>
                        <span className="font-bold" >University: </span>
                        <span>{review.scholarshipDetails.universityName}</span>
                    </div>

                    <div>
                        <div className="font-bold" >Applicant's Name</div>
                        <div> {review.reviewerName} </div>
                    </div>



                    <div>
                        <div className="font-bold" >Comment: </div>
                        <div>{review.comment}</div>
                    </div>

                    <div>
                        <span>Rating: </span>
                        <span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "28px",
                                        color: (review.rating) >= star ? "#facc15" : "#d1d5db",
                                        transition: "color 0.2s",
                                    }}

                                >
                                    ★
                                </span>
                            ))}

                        </span>
                    </div>

                    <div>
                        <span>Date: </span>
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>



                </div>
                <div className="flex justify-center gap-4 mt-4" >
                    <button className="bg-black rounded-xl text-white px-4 py-2" onClick={() => setIsOpen(false)} >Close</button>
                    <button className="bg-red-800 rounded-xl text-white px-4 py-2" onClick={DeleteReview} >Delete</button>
                </div>
            </div>}
        </div>
    )


    let showReviewDetail = (rev, flag) => {
        if (rev) setReview(rev);
        console.log(rev)
        setIsOpen(flag)
    }

    return { ReviewDetailTag, showReviewDetail };
}