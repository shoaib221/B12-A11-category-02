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
        <>
            <div  >
                <div>{user.name}</div>
                <div> {user.username} </div>
            </div>

            <div className="flex gap-2">
                <select value={role} onChange={(e) => setRole( e.target.value )} >
                    <option value="admin" >Admin</option>
                    <option value="moderator" >Moderator</option>
                    <option value="student" >Student</option>
                </select>

                <button onClick={Update} >Save</button>

                <button onClick={DeleteUser} >Delete</button>
            </div>
        </>
    )
}



export const ManageUsers = () => {
    const { axiosInstance, user } = useAuthContext();



    const { data: users = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosInstance.get("/auth/users");
            console.log("refetched")
            return res.data.users;
        },
        enabled: !!user,
        staleTime: 1000 * 60, // 1 minute
    });


    async function ChangeRole(user, role) {

    }



    return (
        <AdminRoute>

            <div className="flex justify-between" >
                <div>Manage Users</div>
                <select>
                    <option value="all" >All</option>
                    <option value="admin" >Admin</option>
                    <option value="user" >User</option>

                </select>
            </div>
            <div className="flex-grow grid grid-cols-[1fr_1fr] gap-2" >
                <div>User</div>

                <div>Role</div>


                {users.map((elem) => <RoleChange refetch={refetch} user={elem} /> )}

            </div>
        </AdminRoute>
    )
}


