import axios from "axios";

export const getClienteId = async (url: string, token: string) => {
  console.log(url);
  
  try {
    const response = await axios.get(`${url}`, {
      headers: {
        "x-api-key": `${token}`, // Correção aqui
      },
    });
    
    console.log(response.data);
    return response.data.user[0];
  } catch (error) {
    console.error('Erro ao fazer a solicitação GET:', error);
  }
};
