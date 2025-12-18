import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context";
import { toast } from "react-toastify";
import { TimeDate } from "../../miscel/TimeDate";


const DetailTag = ({ application, isOpen, showDetail }) => {
    const [status, setStatus] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {

        if (application && isOpen) {
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
            showDetail(null, false)
        } catch (err) {
            console.error("Decision error:", err);
        }
    }

    return (
        <div
            className={`
                ${isOpen ? "block" : "hidden"}
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full
                bg-black/40 overflow-auto
            `}
        >
            {application && <div className="relative w-full max-w-200 bg-white p-4 pl-8 rounded-lg shadow mx-auto mt-4">

                <button className="cursor-pointer absolute top-2 right-4" onClick={() => showDetail(null, false)} >X</button>

                <div className="flex flex-col gap-2 mt-4" >
                    <div>

                        <span className="font-bold text-xl" >{application.scholarshipDetails.scholarshipName}, </span>
                            
                            <span className="text-(--color3)" >{application.scholarshipDetails.scholarshipCategory}</span>
                        <div> {application.scholarshipDetails.universityName} </div>
                        
                        <div>{application.scholarshipDetails.degree} in {application.scholarshipDetails.subjectCategory}</div>
                    </div>

                    <br/>

                    <div>
                        <div className="font-bold" > Applicant: </div>
                        <div> {application.applicantName} </div>
                        <div> { application.applicantEmail } </div>
                        
                    </div>

                    <br/>

                    <div className="font-bold" >Applicant's Educational Qualification</div>
                    <div> { application.education } </div>

                    <br/>

                    <div className="font-bold" > Applicant's Extracurriculars </div>
                    <div> { application.extras } </div>

                    <br/>

                    <div className="font-bold" >
                        Applicant's Message
                    </div>

                    <div>
                        { application.message }
                    </div>

                    <br/>


                    <div>
                        <span className="font-bold" > Payment Status: </span> {application.paymentStatus}

                    </div>
                    <div> <span className="font-bold" >Submitted On:</span> <TimeDate date={application.applicationDate} /> </div>


                    <div>
                        <div className="font-bold" >Feedback </div>
                        <div>{application.feedback ? application.feedback : "No feedback yet"}</div>

                    </div>

                    <br/>

                    <div> <span className="font-bold"> Application Status:</span>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} >
                            <option value="pending"  >Pending</option>
                            <option value="approved"  >Approved</option>
                            <option value="processing"  >Processing</option>
                            <option value="rejected"  >Rejected</option>
                        </select>
                    </div>



                </div>
                <br/>
                <div className="flex justify-center gap-4 mt-4" >
                    <button className="button-1234" onClick={Decision} >Update</button>
                    
                </div>
            </div>}
        </div>
    );
}


export const useDetail = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [application, setApplication] = useState(null)


    let showDetail = (item, flag) => {
        console.log(item)
        if (item) setApplication(item);
        setIsOpen(flag);
    }


    const Tag = () => {
        return <DetailTag isOpen={isOpen} showDetail={showDetail} application={application} />
    }


    return { DetailTag: Tag, showDetail };
}




const FeedbackTag = ({ isOpen, show, app }) => {
    const [feedback, setFeedback] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {
        if (app && isOpen) {
            setFeedback(app.feedback)
        }


    }, [app, isOpen])


    async function SendFeedback() {
        let info = {
            ...app, feedback
        }

        try {
            let res = await axiosInstance.patch("/scholarship/application", info)
            toast.success("Feedback updated")
            show(null, false)
        } catch (err) {
            console.error(err.response.data.error)
        }

    }



    if (!isOpen) return null;

    


    return (
        <div
            className={`
                flex
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full
                bg-black/40
            `}
        >
            <div className="relative w-full max-w-150 bg-white p-4 rounded-lg shadow">

                <div className="absolute top-2 right-2 cursor-pointer" onClick={() => show(null, false)} > X </div>

                <div className="text-xl text-center font-bold">Write Your Feedback</div>

                <label className="block mb-3">
                    
                    <textarea
                        type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                        placeholder="Leave your thoughts..."
                        rows={5}
                        required={true}
                    />

                </label>

                <div className="flex justify-center gap-4" >
                    <button onClick={SendFeedback} className="button-1234" >Update</button>
                    
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