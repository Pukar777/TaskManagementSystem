// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//     const [isLogged, setIsLogged] = useState(false);
//     return (
//         <AuthContext.Provider value={{ isLogged, setIsLogged }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(
        localStorage.getItem("isLogged") === "true"
    );

    useEffect(() => {
        localStorage.setItem("isLogged", isLogged);
    }, [isLogged]);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
