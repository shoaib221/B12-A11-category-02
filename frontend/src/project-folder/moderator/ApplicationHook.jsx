import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context";
import { toast } from "react-toastify";



export const useDetail = () => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ application, setApplication ] = useState(null)
    const { axiosInstance } = useAuthContext();
    const [ status, setStatus ] = useState(null)

    useEffect(() => {

        if( application && isOpen )
        {
            setStatus(application.applicationStatus)
        }

    }, [application, isOpen])


    let Decision = async () => {
        const info = {
            ...application,
            approve: status
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
                    <div>
                        <div className="font-bold" >Scholarship: </div>
                        <div>{application.scholarshipDetails.scholarshipName}</div>
                        <div> { application.scholarshipDetails.universityName } </div>
                        <div>{application.scholarshipDetails.scholarshipCategory}</div>
                        <div>{application.scholarshipDetails.subjectCategory}</div>
                    </div>

                    <div>
                        <div className="font-bold" > Applicant Name: </div>
                        <div> {application.applicantName} </div>
                        <div> {application.applicantEmail} </div>
                    </div>

                    <div>
                        <span className="font-bold" > Payment Status: </span> {application.paymentStatus}
                        
                    </div>
                    <div>Submitted On: {application.applicationDate}</div>
                    
                    
                    <div> 
                        <div className="font-bold" >Feedback </div>
                        <div>{application.feedback ? application.feedback  : "No feedback yet"}</div>

                    </div>
                    
                    <div> <span className="font-bold"> Application Status:</span>
                        <select value={status} onChange={ (e) => setStatus(e.target.value) } >
                            <option value="pending"  >Pending</option>
                            <option value="approved"  >Approved</option>
                            <option value="processing"  >Processing</option>
                            <option value="rejected"  >Rejected</option>
                        </select>
                    </div>

                    

                </div>
                <div className="flex justify-center gap-4 mt-4" >
                    <button onClick={Decision} >Update</button>
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




let FeedbackTag = ({ isOpen, show, app }) => {
    const [feedback, setFeedback] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {
        if( app && isOpen ) 
        {
            setFeedback( app.feedback )
        }


    }, [app, isOpen])

    if (!isOpen) return null;

    async function SendFeedback() {
        let info ={
            ...app, feedback
        }

        try {
            let res= await axiosInstance.patch( "/scholarship/application", info )
            toast.success("Feedback updated")
            show(null, false)
        } catch (err) {
            console.error( err.response.data.error )
        }

    }


    return (
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

                <label className="block mb-3">
                    <span className="text-sm font-medium">Write Your Feedback</span>
                    <textarea
                        type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                        placeholder="Leave your thoughts..."
                    />

                </label>

                <div className="flex justify-center gap-4" >
                    <button onClick={SendFeedback} >Update</button>
                    <button onClick={() => show(null, false)} >Close</button>
                </div>
            </div>
        </div>)
};


export const useFeedback = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [applicationData, setApplicationData] = React.useState(null);


    let showFeedback = (app, flag) => {
        console.log("show feedback")
        if (app) setApplicationData(app);
        setIsOpen(flag);
    }

    let Tag = () => {
        return <FeedbackTag app={applicationData} show={showFeedback} isOpen={isOpen} />
    }

    return { FeedbackTag: Tag, showFeedback };
}