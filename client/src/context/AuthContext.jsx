import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react-router-dom";


const AuthContext = createContext()

export const AuthProvider= ({children})=>{
    const [user,setUser]=useState('')


    const login=(data)=>{
        localStorage.setItem('token',data)
        setUser(data)
    }


    return <AuthContext.Provider >
        {children}
    </AuthContext.Provider>
}

export const useAuth=useContext(AuthContext)