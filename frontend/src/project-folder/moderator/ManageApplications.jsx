import React, { useEffect } from 'react';
import { useAuthContext } from '../../auth/context';
import { useDetail, useFeedback } from './ApplicationHook'


export const ManageApplications = () => {
    const [ applications, setApplications ] = React.useState([]);
    const { axiosInstance, user } = useAuthContext();
    const { DetailTag, showDetail } = useDetail();
    const { FeedbackTag, showFeedback } = useFeedback();

    async function fetchApplications() {
        let res = await axiosInstance.get('/scholarship/applications');
        setApplications(res.data.applications);
    }

    useEffect( () => {
        if(!user) return;
        fetchApplications();
    }, [user] );


    return (
        <div>
            <DetailTag />
            <FeedbackTag />
            
            <div className='mt-4 flex  flex-col gap-4' >
                { applications && applications.map( (application) => (
                    <div key={application._id} className='gap-2 justify-between box-1212 p-4 rounded-lg flex-col md:flex-row flex' >
                        <div>
                            <div className='font-semibold text-lg' > { application.scholarshipDetails.scholarshipName }</div>
                            <div className='text-sm text-gray-600' >Applicant: { application.applicantName }</div>      
                            <div className='text-sm text-gray-600' >Status: { application.applicationStatus }</div>
                        </div>
                        <div className='flex gap-2' >
                            <button className='button-1234' onClick={ () => showDetail(application, true) } >View Details</button>  
                            <button className='button-1234' onClick={ () => showFeedback(application, true) } >Feedback</button>   
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
};

