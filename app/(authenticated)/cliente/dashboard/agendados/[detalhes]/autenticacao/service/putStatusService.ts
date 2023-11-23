import axios from "axios"

export const putInitializeService = async (url: string, json: any,token: string) => {

  try {
    const response = await axios.put(`${url}`, json, {
      headers: {
        "x-api-key": `${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error
  }
}