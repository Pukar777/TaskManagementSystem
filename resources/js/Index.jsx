import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <AuthProvider>
                <Router>
                    <App />
                </Router>
            </AuthProvider>
        </React.StrictMode>
    );
}
