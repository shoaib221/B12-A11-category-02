import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../auth/context";
import { useEffect } from "react";



export const SuccesfulPayment = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const sessionId = searchParams.get( "session_id" );
    const { axiosInstance, user } = useAuthContext()
    const navigate = useNavigate()

    useEffect( () => {
        if( !sessionId || !user ) return;

        axiosInstance.post( "/scholarship/payment-success", { session_id: sessionId } )
            .then( res => console.log(res) )
            .catch( err => console.dir(err) )

    }, [sessionId, axiosInstance, user] )

    return (
        <div>
            <div className="text-green-800" >Payment Successful</div>

            scholarshipname, university name, paid amount

            <button onClick={ () => navigate( `/dashboard?board=applications` ) } >My Applications</button>
        </div>
    )
}


export const FailedPayment = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const sessionId = searchParams.get( "session_id" );
    const { axiosInstance, user } = useAuthContext()

    useEffect( () => {
        if( !sessionId || !user ) return;

        axiosInstance.post( "/payment/failed", { session_id: sessionId } )
            .then( res => console.log(res) )
            .catch( err => console.dir(err) )

    }, [sessionId, axiosInstance, user] )

    return (
        <div>
            Payment Failed

            Scholarship Name, Error Message

            <button>Dashboard</button>
        </div>
    )
}