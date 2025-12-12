import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context";
import { useQuery } from "@tanstack/react-query";
import { AdminRoute } from "../../auth/auth";
import { toast } from "react-toastify";



export const RoleChange = ({ user, refetch }) => {
    const [ role, setRole ] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect( () => {
        if(user)
        {
            setRole(user.role)
        }
    }, [user] )

    async function Update() {
        try {
            let res= await axiosInstance.post("/auth/change-role", { ...user, role } )
            toast.success("Role changed")
        } catch(err) {
            console.error(err.response)
        }
        
    }

    async function DeleteUser() {
        try {
            let res= await axiosInstance.delete(`/auth/user/${user._id}` )
            refetch()
            toast.success("Deleted Successfully")
        } catch(err) {
            console.error(err.response)
        }
    }

    return (
        <  >
            <div className="box-1212" >
                <div className="font-bold" >{user.name}</div>
                <div className="text-[var(--color3)]" > {user.username} </div>
            </div>

            <div className="flex gap-2 font-bold box-1212">
                <select value={role} onChange={(e) => setRole( e.target.value )} >
                    <option value="admin" >Admin</option>
                    <option value="moderator" >Moderator</option>
                    <option value="student" >Student</option>
                </select>
            </div>

            <div className="flex gap-2 box-1212" >
                <button  className="button-1234" onClick={Update} >Save</button>
                <button  className="button-1234" onClick={DeleteUser} >Delete</button>
            </div>
        </>
    )
}



export const ManageUsers = () => {
    const { axiosInstance, user } = useAuthContext();
    const [ role, setRole ] = useState("all")



    const { data: users = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/auth/users?filter=${role}`);
            console.log("refetched")
            return res.data.users;
        },
        enabled: !!user,
        staleTime: 1000 * 60, // 1 minute
    });


    async function SelectRole(role) {
        setRole(role)
        refetch();
    }



    return (
        <AdminRoute>

            <div className="flex justify-between" >
                <div className="text-2xl font-bold" >Manage Users</div>
                <select value={role} onChange={ (e) => SelectRole( e.target.value ) } >
                    <option value="all" >Filter Users</option>
                    <option value="admin" >Admin</option>
                    <option value="student" >User</option>
                    <option value="moderator" >Moderator</option>
                </select>
            </div>
            <br/>
            <div className="flex-grow grid grid-cols-[1fr_1fr_1fr] gap-6" >
                <div className="font-bold pl-6" >User</div>

                <div className="font-bold pl-6" >Role</div>

                <div className="font-bold pl-6" >Actions</div>


                {users.map((elem) => <RoleChange refetch={refetch} user={elem} /> )}

            </div>
        </AdminRoute>
    )
}


