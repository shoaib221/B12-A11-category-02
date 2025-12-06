import React from 'react';


export const Banner1 = () => {

    return (
        <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] gap-4 px-4' >
            <div className='h-[15rem] bg-cover bg-bottom rounded-xl' style={{ backgroundImage: "url('/banner.jpg')" }} ></div>
            <div className='flex flex-col justify-end'>
                <div className="relative overflow-hidden">

                    <motion.div
                        className="text-3xl font-bold"
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        Grab Your <span style={{ color: 'red' }}>Opportunities</span>
                    </motion.div>
                </div>

                <div className="relative overflow-hidden py-2">

                    <motion.div
                        className="text-justify italic"
                        initial={{ y: -500 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        Your gateway to endless career opportunities! Discover jobs, connect with employers, and take the next step toward your future. Start exploring and find your perfect match today!
                    </motion.div>
                </div>


                <div className="relative overflow-hidden">

                    <motion.button
                        className='cen-ver max-w-[10rem] p-2 bg-red-600 text-center font-bold text-white rounded-xl' onClick={() => navigate("/add-job")}
                        initial={{ x: -500 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        Add a job
                    </motion.button>
                </div>

            </div>
        </div>
    );
};

