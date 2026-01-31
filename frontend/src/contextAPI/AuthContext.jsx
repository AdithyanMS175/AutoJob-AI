import React, { createContext, useEffect, useState } from 'react'
export const routeGuardContext = createContext('');

function AuthContext({children}) {
    const [role,setRole] = useState("")
    const [authorisedUser,setAuthorisedUser] = useState("")

    useEffect(()=>{
        if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
            const user = JSON.parse(sessionStorage.getItem("user"))
            setRole(user.role);
            console.log(role);
            
            setAuthorisedUser(true);
        }
    },[role,authorisedUser])

  return (
    <routeGuardContext.Provider value={{role,authorisedUser,setAuthorisedUser}}>
        {children}
    </routeGuardContext.Provider>
  )
}

export default AuthContext