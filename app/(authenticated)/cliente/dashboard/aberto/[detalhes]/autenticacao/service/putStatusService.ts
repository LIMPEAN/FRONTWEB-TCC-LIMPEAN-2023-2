import axios from "axios"

export const putInitializeService = async (url: string, token: string) => {

  try {
    const response = await axios.put(`${url}`, {}, {
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