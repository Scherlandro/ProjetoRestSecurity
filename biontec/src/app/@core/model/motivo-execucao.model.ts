

export class MotivoExecucaoModel {

  idServico: string | undefined;
  idSessao: string | undefined;
  infoMotivo: string | undefined;
  codgChave: string | undefined;
  codgTipoChave: string | undefined;
  ip: string | undefined;
  sistema: string | undefined;

  constructor() {
    this.sistema = 'ProjetoRest';
  }

  toBase64(): string {
    return window.btoa(JSON.stringify(this));
  }
}
