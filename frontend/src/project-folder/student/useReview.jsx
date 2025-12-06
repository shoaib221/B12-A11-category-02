import React from "react";


export const useReview = () => {
    const [ isOpen, setIsOpen ] = React.useState(false);
    const [ applicationData, setApplicationData ] = React.useState(null);
    let ReviewTag = () => (
        <div
            className={`
                ${isOpen ? "flex" : "hidden"}
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full
                bg-black/40
            `}  
        >
            <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow">
                Review Application
                <div className="flex justify-center gap-4" >
                    <button onClick={() => setIsOpen(false)} >Close</button>
                </div>
            </div>
        </div>
    );
    let showReview = (app, flag) => {
        if( app ) setApplicationData( app );
        setIsOpen( flag );
    }
    return { ReviewTag, showReview };
}