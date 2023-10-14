import axios from "axios"

export const getDiaristas = async (url: string, token: string) => {

  try {
    const response = await axios.get(`${url}`, {
      
      
      headers: {
        "x-api-key": `${token}`,
      },
    }
    );

    return response.data.diarists

  } catch (error) {
    console.error('Erro ao fazer a solicitação POST:', error);
  }
  
}