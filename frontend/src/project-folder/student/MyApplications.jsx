import React from 'react';
import { useAuthContext } from '../../auth/context';
import { useDetailApplication } from './useDetailApplication';
import { useEditApplication } from './useEditApplication';
import { useAddReview } from './useReview';


export const MyApplications = () => {
    const [ applications, setApplications ] = React.useState([]);
    const { axiosInstance, user } = useAuthContext();
    const { DetailTag, showDetail } = useDetailApplication();
    const { EditTag, showEdit } = useEditApplication();
    const { ReviewTag, showReview } = useAddReview();
    

    const fetchApplications = async () => {
        let response = await axiosInstance.get('/scholarship/my-applications');
        setApplications(response.data.applications);
        console.log("Fetched applications:", response.data.applications);
    }

    React.useEffect( () => {
        if( !user ) return;
        fetchApplications();
    }, [user] )
        




    return (
        <div>
            <DetailTag  />
            <EditTag  />
            <ReviewTag  />
            <div className='text-2xl' >My Applications</div>
            <div className='mt-4 flex flex-col gap-4' >
                { applications && applications.map( (application) => (
                    <div key={application._id} className='justify-between border p-4 rounded-lg flex' >

                        <div>
                            <div className='font-semibold text-lg' >Scholarship: { application.scholarshipDetails.scholarshipName }</div>
                            <div className='text-sm text-gray-600' >Status: { application.applicationStatus }</div>
                        </div>

                        <div className='flex gap-2' >
                            <div onClick={ () => showDetail( application, true) } >Detail</div>
                            { application.applicationStatus === 'completed' && <div>Review</div> }
                            { application.applicationStatus === 'pending' ? 
                                <div onClick={ () => showEdit( application, true) } >Edit</div>
                                :
                                <div className='text-gray-400' onClick={ () => showReview(application, true) } >Review</div>
                            }
                        </div>
                        
                    </div>
                )) }
            </div>
            
        </div>
    );
};

