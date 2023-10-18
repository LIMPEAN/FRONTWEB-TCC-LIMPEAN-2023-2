import axios from "axios"

export const postAddress = async (jsonData: any, url: string, token: string) => {

  try {
    const response = await axios.post(`${url}`, jsonData, {
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