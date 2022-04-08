import { Injectable, isDevMode, OnInit } from '@angular/core';
import { MotivoExecucaoModel } from '../@core/model/motivo-execucao.model';

@Injectable({ providedIn: 'root' })
export class MotivoExecucaoService {
  private motivoExecucao: MotivoExecucaoModel = new MotivoExecucaoModel();

  constructor() {}
/*
  getIpAddress() {
    if (!this.motivoExecucao.ip) {
      setTimeout(() => {
        this.ipService.ipAdress().subscribe(res => {
          this.motivoExecucao.ip = res.ip;
        });
      }, 3000);
    }
  }

  chaves(chaves: any[]) {
    this.motivoExecucao.codgChave = chaves.join('|');
    this.motivoExecucao.codgChave = this.motivoExecucao.codgChave.substring(0, 21);
  }

  tipoChaveCpf() {
    this.motivoExecucao.codgTipoChave = TipoChaveEnum.CPF;
  }

  tipoChaveChassi() {
    this.motivoExecucao.codgTipoChave = TipoChaveEnum.CHASSI;
  }

  tipoChavePlaca() {
    this.motivoExecucao.codgTipoChave = TipoChaveEnum.PLACA;
  }

  idServico(idServico: string) {
    this.motivoExecucao.idServico = idServico;
  }

  idSessao(idSessao: string) {
    this.motivoExecucao.idSessao = idSessao;
  }

  toBase64(): string {
    return this.motivoExecucao.toBase64();
  }
  */
}
