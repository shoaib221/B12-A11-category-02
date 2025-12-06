import React from 'react';
import { AdminDash } from './admin/AdminDash.jsx';
import { StudentDash } from './student/StudentDash.jsx';
import { ModeratorDash } from './moderator/ModeratorDash.jsx';
import { useAuthContext } from '../auth/context';
import { ForbiddenAccess } from '../auth/RestrictedRoutes';


export const Dashboard = () => {
    const { user } = useAuthContext()
    if (user?.role === 'admin') return <AdminDash />
    if( user?.role === 'moderator' ) return <ModeratorDash />
    if(user) return <StudentDash />
    return <ForbiddenAccess />
};

