import axios from "axios";

const BASE_URL = "https://event-management-157g.onrender.com/api/events";


export const createEvent = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/create`, data);
        return res.data;  // return event
    } catch (err) {
        console.error("Error creating event:", err.response?.data || err.message);
        throw err;
    }
};

export const getEventsByProfile = async (profileId) => {
    const res = await axios.get(`${BASE_URL}/${profileId}`);
    return res.data;
};

export const updateEvent = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

