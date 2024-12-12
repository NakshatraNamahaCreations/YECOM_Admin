import axios from "axios";
import { toast } from "react-toastify";
const API = (token) =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: { Authorization: token },
  });

let url = process.env.REACT_APP_SERVER_URL;
console.log("url", url);

export const loginUser = async (body) => {
  try {
    return await axios.post(`${url}/api/users/auth/login`, body);
  } catch (error) {
    console.log("error in loginuser api");
  }
};

export const googleAuth = async (body) => {
  try {
    return await axios.post(`${url}/api/google`, body);
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = async (body) => {
  try {
    return await axios.post(`${url}/api/users/auth/register`, body);
  } catch (error) {
    console.log("error in register api");
  }
};
export const validUser = async () => {
  try {
    const token = localStorage.getItem("userToken");

    const { data } = await API(token).get(`/api/users/auth/valid`, {
      headers: { Authorization: token },
    });

    console.log("userdata----1", data);
    return data;
  } catch (error) {
    console.log("error in valid user api");
  }
};

export const searchUsers = async (id) => {
  console.log("id----search", id);
  try {
    const token = localStorage.getItem("userToken");

    return await API(token).get(`/api/users/search?search=${id}`);
  } catch (error) {
    console.log("error in search users api");
  }
};

export const allUsers = async (token) => {
  try {
    const response = await axios.get(`${url}/api/users/api/Allusers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Any other headers you might need
      },
    });

    return response.data.allUsers;
  } catch (error) {
    console.error("Error in getting all users API:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};

export const updateUser = async (id, body) => {
  try {
    const token = localStorage.getItem("userToken");

    const { data } = await API(token).patch(`/api/users/update/${id}`, body);
    return data;
  } catch (error) {
    console.log("error in update user api");
    toast.error("Something Went Wrong.try Again!");
  }
};

// export const checkValid = async () => {
//   const data = await validUser();
//   if (!data?.user) {
//     window.location.href = "/login";
//   } else {
//     window.location.href = "/chats";
//   }
// };
