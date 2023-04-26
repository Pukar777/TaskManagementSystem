import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const config = {
    headers: {
      'Accept': 'application/json',
    }
  };
  
export const register = async (name, email, contact, address, password) => {
   
    const response = await axios.post(`${API_URL}/custom-registration`, {
        name,
        email,
        contact,
        address,
        password,
        password_confirmation: password,
    },config);
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/custom-login`, {
        email,
        password,
    },config);
    return response.data;
};

export const logout = async (accessToken) => {
    const response = await axios.post(`${API_URL}/signout`, null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    return response.data;
};

export const getUser = async (accessToken) => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
        },
    });
    return response.data;
};
