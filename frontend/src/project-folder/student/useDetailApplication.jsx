import React from "react";


export const useDetailApplication = () => {
    // Hook logic here

    const [show, setShow] = React.useState(false);
    const [application, setApplication] = React.useState(null);

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

                <div>University Name</div>
                <div>University Address</div>
                <div>Feedback</div>
                <div>Subject Category</div>
                <div>Application Fees</div>
                <div>Application Status</div>
                
                <div>
                    Scholarship { application.scholarshipDetails.scholarshipName }
                </div>

                <div>
                    Applicant: { application.applicantName }
                </div>

                <div>
                    Status: { application.applicationStatus }
                </div>

                <div>
                    Payment: { application.paymentStatus }
                </div>

                <div className="flex justify-center gap-4" >
                    { application.paymentStatus === 'unpaid' && <button>Pay</button> }
                    { application.applicationStatus === 'pending' && <button>Delete</button> }
                    <button onClick={() => showDetail(false)} >Close</button>

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