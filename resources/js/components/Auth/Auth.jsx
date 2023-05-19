import { useState, useEffect, useContext } from "react";
import { register, login, logout, getUser } from "./Api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    // const [isLogged, setIsLogged] = useState(false);
    const { isLogged, setIsLogged } = useContext(AuthContext);
    let timeoutId;

    // console.log(isLogged);

    // useEffect(() => {
    //   console.log(isLogged); // log the updated value of isLogged
    // },[])

    // useEffect(() => {
    //     console.log('isLogged state updated:', isLogged);
    //   }, [isLogged]);

    // console.log(user);
    const handleLogin = async (email, password) => {
        try {
            const { access_token } = await login(email, password);
            const userDetails = await getUser(access_token);
            // console.log(userDetails.name);
            setUser(userDetails);
            setError(null);
            localStorage.setItem("accessToken", access_token);
            setIsLogged(true);
            // console.log(isLogged);

            navigate("/dashboard-react");

            timeoutId = setTimeout(() => {
                handleLogout();
                // alert("Session timed out");
                setTimeout(() => {
                    alert("Session timed out");
                }, 0);
            }, 30 * 60 * 1000); // 30 minutes
            // console.log(localStorage.getItem('accessToken'));
            // console.log(`login: ${timeoutId}`);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleUserActivity = () => {
        if (!isLogged) {
            // console.log(timeoutId);
            return;
        }

        if (isLogged == true) {
            clearTimeout(timeoutId);

            // Restart the timer
            // console.log(`activity: ${timeoutId}`);
            timeoutId = setTimeout(() => {
                handleLogout();
                // alert("Session timed out");
                setTimeout(() => {
                    // console.log("this triggered")
                    alert("Session timed out");
                }, 0);
            }, 30 * 60 * 1000); // 30 minutes
        }
        // Clear the session timeout timer
    };

    // Add event listeners for user activity
    // document.addEventListener("click", handleUserActivity);
    // document.addEventListener("keydown", handleUserActivity);

    useEffect(() => {
        document.addEventListener("click", handleUserActivity);
        document.addEventListener("keydown", handleUserActivity);

        return () => {
            document.removeEventListener("click", handleUserActivity);
            document.removeEventListener("keydown", handleUserActivity);
        };
    }, []);

    useEffect(() => {
        if (!isLogged) {
            document.removeEventListener("click", handleUserActivity);
            document.removeEventListener("keydown", handleUserActivity);
        }
    }, [isLogged]);

    const fetchMe = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const userDetails = await getUser(accessToken);
            setUser(userDetails);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (name, email, contact, address, password) => {
        try {
            const { access_token } = await register(
                name,
                email,
                contact,
                address,
                password
            );
            const userDetails = await getUser(access_token);
            // console.log(userDetails);
            setUser(userDetails);
            setError(null);
            localStorage.setItem("accessToken", access_token);
            setIsLogged(true);
            navigate("/dashboard-react");
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout(localStorage.getItem("accessToken"));

            setUser(null);
            localStorage.removeItem("accessToken");
            setIsLogged(false);
            // console.log(`logout: ${timeoutId}`);
            clearTimeout(timeoutId); // clear the timeout
            navigate("/login");
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return {
        user,
        setUser,
        error,
        setError,
        // isLogged,
        isLoading,
        handleLogin,
        handleRegister,
        handleLogout,
        fetchMe,
        // setIsLogged
    };
};

export default useAuth;
