import React from "react";



export const useEditApplication = () => {
    const [ isOpen, setIsOpen ] = React.useState(false);
    const [ applicationData, setApplicationData ] = React.useState(null);

    let EditTag = () => (
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
                Edit Application
                <div className="flex justify-center gap-4" >
                    <button onClick={() => setIsOpen(false)} >Close</button>
                </div>
            </div>
        </div>
    );
    let showEdit = (app, flag) => {
        console.log("show edit")
        if( app ) setApplicationData( app );
        setIsOpen( flag );
    }
    return { EditTag, showEdit };
}