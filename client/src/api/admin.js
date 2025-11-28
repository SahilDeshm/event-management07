import axios from "axios";

const BASE_URL = "https://event-management-157g.onrender.com/api/admin";


export const registerAdmin =  async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/register` , data);
        return res.data;
    } catch (err) {
        console.error("Error  registeration admin" , err.response?.data || err.message);
        throw err;
    }
}

export const loginAdmin = async (cred) => {
    const res = await axios.post(`${BASE_URL}/login` , cred);
    return res.data;
}


