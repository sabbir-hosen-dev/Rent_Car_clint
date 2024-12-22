import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

const useAuthContext = () => {
  return useContext(AuthContext)
}

export default useAuthContext