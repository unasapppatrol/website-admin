import axios from "axios";
import { Api } from "./apiConfig";

export const CreateUser = async (createData) => {
  try {
    const response = await axios.post(
      `${Api}/users/register_user/`,
      createData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Failed to post data:", error);
    console.log(error);
    throw new Error(error);
  }
};

export const GetUsers = async () => {
  try {
    const response = await axios.get(`${Api}/users/
    `);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const GetUser = async (userId) => {
  try {
    const response = await axios.get(`${Api}/users/${userId}`);
    return response.data.user;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${Api}/users/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (id, newData) => {
  try {
    const response = await axios.put(`${Api}/users/${id}`, newData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
