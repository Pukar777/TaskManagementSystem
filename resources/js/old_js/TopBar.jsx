import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../components/auth/AuthContext";

const TopBar = () => {
    const { user, isAuthenticated } = useContext(AuthContext);

    return (
        <nav>
            <ul>
                {isAuthenticated && <Link to="/logout">Logout</Link>}
                {!isAuthenticated && <Link to="/login">Login</Link>}
                {/* !!!! VERY IMPORTANT !!!! */}
                {/* {isAuthenticated &&
                        user.permissions.includes("view_user") && (
                            <Link to="/user">User</Link>
                        )} */}
            </ul>
        </nav>
    );
};

// const TopBar = () => {
//     const navigate = useNavigate();
//     const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
//     // const cookies = document.cookie.split(";");
//     // const cookiesArr = Object.entries(cookies);
//     // let token = "";
//     // let isAuthenticated = Boolean;
//     // console.log("cookiesArr", cookiesArr[["token"]]);
//     // // console.log("cookies", cookies);
//     // // console.log(typeof cookiesArr);
//     // for (let i = 0; i < cookies.length; i++) {
//     //     const cookie = cookies[i].trim();
//     //     if (cookie.startsWith("isAuthenticated=")) {
//     //         isAuthenticated = cookie.substring("token=".length, cookie.length);
//     //         break;
//     //     }
//     // }
//     function getCookieValue(cookieName) {
//         var cookies = document.cookie.split("; ");
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i].split("=");
//             if (cookie[0] === cookieName) {
//                 return cookie[1];
//             }
//         }
//         return null;
//     }
//     var tokenValue = getCookieValue("token");
//     var isAuthenticatedValue = getCookieValue("isAuthenticated");
//     setIsAuthenticated(isAuthenticatedValue === "true");
//     console.log(isAuthenticatedValue == "true");
//     useEffect(() => {
//         if (isAuthenticated) {
//             navigate("/dashboard");
//         }
//     }, [isAuthenticated, navigate]);
//     return (
//         <>
//             <div className="cwrap">
//                 <div className="topbar">
//                     <div className="logo">
//                         <Link to="/dashboard">TMS</Link>
//                     </div>
//                     <nav>
//                         <ul>
//                             {isAuthenticated ? (
//                                 <>
//                                     {/* {navigate("/dashboard")} */}
//                                     {/* <Navigate to="/dashboard" replace={true} /> */}
//                                     {/* {console.log(isAuthenticated)} */}
//                                     <Link to="/logout">Logout</Link>
//                                 </>
//                             ) : (
//                                 <>
//                                     {/* {console.log(isAuthenticated)} */}
//                                     <Link to="/login">Login</Link>
//                                 </>
//                             )}
//                         </ul>
//                     </nav>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default TopBar;
