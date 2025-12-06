import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './context-style.css';
import { motion } from "framer-motion";

export const DownWindowContext = createContext();




export const DownWindowProvider = ({ children }) => {
    const [down1, setDown1] = useState(true)
    const navigate = useNavigate()
    const [ navi, selectNavi ] = useState("home")
    const location = useLocation()

    function DownWindow( wind, path) {

        setDown1( wind )
        if( path ) navigate(path)

    }

    useEffect( () => {
        //console.log("Location change")
        let path = location.pathname.toLowerCase();
        if( path.includes("add-job") ) selectNavi("add-job");
        else if( path.includes("all-jobs") ) selectNavi("all-jobs");
        else if( path.includes("my-jobs") ) selectNavi("my-jobs");
        else if( path.includes("my-task") ) selectNavi("my-task");
        else if( path.includes("job-detail") || path.includes("auth") ) selectNavi("");
        else selectNavi("home");



    }, [location?.pathname] )


    function handleResize() {
    
        if( window.innerWidth > 768 ) {
            setDown1(true)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const DownWindowTag = () => {
        
        return (
            
            <div 
                className={`${down1 ? "hidden" : "flex" } absolute z-2 h-[100%] w-[100%] bg-[var(--color1)]  flex-col items-center top-0 left-0 p-4 gap-4`} id="down-1" >
                <div onClick={() => DownWindow( true, "/")} className={ `class-1 ${navi === "home" && "active-navi" }` }  >Home</div>
                <div onClick={() => DownWindow( true, "/add-job")} className={ `class-1 ${navi === "add-job" && "active-navi" }` } >Add Job</div>
                <div onClick={() => DownWindow( true, "/all-jobs")} className={ `class-1 ${navi === "all-jobs" && "active-navi" }` } >All Jobs</div>
                <div onClick={() => DownWindow( true, "/my-jobs")} className={ `class-1 ${navi === "my-jobs" && "active-navi" }` } >My Jobs</div>
                <div onClick={() => DownWindow( true, "/my-task")} className={ `class-1 ${navi === "my-task" && "active-navi" }` } >My Tasks</div>
            </div>
        )
    }

    const LargeScreenTag = () => {
        return (
            <div className='hidden lg:flex text-[.7rem]' >
                <div onClick={() => DownWindow( true, "/")} className={ `class-1 ${navi === "home" && "active-navi" }` }  >Home</div>
                <div onClick={() => DownWindow( true, "/all-scholarships")} className={ `class-1 ${navi === "all-jobs" && "active-navi" }` } >All Scholarships</div>
                <div onClick={() => DownWindow( true, "/my-jobs")} className={ `class-1 ${navi === "my-jobs" && "active-navi" }` } >My Jobs</div>
                <div onClick={() => DownWindow( true, "/my-task")} className={ `class-1 ${navi === "my-task" && "active-navi" }` } >My Tasks</div>
            </div>
        )
    }


    return (
        <DownWindowContext.Provider value={{ LargeScreenTag, down1, setDown1, DownWindow, DownWindowTag, navi }} >
            {children}
        </DownWindowContext.Provider>
    )
}
