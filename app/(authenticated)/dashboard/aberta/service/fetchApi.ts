import axios from "axios"
import { log } from "console";

export const getDiaristas = async (url: string) => {
  
  try {
    const response = await axios.get(`${url}`);
    
  return response.data
    
  } catch (error) {
    console.error('Erro ao fazer a solicitação POST:', error);
  }
}