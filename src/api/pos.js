import axios from "axios";
import { Api } from "./apiConfig";

export const CreatePos = async ({ nama_instansi, lokasi_barcode }) => {
  try {
    const response = await axios.post(
      `${Api}/pos/`,
      {
        nama_instansi,
        lokasi_barcode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to post data:", error);
    throw new Error(error);
  }
};
export const GetPos = async () => {
  try {
    const response = await axios.get(`${Api}/pos/
      `);
    return response.data.pos;
  } catch (error) {
    throw new Error(error);
  }
};

export const GetPosByInstansi = async ({ lokasi_pos }) => {
  try {
    const response = await axios.get(
      `${Api}/pos/lokasi?lokasi_pos=${lokasi_pos}`
    );
    return response.data.pos;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePos = async (id) => {
  try {
    const response = await axios.delete(`${Api}/pos/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePos = async (id, editData) => {
  try {
    const response = await axios.put(`${Api}/pos/${id}`, editData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
