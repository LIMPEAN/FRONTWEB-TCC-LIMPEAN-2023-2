import axios from "axios"

export const postApi = async (jsonData: any, url: string) => {
  
  console.log('***********dentro do axios***********');
  console.log(jsonData);
  console.log(url);
  
  console.log('***********dentro do axios***********');
  

  try {
    const response = await axios.post(`${url}`, jsonData);

    console.log('Resposta do servidor:', response.data);
    console.log(response.status);
    
  } catch (error) {
    console.error('Erro ao fazer a solicitação POST:', error);

  }
}