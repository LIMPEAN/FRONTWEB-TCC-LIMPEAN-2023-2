import axios from "axios"
import { PutService } from "../interfaces/putService";



export const putStatus = async (url: string, token: string) => {
  console.log("alouu");
  
  try {
    const response = await axios.put(`${url}`, {}, {
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