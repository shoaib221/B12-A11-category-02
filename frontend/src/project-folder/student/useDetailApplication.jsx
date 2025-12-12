import React from "react";
import { useAuthContext } from "../../auth/context";
import { set } from "react-hook-form";


export const useDetailApplication = () => {
    // Hook logic here

    const [show, setShow] = React.useState(false);
    const [application, setApplication] = React.useState(null);
    const { axiosInstance } = useAuthContext();

    async function DeleteAopplication() {
        try {
            let res= await axiosInstance.delete(`/scholarship/application/${application._id}`);
            console.log("Application deleted:", res.data);
            setShow(false);
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
            setShow(false);
            window.location.href = response.data.url;
        } catch (err) {
            console.error("Checkout error:", err);
        }
    }

    let DetailTag = (  ) => (
        <div
            className={`
                ${show ? "flex" : "hidden"}
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full 
                bg-black/40
            `}
        >
            {application && <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow">

                <div className="font-bold text-2xl mb-4"     >
                       
                    { application.scholarshipDetails.scholarshipName } 
                    <span className="text-sm font-normal ml-2" >( { application.scholarshipDetails.scholarshipCategory } )</span>
                    
                </div>

                <div>
                    <span className="font-bold" >University Name: </span>
                    {application.scholarshipDetails.universityName}
                </div>
                <div>
                    <span className="font-bold" >University Address: </span>  
                    {application.scholarshipDetails.city}, {application.scholarshipDetails.state}, {application.scholarshipDetails.country}
                </div>

                <div>
                    <span className="font-bold" >Subject Category </span> 
                    { application.scholarshipDetails.subjectCategory }
                </div>

                <div>
                    <span className="font-bold" >Degree </span> 
                    { application.scholarshipDetails.degree }
                </div>

                <br/>

                <div>
                    <div className="font-bold" >Applicant's Education: </div>  
                    <div>
                        {application.education}
                    </div>
                </div>

                <div>
                    <div className="font-bold" >Applicant's Extracurriculars: </div>  
                    <div>
                        {application.extras}
                    </div>
                </div>


                <div>
                    <div className="font-bold" >Applicant's Message: </div>  
                    <div>
                        {application.message}
                    </div>
                </div>

                <br/>

                
                <div>
                    <span className="font-bold" >Tuition Fees:  </span>
                    { application.scholarshipDetails.tuitionFees }
                </div>
                
                
                <div>
                    <span className="font-bold" >Application Fees: </span>
                    { application.scholarshipDetails.applicationFees }  
                </div>

                <div>
                    <span className="font-bold" > Service Charge: </span>
                    { application.scholarshipDetails.applicationFees }  
                </div>

                <br/>

                <div>
                    <span className="font-bold" >Application Status: </span>
                    { application.applicationStatus } 
                </div>

                <div>
                    <span className="font-bold" >Payment Status: </span>
                    { application.paymentStatus }
                </div>
                <br/>

                <div className="font-bold" >Feedback</div>
                <div>
                    { application.feedback ? application.feedback : "No feedback yet" }
                </div>

                <br/>

                <div className="flex justify-center gap-4" >
                    { application.paymentStatus === 'unpaid' && <button onClick={Pay} className="bg-blue-600 text-white p-2 rounded-xl min-w-24 cursor-pointer" >Pay</button> }
                    { application.applicationStatus === 'pending' && <button  onClick={DeleteAopplication} className="bg-red-800 text-white p-2 rounded-xl min-w-24 cursor-pointer" >Delete</button> }
                    <button onClick={() => showDetail(false)} className="bg-black text-white p-2 rounded-xl min-w-24 cursor-pointer" >Close</button>

                </div>
                
            </div>}
        </div>
    )

    let showDetail = (app, flag) => {
        if( app ) setApplication( app );
        console.log(app)
        setShow(flag)
    }




    return { DetailTag, showDetail };
}