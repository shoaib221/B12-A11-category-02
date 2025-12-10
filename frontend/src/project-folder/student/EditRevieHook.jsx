import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../auth/context";
import { StarRating } from "../utils/StarRating";


const ReviewModal = ({ open, review, show }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { axiosInstance } = useAuthContext();
    const textareaRef = useRef(null);

    // ✅ sync state ONLY when modal opens or review changes
    useEffect(() => {
        if (open && review) {
            setComment(review.comment ?? "");
            setRating(review.rating ?? 0);
        }
    }, [open, review]);

    useEffect(() => {
        if (open) textareaRef.current?.focus();
    }, [open]);

    const UpdateReview = async () => {
        console.log( comment, rating )
        try {
            await axiosInstance.post("/scholarship/update-review", {
                ...review,
                comment,
                rating,
            });
            show(null, false);
        } catch (err) {
            console.error(err?.response?.data?.error || err);
        }
    };

    if (!open || !review) return null;

    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
                <h2 className="mb-2 text-lg font-semibold">Edit review</h2>

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
                        onClick={UpdateReview}
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export const useEditReview = () => {
    const [open, setOpen] = useState(false);
    const [review, setReview] = useState(null);

    const showModal = (reviewPar, flag) => {
        if (flag && reviewPar) {
            setReview(reviewPar);
        }
        if (!flag) {
            setReview(null);
        }
        setOpen(flag);
    };

    const ModalTag = () => (
        <ReviewModal
            open={open}
            review={review}
            show={showModal}
        />
    );

    return { ModalTag, showModal };
};
