import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context";

const EditTag = ({ isOpen, application, show }) => {
    const [ education, setEducation ] = useState(null)
    const [ extras, setExtras ] = useState(null)
    const [ message, setMessage ] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {
        if(!application || !isOpen) return

        setEducation( application.education )
        setExtras( application.extras )
        setMessage( application.message )

    }, [application, isOpen])

    async function Update () {
        try {
            let res = await axiosInstance.patch( "/scholarship/application", { ...application, education, extras, message } )
            show(null, false)
            console.log(res.data)
        } catch(err) {
            console.error( err.response.data.error )
        }

    }



    if (!isOpen) return null;

    return (
        <div
            className={`
                ${isOpen ? "flex" : "hidden"}
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full
                bg-black/40
            `}
        >
            {application && <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow">
                
                <label className="block mb-3">
                    <span className="text-sm font-medium">Eduaction</span>
                    <textarea
                        type="text" value={education} onChange={(e)=> setEducation(e.target.value)}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                        placeholder="i.g. Fullbright Scholarship"
                    />
                    
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Extra Curriculars</span>
                    <textarea
                        type="text" value={extras} onChange={(e)=> setExtras(e.target.value)}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                        placeholder="i.g. Fullbright Scholarship"
                    />
                    
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Message</span>
                    <textarea
                        type="text" value={message} onChange={(e)=> setMessage(e.target.value)}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                        placeholder="i.g. Fullbright Scholarship"
                    />
                    
                </label>

                <div className="flex justify-center gap-4" >
                    { application.applicationStatus === 'pending' && <button onClick={ Update  } >Update</button>}
                    <button onClick={() => show(null, false)} >Close</button>
                </div>
            </div>}
        </div>)
};

export const useEditApplication = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [applicationData, setApplicationData] = React.useState(null);


    let showEdit = (app, flag) => {
        console.log("show edit")
        if (app) setApplicationData(app);
        setIsOpen(flag);
    }

    const Tag = () => {
        return <EditTag isOpen={isOpen} application={applicationData} show={showEdit} />
    }

    return { EditTag: Tag, showEdit };
}