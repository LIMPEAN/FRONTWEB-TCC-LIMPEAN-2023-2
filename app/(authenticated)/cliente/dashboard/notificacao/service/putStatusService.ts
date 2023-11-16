import axios from "axios"

export const  putStatusService = async (url: string, json: any, token: string) => {

  try {
    const response = await axios.put(`${url}`, json, {
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