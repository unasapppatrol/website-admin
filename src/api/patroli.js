import { Api } from "./apiConfig";
import axios from "axios";

export const getPatroli = async () => {
  try {
    const response = await axios.get(`${Api}/patrol/
      `);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePatroli = async (id) => {
  try {
    const response = await axios.delete(`${Api}/patrol/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPatroliByInstansi = async ({ nama_instansi }) => {
  try {
    const response = await axios.get(
      `${Api}/patrol/instansi?nama_instansi=${nama_instansi}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePatroli = async (id, newData) => {
  try {
    const response = await axios.put(`${Api}/patrol/${id}`, newData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
