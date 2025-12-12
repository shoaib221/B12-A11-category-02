import React, { use, useEffect, useState } from 'react';
import './auth-style.css';
import { EmailLogin, EmailRegister } from './Email';
import { GoogleLogin } from './Google';
import { GithubLogin } from './Github';
import { useContext } from 'react';
import { AuthContext, useAuthContext } from './context';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loading } from '../miscel/Loading';
import { auth } from './firebase.config';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { Breaker } from '../miscel/Breaker';
import { toast } from 'react-toastify';
import { DownWindowContext } from '../Nav/context';
import { ForbiddenAccess } from './RestrictedRoutes.jsx';

const isValidemail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;


export const SignOut = () => {
    const { setUser, user } = useContext(AuthContext);
    const navigate = useNavigate()


    function handle() {
        signOut(auth).then(() => {
            setUser(null);
            navigate('/')
        }).catch((error) => {
            console.error(error.message)
        });
    }

    if (user) return (
        <div onClick={handle} className='p-1 text-center' >
            Sign Out
        </div>
    )
    else return <></>;
}


const LogIn = ({ toggle }) => {



    return (
        <div className='flex flex-col justify-center items-center box-1 p-4 w-full max-w-[500px]' >
            <EmailLogin />

            <Breaker message={'or'} />

            <GoogleLogin />
            {/* <GithubLogin /> */}

            <br />

            <div>
                Do not have an account? <span onClick={() => toggle('register')} className='link-1' >Register</span>
            </div>

            <div className='underline cursor-pointer' onClick={() => toggle("forgot")}  >
                Forgot Password?
            </div>
        </div>
    )
}



const Register = ({ toggle }) => {

    return (
        <div className='flex flex-col justify-center items-center box-1 p-4 w-full max-w-[500px]' >
            <EmailRegister />

            <Breaker message={'or'} />

            <GoogleLogin />
            {/* <GithubLogin /> */}

            <br />

            <div>
                Already Have an account? <span onClick={() => toggle('login')} className='link-1' >Log In</span>
            </div>

            <div className='underline cursor-pointer' onClick={() => toggle("forgot")}  >
                Forgot Password?
            </div>
        </div>
    )
}


const ForgotPassword = ({ toggle }) => {
    const [email, setEmail] = useState(null)

    function ResetPassword() {
        if (!isValidemail.test(email)) {
            toast.error('Invalid Email')
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Check your inbox for reset link")
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    }

    return (
        <div className='box-1 flex flex-col justify-center items-center gap-4 w-full max-w-[500px]' >
            <div className='text-3xl text-center font-bold' > Reset Password </div>
            <input type='email' placeholder='Type Your Email' value={email}
                onChange={(e) => setEmail(e.target.value)} className='w-full' />

            <button className='button-1' onClick={ResetPassword} >Submit</button>

            <br />

            <div onClick={() => toggle('login')} className='cursor-pointer underline' >Login Instead?</div>
            <div>Already Have An Account? <span className='cursor-pointer underline' onClick={() => toggle('register')} >Register</span> </div>
        </div>
    )
}

export const Auth = () => {
    const [login, setLogin] = useState("login");
    const { user, loading } = useContext(AuthContext);
    const { DownWindowTag } = useContext(DownWindowContext)
    const location = useLocation();
    const navigate = useNavigate();



    useEffect(() => {
        if (user) navigate(location.state || '/');
    }, [user])

    if (loading) return <Loading />

    return (
        <div className='flex flex-col justify-end items-center w-full h-full bg-cover bg-center'  >

            

            

            
            {login === "login" && <LogIn toggle={setLogin} />}
            {login === "register" && <Register toggle={setLogin} />}
            {login === "forgot" && <ForgotPassword toggle={setLogin} />}





            <DownWindowTag />
        </div>

    )
};


export const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <Loading />
    else if (!user) return <Navigate to='/auth' state={location?.pathname} />
    else return children;
}


export const AdminRoute = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();

    // 1️⃣ Still loading Firebase OR loading user.role
    if (loading) return <Loading />;

    // 2️⃣ If not logged in → redirect to auth
    if (!user) {
        return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
    }

    // 3️⃣ If user is admin → allow route
    if (user.role === "admin") {
        return children;
    }

    // 4️⃣ Logged in but not admin → forbidden page
    return <ForbiddenAccess />;
};
