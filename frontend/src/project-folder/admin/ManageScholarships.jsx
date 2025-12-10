import { use, useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context";
import { useUpdateScholarship } from "./scholarshipHook.jsx";
import { AdminRoute } from "../../auth/auth.jsx";


export const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const { axiosInstance } = useAuthContext();
    const { UpdateTag, showUpdate } = useUpdateScholarship();

    // Fetch scholarships on component mount    
    async function fetchScholarships() {
        let response = await axiosInstance.get("/scholarship/all");
        setScholarships(response.data.scholarships);
    }

    async function DeleteScholarship( item ) {

    }

    useEffect(() => {
        fetchScholarships();

    }, []);

    return (
        <AdminRoute>
            <div>
                
                <UpdateTag />
                <div className='text-2xl font-bold' >Manage scholarships</div>
                <div className='mt-4 flex flex-col gap-4' >
                    {scholarships && scholarships.map((scholarship) => (
                        <div key={scholarship._id} className='border p-4 rounded-lg flex justify-between items-center' >
                            <div>
                                <div className='font-semibold text-lg' >{scholarship.scholarshipName}</div>
                                <div className='text-sm text-gray-600' >{scholarship.universityName}</div>
                            </div>
                            <div className="flex gap-2" >
                                <button className='bg-yellow-700 text-white px-4 py-2 rounded-lg' onClick={() => showUpdate(scholarship, true)} >Manage</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminRoute>
    )
}