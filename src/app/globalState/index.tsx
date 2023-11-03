'use client'
import React, { createContext, useState, Dispatch,
    ReactNode,
    SetStateAction} from "react";


type  ContextType = {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

const initialState = {
    loading: false,
setLoading: ()=>{}
}

export const GlobalState = createContext<ContextType>(initialState)

export const GlobalContents = ({children}:{children:React.ReactNode}) => {
const [loading, setLoading] = useState<boolean>(false)
    return (

        <GlobalState.Provider value={{loading, setLoading}}>
            {children}
        </GlobalState.Provider>
            )
    
}