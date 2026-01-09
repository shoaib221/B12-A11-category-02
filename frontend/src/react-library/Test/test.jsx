import React, { useContext, useEffect, useState } from 'react';
import { PrivateRoute } from '../auth/auth.jsx';
import { AuthContext } from '../auth/context.jsx';


export const Test = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    const { user, axiosInstance } = useContext(AuthContext);


    useEffect(() => {
        if (!user) return;
        axiosInstance.get('/test/auth')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                setError(err.response.data.error)
            })
    }, [user, axiosInstance])

    return (
        <PrivateRoute>
            <div className='flex flex-col gap-2' >
                {error && <p className='text-red-600' >{error}</p>}
                {data && data.map(elem => <p className='border' key={elem._id} >{elem.name}</p>)}
            </div>
        </PrivateRoute>
    );
};

