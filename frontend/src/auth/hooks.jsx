import { useContext } from "react"
import { AuthContext } from "./context"


export const useAuthContext = () => {
    return useContext(AuthContext)
}


export const useRole = () => {
    const { user } = useAuthContext()

    let role;

    return { role }

}