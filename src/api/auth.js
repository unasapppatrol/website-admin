import axios from "axios";
import { Api } from "./apiConfig";

export const Auth = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${Api}/auth/`,
      {
        username,
        password,
      },

      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
