import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./components/auth/AuthContext";
import { useContext } from "react";

function ProtectedRoute({ children, requiredPermissions }) {
    const { isAuthenticated, user } = useContext(AuthContext);
    if (isAuthenticated === true) {
        const hasPermission = requiredPermissions.every((permission) =>
            user.permissions.includes(permission)
        );
        if (hasPermission) {
            return children;
        }
        return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
