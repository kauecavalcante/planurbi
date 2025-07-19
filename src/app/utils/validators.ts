// Função para validar um CPF brasileiro
export function validaCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const cpfDigits = cpf.split('').map(el => +el);
  
  const T = (cpfDigits: number[]): number => {
    let sum = 0;
    for (let i = 0; i < cpfDigits.length; i++) {
      sum += cpfDigits[i] * (cpfDigits.length + 1 - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 || remainder === 11 ? 0 : remainder;
  };

  const firstDigit = T(cpfDigits.slice(0, 9));
  if (firstDigit !== cpfDigits[9]) return false;
  
  const secondDigit = T(cpfDigits.slice(0, 10));
  if (secondDigit !== cpfDigits[10]) return false;

  return true;
}
