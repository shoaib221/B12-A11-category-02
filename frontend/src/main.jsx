import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import "./Buttons/button.css"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { NotFound } from './miscel/NotFound.jsx';
import { Auth } from './auth/auth.jsx';
import { AuthProvider } from './auth/context.jsx';
import './Buttons/button.css';
import './Box/box.css';
import { Test } from './Test/test.jsx';
import { UpdateProfile } from './auth/UpdateProfile.jsx';
import { Home } from './project-folder/Home.jsx';
import { Entry } from './project-folder/Entry.jsx';
import { DownWindowProvider } from './Nav/context.jsx';
import { Theme } from './Theme/Theme.jsx';
import { Pagination } from './pagination/pagination.jsx';

import { ManageUsers } from './auth/ManageUsers.jsx';
import { AllScholarships } from "./project-folder/AllScholarships.jsx"
import { ScholarshipDetail } from './project-folder/ScholarshipDetail.jsx';
import { Dashboard } from './project-folder/Dashboard.jsx';
import { SuccesfulPayment, FailedPayment } from './project-folder/payment/payment.jsx'


const queryClient = new QueryClient();

const App = () => {


    return (
        <QueryClientProvider client={queryClient} >
        <BrowserRouter>
            <AuthProvider>
                <DownWindowProvider>
                    <ToastContainer />
                    <Routes>
                        <Route path='/' element={<Entry />} >
                            <Route index element={<Home />} />
                            <Route path='auth' element={<Auth />} />
                            <Route path='test' element={<Test />} />
                            <Route path='profile' element={<UpdateProfile />} />
                            <Route path='all-scholarships' element={ <AllScholarships /> } />
                            <Route path="scholarship-detail/:id" element={ <ScholarshipDetail /> } />
                            <Route path='dashboard' element={ <Dashboard /> } />
                            
                            <Route path='manage-users' element={ <ManageUsers /> } />
                            <Route path='payment_success' element={ <SuccesfulPayment /> } />
                            <Route path='payment_failed' element={ <FailedPayment /> } />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </DownWindowProvider>
            </AuthProvider>
        </BrowserRouter>
        </QueryClientProvider>
    )
}



createRoot(document.getElementById('root')).render(<App />);

