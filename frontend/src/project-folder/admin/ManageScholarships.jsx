import { use, useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context";
import { useUpdateScholarship } from "./scholarshipHook.jsx";
import { AdminRoute } from "../../auth/auth.jsx";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";


export const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const { axiosInstance } = useAuthContext();
    const navigate = useNavigate();
    const [searchBy, setSearchBy] = useState("");
    const [searchPattern, setSearchPattern] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const { UpdateTag, showUpdate } = useUpdateScholarship()

    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [totalPages])

    useEffect(() => {
        SearchScholarships();
    }, [page])

    async function SearchScholarships() {
        try {
            let response = await axiosInstance.get(`/scholarship/all?searchBy=${searchBy}&searchPattern=${searchPattern}&page=${page}&limit=${limit}`);
            setScholarships(response.data.scholarships);
            setTotalPages(response.data.totalPages);
            console.log(response.data)
            toast.success("Successfully fetched")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <AdminRoute>
            <div>

                <UpdateTag />

                <div className='flex justify-between' >
                    <div className='flex gap-2' >
                        {page > 1 && <div className='button-1234' onClick={() => setPage(x => x - 1)} > Previuos </div>}
                        {totalPages && [...Array(totalPages).keys()].map(i => (
                            <div key={i} className={`p-1 cursor-pointer cen-hor ${i + 1 === page && 'button-1234'}`} onClick={() => setPage(i + 1)} >
                                {i + 1}
                            </div>
                        ))}
                        {page < totalPages && <div className='button-1234' onClick={() => setPage(x => x + 1)} >Next</div>}
                    </div>

                    <div className='flex gap-2 items-center' >
                        <FaSearch onClick={SearchScholarships} />

                        <input placeholder='Search for...' value={searchPattern} onChange={(e) => setSearchPattern(e.target.value)} />

                        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} >
                            <option value="" >Search By</option>
                            <option value="scholarshipName" >Scholarhip Name</option>
                            <option value="universityName" >University Name</option>
                            <option value="degree" >Degree</option>
                            <option value="scholarshipCategory" >Scholarship Category</option>
                            <option value="subjectCategory" >Subject Category</option>
                            <option value="location" >Location</option>
                        </select>
                    </div>
                </div>


                <div className='mt-4 flex flex-col gap-4' >
                    {scholarships && scholarships.map((scholarship) => (
                        <div key={scholarship._id} className='border p-4 rounded-lg flex justify-between items-center' >
                            <div>
                                <div className='font-semibold text-lg' >{scholarship.scholarshipName}</div>
                                <div className='text-sm text-gray-600' >{scholarship.universityName}</div>
                            </div>
                            <div className="flex gap-2" >
                                <button className='bg-[var(--color4)] text-white px-4 py-2 rounded-lg' onClick={() => showUpdate(scholarship, true)} >Manage</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminRoute>
    )
}