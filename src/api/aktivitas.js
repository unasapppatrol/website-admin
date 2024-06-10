import { Api } from "./apiConfig";
import axios from "axios";

export const GetAllAktivitas = async () => {
  try {
    const response = await axios.get(
      `${Api}/aktivitas/instansi?nama_instansi=All`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAktivitas = async (id) => {
  try {
    const response = await axios.delete(`${Api}/aktivitas/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAktivitasByInstansi = async ({ nama_instansi }) => {
  try {
    const response = await axios.get(
      `${Api}/aktivitas/instansi?nama_instansi=${nama_instansi}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAktivitas = async (id, newData) => {
  try {
    const response = await axios.put(`${Api}/aktivitas/${id}`, newData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
