import { Api } from "./apiConfig";
import axios from "axios";

export const GetAbsensi = async () => {
  try {
    const response = await axios.get(`${Api}/absensi/
      `);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAbsensi = async (id) => {
  try {
    const response = await axios.delete(`${Api}/absensi/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAbsensiByLokasi = async ({ lokasi_absen }) => {
  try {
    const response = await axios.get(
      `${Api}/absensi/lokasi?lokasi_absen=${lokasi_absen}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
