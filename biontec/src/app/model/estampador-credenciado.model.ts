export class EstampadorCredenciado_T {
  cidadeEstampadora: string;
  nomeCredenciado: string;
  telefoneDaEstampadora: string;
  enderecoCompleto: string;

  constructor(cidade: string, nome: string, telefone: string, enderecoCompleto: string) {
    this.cidadeEstampadora = cidade;
    this.nomeCredenciado = nome;
    this.telefoneDaEstampadora = telefone;
    this.enderecoCompleto = enderecoCompleto;
  }
}
