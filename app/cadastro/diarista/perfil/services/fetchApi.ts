import axios from "axios"

export const postApi = async (jsonData: any, url: string) => {

  try {
    const response = await axios.post(`${url}`, jsonData);
    return response.data


  } catch (error) {
    return error
    

  }


}