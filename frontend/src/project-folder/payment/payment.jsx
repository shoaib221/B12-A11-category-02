import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../auth/context";
import { useEffect, useState } from "react";
import { Loading }  from "../../miscel/Loading"



export const SuccesfulPayment = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const sessionId = searchParams.get( "session_id" );
    const { axiosInstance, user } = useAuthContext()
    const navigate = useNavigate()
    const [ application, setApplication ] = useState(null)

    const FetchPaymentInfo = async () => {
        try {
            let res = await axiosInstance.post( "/scholarship/payment-success", { session_id: sessionId } )
            console.log( res.data );
            setApplication( res.data.application );
        } catch(err) {
            console.error(err.response.data.error)
        }
    }

    useEffect( () => {
        if( !sessionId || !user ) return;
        FetchPaymentInfo()
    }, [sessionId, axiosInstance, user] )

    if(!application) return <Loading />

    return (
        <div>
            <div className="text-green-800 text-2xl font-bold" >Payment Successful</div>
            <div> Paid Amount: { application.paymentAmount }  </div>
            <div>Transaction Reference: { application.transId }</div>
            <br/>
            <div className="font-bold text-lg" >Scholarship</div>
            <div> { application.scholarshipDetails.scholarshipName } </div>
            <div> { application.scholarshipDetails.universityName } </div>
            <div> { application.scholarshipDetails.city }, { application.scholarshipDetails.country } </div>

            <br/>
            <div className="font-bold text-lg" >Applicant</div>
            <div> { application.applicantName } </div>
            <div> { application.applicantEmail } </div>
            <br/>

            <button className="button-2" onClick={ () => navigate( "/dashboard?board=my-applications" ) } >My Applications</button>
        </div>
    )
}


export const FailedPayment = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const sessionId = searchParams.get( "session_id" );
    const { axiosInstance, user } = useAuthContext()
    const navigate = useNavigate()
    const [ application, setApplication ] = useState(null)
    const [ status, setStatus ] = useState(null)

    const FetchPaymentInfo = async () => {
        try {
            let res = await axiosInstance.post( "/scholarship/payment-success", { session_id: sessionId } )
            console.log( res.data );
            setApplication( res.data.application );
            setStatus( res.data.status )
        } catch(err) {
            console.error(err.response.data.error)
        }
    }

    useEffect( () => {
        if( !sessionId || !user ) return;
        FetchPaymentInfo()
    }, [sessionId, axiosInstance, user] )

    if(!application) return <Loading />

    return (
        <div>
            <div className="text-red-800 font-bold text-2xl" >Payment Failed</div> 
            <div> Payable Amount: { application.paymentAmount }  </div>
            <div>Status: { status }</div>

            <br/>
            <div className="font-bold text-lg" >Scholarship</div>
            <div> { application.scholarshipDetails.scholarshipName } </div>
            <div> { application.scholarshipDetails.universityName } </div>
            <div> { application.scholarshipDetails.city }, { application.scholarshipDetails.country } </div>

            <br/>
            <div className="font-bold text-lg" >Applicant</div>
            <div> { application.applicantName } </div>
            <div> { application.applicantEmail } </div>
            <br/>

            <button className="button-2" onClick={( ) => navigate("/dashboard") } >Dashboard</button>
        </div>
    )
}