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
            <div className='text-2xl font-bold' >Manage Applications</div>
            <div className='mt-4 flex flex-col gap-4' >
                { applications && applications.map( (application) => (
                    <div key={application._id} className='justify-between border p-4 rounded-lg flex' >
                        <div>
                            <div className='font-semibold text-lg' >Scholarship: { application.scholarshipDetails.scholarshipName }</div>
                            <div className='text-sm text-gray-600' >Applicant: { application.applicantName }</div>      
                            <div>Status: { application.applicationStatus }</div>
                        </div>
                        <div>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={ () => showDetail(application, true) } >View Details</button>  
                            <button className='bg-green-500 text-white px-4 py-2 rounded-lg ml-2' onClick={ () => showFeedback(application, true) } >Feedback</button>   
                        </div>
                    </div>
                )) }
            </div>
                

        </div>
    );
};

