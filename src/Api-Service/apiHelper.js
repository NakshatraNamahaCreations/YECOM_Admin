import axios from "axios";
import { apiUrl } from "./apiConstants";

async function getData(url, params) {
  try {
    const response = await axios.get(apiUrl.BASEURL + url, { params });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function postData(url, data) {
  try {
    const response = await axios.post(apiUrl.BASEURL + url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function postFormData(url, formData) {
  try {
    const response = await axios.post(apiUrl.BASEURL + url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deleteData(url) {
  try {
    const response = await axios.delete(apiUrl.BASEURL + url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function putData(url, data) {
  try {
    const response = await axios.put(apiUrl.BASEURL + url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function putFormData(url, formData) {
  try {
    const response = await axios.put(apiUrl.BASEURL + url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export { getData, postData, postFormData, deleteData, putData, putFormData };
