import React from "react";
import { useAuthContext } from "../../auth/context";



export const useDetail = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [application, setApplication] = React.useState(null);
    const { axiosInstance } = useAuthContext();


    let Decision = async (flag) => {
        const info = {
            applicationId: application._id,
            approve: flag
        }

        try {
            let response = await axiosInstance.post('/scholarship/decision', info);
            console.log("Decision response:", response);
            setIsOpen(false);
        } catch (err) {
            console.error("Decision error:", err);
        }
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
            {application && <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow">
                Application Details
                <div className="flex flex-col gap-2 mt-4" >
                    <div>Applicant Name: {application.applicantName}</div>
                    <div>Applicant Email </div>
                    <div>University Name </div>
                    <div>Feedback </div>
                    <div>Scholarship: {application.scholarshipDetails.scholarshipName}</div>
                    <div>Status: 
                        <select>
                            <option value="pending" selected={application.applicationStatus === 'pending'} >Pending</option>
                            <option value="completed" selected={application.applicationStatus === 'approved'} >Approved</option>
                            <option value="processing" selected={application.applicationStatus === 'processing'} >Processing</option>
                            <option value="rejected" selected={application.applicationStatus === 'rejected'} >Rejected</option>
                        </select>
                    </div>

                    <div>Payment Status: {application.paymentStatus}</div>
                    <div>Submitted On: {new Date(application.submissionDate).toLocaleDateString()}</div>
                    
                </div>
                <div className="flex justify-center gap-4 mt-4" >
                    <button>Update</button>
                    
                    <button onClick={() => setIsOpen(false)} >Close</button>
                </div>
            </div>}
        </div>
    );


    let showDetail = (item, flag) => {
        console.log(item)
        if (item) setApplication(item);
        setIsOpen(flag);
    }
    return { DetailTag, showDetail };
}


export const useFeedback = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [applicationData, setApplicationData] = React.useState(null);

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
        if (app) setApplicationData(app);
        setIsOpen(flag);
    }
    return { FeedbackTag, showFeedback };
}