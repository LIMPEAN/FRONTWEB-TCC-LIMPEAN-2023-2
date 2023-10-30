import axios from "axios"
import { PutService } from "../interfaces/putService";



export const putPrice = async (jsonData: PutService, url: string, token: string) => {
  console.log("alouu");
  
  try {
    const response = await axios.put(`${url}`, jsonData, {
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