import React from "react";



export const useUpdateScholarship = () => {
    const [ isOpen, setIsOpen ] = React.useState( false );
    const [ scholarshipData, setScholarshipData ] = React.useState( null );
    let UpdateTag = () => (
        <div
            className={`
                ${isOpen ? "flex" : "hidden"}
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full
                bg-black/40
            `}
        >
            <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow">
                Update Scholarship  
                <div className="flex justify-center gap-4" >
                    <button onClick={() => setIsOpen(false)} >Close</button>
                </div>
            </div>
        </div>
    );  
    let showUpdate = (scholarship, flag) => {
        console.log("show update")
        if( scholarship ) setScholarshipData( scholarship );
        setIsOpen( flag );
    }
    return { UpdateTag, showUpdate };
}


export const useDeleteScholarship = () => {
    const [ isOpen, setIsOpen ] = React.useState( false );
    const [ scholarshipData, setScholarshipData ] = React.useState( null );
    let DeleteTag = () => (
        <div
            className={`    
                ${isOpen ? "flex" : "hidden"}
                top-0 left-0
                fixed items-center justify-center
                z-10 w-full h-full
                bg-black/40
            `}
        >
            <div className="w-full max-w-200 bg-white p-4 rounded-lg shadow">
                Delete Scholarship  
                <div className="flex justify-center gap-4" >
                    <button onClick={() => setIsOpen(false)} >Close</button>
                </div>
            </div>
        </div>
    );
    let showDelete = (scholarship, flag) => {
        console.log("show delete")
        if( scholarship ) setScholarshipData( scholarship );
        setIsOpen( flag );
    }
    return { DeleteTag, showDelete };
}