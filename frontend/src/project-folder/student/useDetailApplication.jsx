import React, { useState } from "react";
import { useAuthContext } from "../../auth/context";
import { set } from "react-hook-form";
import { toast } from "react-toastify";


let DetailTag = ( { application, show, showDetail, refetch } ) => {
    const { axiosInstance } = useAuthContext()

    async function DeleteAopplication() {
        try {
            let res = await axiosInstance.delete(`/scholarship/application/${application._id}`);
            toast.info("Deleted Succesfully")
            
            // await refetch()
            showDetail(null, false)
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    }


    const Pay = async () => {
        let info = {
            applicationId: application._id,
        }

        console.log("Checkout info:", info);

        try {
            let response = await axiosInstance.post('/scholarship/apply', info);
            showDetail(null, false);
            window.location.href = response.data.url;
        } catch (err) {
            console.error("Checkout error:", err);
        }
    }

    if(!show) return null;

    return (
        <div
            className={`
                block
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full 
                bg-black/40 overflow-auto
            `}
        >
            {application && <div className={`relative w-full max-w-200 bg-white p-4 rounded-lg shadow 
                border-2 border-(--color4) m-4 mx-auto mx-auto`}>

                <button onClick={() => showDetail(null, false)} className="rounded-full absolute top-2 right-2 py-2 px-4 cursor-pointer hover:bg-gray-300" >X</button>

                <div className="text-2xl text-(--color4) text-center font-bold" >Application Detail</div>
                <br/>

                <div className="font-bold"     >

                    {application.scholarshipDetails.scholarshipName}
                    <span className="text-sm font-normal ml-2" >( {application.scholarshipDetails.scholarshipCategory} )</span>

                </div>

                <div>
                    <span className="font-bold" >{application.scholarshipDetails.degree}</span> in 
                    <span className="font-bold" > {application.scholarshipDetails.subjectCategory} </span>
                </div>

                <div>
                    <span className="font-bold" >{application.scholarshipDetails.universityName}</span>
                    
                </div>
                <div>
                    
                    {application.scholarshipDetails.city},  {application.scholarshipDetails.country}
                </div>

                

                

                <br />

                <div className="font-bold" >Applicant</div>
                <div>
                    { application.applicantName }
                </div>

                <div>
                    <div className="font-bold" >Applicant's Education: </div>
                    <div>
                        {application.education ? application.education: "No data available"}
                    </div>
                </div>

                <div>
                    <div className="font-bold" >Applicant's Extracurriculars: </div>
                    <div>
                        {application.extras? application.extras: "No data available" }
                    </div>
                </div>


                <div>
                    <div className="font-bold" >Applicant's Message: </div>
                    <div>
                        {application.message ? application.message: "No message available" }
                    </div>
                </div>

                <br />


                <div>
                    <span className="font-bold" >Tuition Fees:  </span>
                    {application.scholarshipDetails.tuitionFees}
                </div>


                <div>
                    <span className="font-bold" >Application Fees: </span>
                    {application.scholarshipDetails.applicationFees}
                </div>

                <div>
                    <span className="font-bold" > Service Charge: </span>
                    {application.scholarshipDetails.applicationFees}
                </div>

                <br />

                <div>
                    <span className="font-bold" >Application Status: </span>
                    {application.applicationStatus}
                </div>

                <div>
                    <span className="font-bold" >Payment Status: </span>
                    {application.paymentStatus}
                </div>
                <br />

                <div className="font-bold" >Feedback</div>
                <div>
                    {application.feedback ? application.feedback : "No feedback yet"}
                </div>

                <br />

                <div className="flex justify-center gap-4" >
                    {application.paymentStatus === 'unpaid' && <button onClick={Pay} className="bg-blue-600 text-white p-2 rounded-xl min-w-24 cursor-pointer" >Pay</button>}
                    {application.applicationStatus === 'pending' && <button onClick={DeleteAopplication} className="bg-red-800 text-white p-2 rounded-xl min-w-24 cursor-pointer" >Delete</button>}


                </div>

            </div>}
        </div>)
}


export const useDetailApplication = () => {
    // Hook logic here

    const [show, setShow] = React.useState(false);
    const [application, setApplication] = React.useState(null);
    const [ refetch, setRefetch ] = useState(null)
    

    let showDetail = (app, flag, refetch) => {
        if (app) setApplication(app);
        console.log(app)
        setShow(flag)
        setRefetch(refetch)
    }

    const Tag = () => {
        return <DetailTag show={show} showDetail={showDetail} application={application} refetch={refetch} />
    }


    return { DetailTag: Tag, showDetail };
}