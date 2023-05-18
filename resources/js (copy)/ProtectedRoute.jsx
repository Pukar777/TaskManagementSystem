import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./components/auth/AuthContext";
import { useContext } from "react";

function ProtectedRoute({ children, requiredPermissions }) {
    const { isAuthenticated, user } = useContext(AuthContext);
    console.log("test");
    const hasPermission = requiredPermissions.every((permission) =>
        user.permissions.includes(permission)
    );
    console.log(user.permissions);

    if (isAuthenticated === true && hasPermission) {
        console.log("testinProtected");
        return children;
    }
    return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
