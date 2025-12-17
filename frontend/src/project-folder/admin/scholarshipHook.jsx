import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context";
import { toast } from "react-toastify";


let UpdateTag = ({ isOpen, scholarship, show }) => {
    const [scholarshipName, setScholarshipName] = useState(null)
    const [universityName, setUniversityName] = useState(null)
    const [image, setImage] = useState(null)
    const [country, setCountry] = useState(null)
    const [city, setCity] = useState(null)
    const [worldRank, setWorldRank] = useState(null)
    const [subjectCategory, setSubjectCategory] = useState(null)
    const [scholarshipCategory, setScholarshipCategory] = useState(null)
    const [degree, setDegree] = useState(null)
    const [tuitionFees, setTuitionFees] = useState(null)
    const [applicationFees, setApplicationFees] = useState(null)
    const [serviceCharge, setServiceCharge] = useState(null)
    const [deadline, setDeadline] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {
        if (!scholarship) return;
        setScholarshipName(scholarship.scholarshipName)
        setUniversityName(scholarship.universityName)
        setImage(scholarship.image)
        setCountry(scholarship.country)
        setCity(scholarship.city)
        setWorldRank(scholarship.worldRank)
        setSubjectCategory(scholarship.subjectCategory)
        setScholarshipCategory(scholarship.scholarshipCategory)
        setDegree(scholarship.degree)
        setTuitionFees(scholarship.tuitionFees)
        setApplicationFees(scholarship.applicationFees)
        setServiceCharge(scholarship.serviceCharge)
        setDeadline(scholarship.deadline)
        console.log(scholarship)
    }, [scholarship])

    async function DeleteScholarship() {
        try {
            let res = await axiosInstance.delete( `/scholarship/${scholarship._id}` )
            toast.info("Successfully Deleted");
        } catch(err) {
            console.error(err);
        }
    }


    async function UpdateScholarship() {
        let info = {
            ...scholarship,
            scholarshipName, universityName, image,
            country, city, worldRank, subjectCategory, scholarshipCategory,
            degree, tuitionFees, applicationFees, serviceCharge, deadline
        }

        try {
            let res = await axiosInstance.put(`/scholarship/${scholarship._id}`, info)
            toast.success( "Updated Successfully" );
            show(null, false)
        } catch(err) {
            console.error(err.response.data.error)
        }
    }

    return (

        <div
            className={`
                ${isOpen ? "block" : "hidden"}
                top-0 left-0 overflow-auto p-4
                fixed 
                z-10 w-full h-full 
                bg-black/40
            `}
        >


            <div className="w-full mx-auto max-w-160 bg-white relative p-8 rounded-lg" >
                <div className="absolute right-4 top-4" onClick={() => show(null, false)} >
                    X
                </div>
                <br />

                <div className="font-bold mt-4 text-center text-xl" >{scholarship?.scholarshipName}</div>
                <br />

                <label>
                    <span className="font-bold" >Scholarship Name</span> <br />
                    <input className="w-full my-4"
                        value={scholarshipName} onChange={(e) => setScholarshipName(e.target.value)}  ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >Scholarship category</span> <br />
                    <input className="w-full my-4"
                        value={scholarshipCategory} onChange={(e) => setScholarshipCategory(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >Subject</span> <br />
                    <input className="w-full my-4"
                        value={subjectCategory} onChange={(e) => setSubjectCategory(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >University Name</span> <br />
                    <input className="w-full my-4"
                        value={universityName} onChange={(e) => setUniversityName(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >Image</span> <br />
                    <input className="w-full my-4"
                        value={image} onChange={(e) => setImage(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >City</span> <br />
                    <input className="w-full my-4"
                        value={city} onChange={(e) => setCity(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >Country</span> <br />
                    <input className="w-full my-4"
                        value={country} onChange={(e) => setCountry(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >World Rank</span> <br />
                    <input className="w-full my-4"
                        type="number" value={worldRank} onChange={(e) => setWorldRank(e.target.value)} ></input>
                </label>


                <br />
                <label>
                    <span className="font-bold" >Degree</span> <br />
                    <input className="w-full my-4"
                        value={degree} onChange={(e) => setDegree(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >Tuition Fees</span> <br />
                    <input className="w-full my-4"
                        type="number" value={tuitionFees} onChange={(e) => setTuitionFees(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >Application Fees</span> <br />
                    <input className="w-full my-4"
                        type="number" value={applicationFees} onChange={(e) => setApplicationFees(e.target.value)} ></input>
                </label>


                <br />
                <label>
                    <span className="font-bold" >Service Charge</span> <br />
                    <input className="w-full my-4"
                        type="number" value={serviceCharge} onChange={(e) => setServiceCharge(e.target.value)} ></input>
                </label>

                <br />
                <label>
                    <span className="font-bold" >Deadline</span> <br />
                    <input className="w-full my-4"
                        value={ new Date(deadline).toLocaleDateString() } onChange={(e) => setDeadline(e.target.value)} ></input>
                </label>

                <br />
                <br />

                <div className="flex gap-4 justify-center" >
                    <button onClick={ UpdateScholarship } className="bg-[var(--color4)] text-white py-2 px-4 rounded-xl" >Update</button>
                    <button onClick={DeleteScholarship} className="bg-red-800 text-white py-2 px-4 rounded-xl" >Delete</button>
                </div>

            </div>



        </div>
    )
};


export const useUpdateScholarship = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scholarshipData, setScholarshipData] = React.useState(null);

    let showUpdate = (scholarship, flag) => {
        console.log("show update")
        if (scholarship) setScholarshipData(scholarship);
        setIsOpen(flag);
    }

    let Tag = () => {
        return <UpdateTag isOpen={isOpen} scholarship={scholarshipData} show={showUpdate} />
    }
    return { UpdateTag: Tag, showUpdate };
}


