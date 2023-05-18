import axios from "axios";

document.cookie = "token=your-bearer-token; secure; httpOnly";

const cookies = document.cookie.split(";");
let token = "";

for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("token=")) {
        token = cookie.substring("token=".length, cookie.length);
        break;
    }
}

// const fetchUsers = async () => {
//     const [users, setUsers] = useState([]);

//     // localStorage.setItem("name", value);
//     // localStorage.getItem("name");
//     const userData = await user();
// };

export const user = async () => {
    const responseUser = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
            Authorization: `Bearer $(1|KgWmt11DeSOaPpR7CnXGpufqRaL5dSOswlxINNiW)`,
            Accept: "application/json",
        },
    });
    return responseUser.data;
};

export default user;
