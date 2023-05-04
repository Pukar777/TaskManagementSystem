import { useState,useContext } from "react";
import useAuth from "./Auth";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin, error} = useAuth();
    const {isLogged} = useContext(AuthContext);

    // console.log(isLogged);


    if (isLogged == true) {
        return <Navigate to="/dashboard-react" />;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password);
    };

    return (
        // <div>
        //   <h1>Login</h1>
        //   {error && <div>{error}</div>}
        //   <form onSubmit={handleSubmit}>
        //     <div>
        //       <label htmlFor="email">Email:</label>
        //       <input
        //         type="email"
        //         id="email"
        //         value={email}
        //         onChange={(event) => setEmail(event.target.value)}
        //       />
        //     </div>
        //     <div>
        //       <label htmlFor="password">Password:</label>
        //       <input
        //         type="password"
        //         id="password"
        //         value={password}
        //         onChange={(event) => setPassword(event.target.value)}
        //       />
        //     </div>
        //     <button type="submit">Login</button>
        //   </form>
        // </div>

        <div className="row justify-content-center">
            <div className="col-md-6">
                <h1 className="row justify-content-center">Login</h1>
                {error && <div>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="my-3">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="password" className="my-3">
                            Password:
                        </label>
                        <br></br>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
