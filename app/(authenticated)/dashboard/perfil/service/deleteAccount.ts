import axios from "axios";

export const deleteAccount = async (token: string) => {
  
  try {
    const response = await axios.delete(`http://localhost:8080/v1/limpean/client/${token}`, {
      headers: {
        "x-api-key": `${token}`,
      },
    });    
    console.log(response.data);
    return response.data.message;
  } catch (error) {
    console.error('Erro ao fazer a solicitação Delete:', error);
  }
};
