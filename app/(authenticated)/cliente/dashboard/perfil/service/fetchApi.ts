import axios from "axios"
import toast from "react-hot-toast";

export const putApi = async (jsonData: any, url: string, token: string) => {

  try {
    const response = await axios.put(`${url}`, jsonData, {
      headers: {
        "x-api-key": `${token}`,
      },
    });
    return response.data
  } catch (error) {
    return error
  }
}