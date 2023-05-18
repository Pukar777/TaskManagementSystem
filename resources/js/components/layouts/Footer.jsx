import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const Footer = () => {
    const { error, message } = useContext(AuthContext);

    return (
        <footer>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
        </footer>
    );
};

export default Footer;
