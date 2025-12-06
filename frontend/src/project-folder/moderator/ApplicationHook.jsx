import React from "react";



export const useDetail = ( items ) => {
    const [ isOpen, setIsOpen ] = React.useState( false );
    const [ application, setApplication ] = React.useState( null );


    let Decision = async () => {
        console.log("Decision made")
    }



    let DetailTag = () => (
        <div
            className={`
                ${isOpen ? "flex" : "hidden"}
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full
                bg-black/40
            `}  
        >
            { application && <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow">
                Application Details
                <div className="flex flex-col gap-2 mt-4" >
                    <div>Applicant Name: { application.applicantName }</div>
                    <div>Scholarship: { application.scholarshipDetails.scholarshipName }</div>
                    <div>Status: { application.applicationStatus }</div>
                    <div>Submitted On: { new Date( application.submissionDate ).toLocaleDateString() }</div>
                    <div>Additional Info: { application.additionalInfo || 'N/A' }</div>
                </div>
                <div className="flex justify-center gap-4 mt-4" >
                    { application.applicationStatus === 'pending' && <button onClick={() => Decision(true)} >Confirm</button> }
                    { application.applicationStatus === 'pending' && <button onClick={() => Decision(false) } >Reject</button> }
                    <button onClick={() => setIsOpen(false)} >Close</button>
                </div>
            </div>}
        </div>
    );


    let showDetail = ( item, flag ) => {
        console.log(item)
        if( item ) setApplication( item );
        setIsOpen( flag );
    }
    return { DetailTag, showDetail };
}


export const useFeedback = () => {
    const [ isOpen, setIsOpen ] = React.useState(false);
    const [ applicationData, setApplicationData ] = React.useState(null);

    let FeedbackTag = () => (
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
                Provide Feedback
                <div className="flex justify-center gap-4" >
                    <button onClick={() => setIsOpen(false)} >Close</button>
                </div>
            </div>
        </div>
    );  
    let showFeedback = (app, flag) => {
        console.log("show feedback")
        if( app ) setApplicationData( app );
        setIsOpen( flag );
    }   
    return { FeedbackTag, showFeedback };
}