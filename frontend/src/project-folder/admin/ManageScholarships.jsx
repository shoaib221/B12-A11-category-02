import { use, useEffect, useState } from "react"
import { useAuthContext } from "../../auth/context";
import { useDeleteScholarship, useUpdateScholarship } from "./scholarshipHook";


export const ManageScholarships = () => {
    const [ scholarships, setScholarships ] = useState([])
    const { axiosInstance } = useAuthContext();
    const { DeleteTag, showDelete } = useDeleteScholarship();
    const { UpdateTag, showUpdate } = useUpdateScholarship();

    // Fetch scholarships on component mount    
    async function fetchScholarships() {
        let response = await axiosInstance.get("/scholarship/all");
        setScholarships(response.data.scholarships);
    }

    useEffect(() => {
        fetchScholarships();
    
        }, []);  

    return (
        <div>
            <DeleteTag />
            <UpdateTag />
            <div className='text-2xl font-bold' >Manage scholarships</div>
            <div className='mt-4 flex flex-col gap-4' >
                { scholarships && scholarships.map( (scholarship) => (
                    <div key={scholarship._id} className='border p-4 rounded-lg flex justify-between items-center' >
                        <div>
                            <div className='font-semibold text-lg' >{ scholarship.scholarshipName }</div>
                            <div className='text-sm text-gray-600' >{ scholarship.universityName }</div>
                        </div>
                        <div>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={ () => showDelete(scholarship, true) } >Delete</button>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={() => showUpdate(scholarship, true) } >Update</button>
                        </div>
                    </div>
                )) }
            </div>          
        </div>
    )
}