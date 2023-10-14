export function calcularIdade(dataNascimento: string): number {
  const dataNascimentoDate = new Date(dataNascimento);
  const dataAtual = new Date();
  
  const anoNascimento = dataNascimentoDate.getFullYear();
  const anoAtual = dataAtual.getFullYear();
  
  let idade = anoAtual - anoNascimento;
  
  // Verificar se o aniversário já ocorreu este ano
  const mesNascimento = dataNascimentoDate.getMonth();
  const mesAtual = dataAtual.getMonth();
  const diaNascimento = dataNascimentoDate.getDate();
  const diaAtual = dataAtual.getDate();
  
  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
    idade--;
  }
  
  return idade;
}