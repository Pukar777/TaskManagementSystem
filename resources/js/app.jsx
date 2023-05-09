import "./bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Link, BrowserRouter } from "react-router-dom";
import Index from "./Index";
import { AuthProvider } from "./components/auth/AuthContext";

// import Dashboard from "./components/dashboard/DashBoard";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        </AuthProvider>
        {/* <h1>Hello World</h1> */}
    </React.StrictMode>
);

// import React, { useContext } from "react";
// import { AuthContext } from "./AuthContext";

// const ExampleComponent = () => {
//     const { isAuthenticated } = useContext(AuthContext);

//     // Example usage
//     if (isAuthenticated) {
//         // User is authenticated
//         return <p>Welcome, authenticated user!</p>;
//     } else {
//         // User is not authenticated
//         return <p>Please log in to access this content.</p>;
//     }
// };

// export default ExampleComponent;
