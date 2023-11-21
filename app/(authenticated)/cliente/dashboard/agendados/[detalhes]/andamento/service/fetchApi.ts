import axios from "axios"

export const postAvaliacao = async (url: string, json: any, token: string) => {

  try {
    const response = await axios.post(`${url}`, json, {
      headers: {
        "x-api-key": `${token}`,
      },
    }
    );

    return response.data

  } catch (error) {
    return error
  }
  
}