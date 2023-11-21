import axios from "axios"

export const getVerifyToken = async (url: string, token: string) => {
  
  try {
    const response = await axios.get(`${url}`, {
      headers: {
        "x-api-key": `${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error
  }
}