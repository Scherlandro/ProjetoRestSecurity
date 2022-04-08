import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConteudoComponent } from './conteudo.component';
import { AdminGuard } from '../../admin/admin.guard';
import { RouteSgcpGuard } from "../../admin/routeSgcp.guard";

const routes: Routes = [
  {
    path: '',
    component: ConteudoComponent,
    children: [
      { path: '', redirectTo: 'consulta-gravame', pathMatch: 'full' },
      {
        path: 'generico/:idServico',
        loadChildren: () =>
          import('../conteudo-generico-resolver/conteudo-generico-resolver.module').then(m => m.ConteudoGenericoResolverModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-pontuacao/:numRegistro',
        loadChildren: () => import('../consulta-pontuacao/consulta-pontuacao.module').then(m => m.ConsultaPontuacaoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-veiculo/:placa/:renavam',
        loadChildren: () => import('../consulta-veiculo/consulta-veiculo.module').then(m => m.ConsultaVeiculoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-veiculo',
        loadChildren: () => import('../consulta-veiculo/consulta-veiculo.module').then(m => m.ConsultaVeiculoModule),
        canActivate: [RouteSgcpGuard]
      },
      { path: 'consulta-gravame', loadChildren: () => import('../gravame/gravame.module').then(m => m.GravameModule), canActivate: [RouteSgcpGuard] },
      {
        path: 'resultado-pesquisa/:word',
        loadChildren: () => import('../resultado-pesquisa/resultado-pesquisa.module').then(m => m.ResultadoPesquisaModule),
        canActivate: [RouteSgcpGuard]
      },
      { path: 'portaria', loadChildren: () => import('../portaria/portaria.module').then(m => m.PortariaModule), canActivate: [RouteSgcpGuard] },
      { path: 'mapa-site', loadChildren: () => import('../mapa-site/mapa-site.module').then(m => m.MapaSiteModule), canActivate: [RouteSgcpGuard] },
      { path: 'mapa-acessivel', loadChildren: () => import('../mapa-acessivel/mapa-acessivel.module').then(m => m.MapaAcessivelModule), canActivate: [RouteSgcpGuard] },
      { path: 'transparencia', loadChildren: () => import('../transparencia/transparencia.module').then(m => m.TransparenciaSiteModule), canActivate: [RouteSgcpGuard] },
      { path: 'extrato', loadChildren: () => import('../extrato/extrato.module').then(m => m.ExtratoModule) },
      {
        path: 'cfcs-credenciadas',
        loadChildren: () => import('../cfcs-credenciadas/cfcs-credenciadas.module').then(m => m.CfcsCredenciadasModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'clinicas-credenciadas',
        loadChildren: () => import('../clinicas-credenciadas/clinicas-credenciadas.module').then(m => m.ClinicasCredenciadasModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'coletores-exame',
        loadChildren: () => import('../coletores-exame/coletores-exame.module').then(m => m.ColetoresExameModule), canActivate: [RouteSgcpGuard]
      },
      {
        path: 'processo',
        loadChildren: () => import('../processo/processo.module').then(m => m.ProcessoModule), canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-processo/:etapa/:numrProcesso',
        loadChildren: () => import('../consulta-processo/consulta-processo.module').then(m => m.ConsultaProcessoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-processo/:etapa',
        loadChildren: () => import('../consulta-processo/consulta-processo.module').then(m => m.ConsultaProcessoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'informacoes-veiculo',
        loadChildren: () => import('../informacoes-veiculo/informacoes-veiculo.module').then(m => m.InformacoesVeiculoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'informacoes-cnh',
        loadChildren: () => import('../informacoes-cnh/informacoes-cnh.module').then(m => m.InformacoesCnhModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-pontuacao',
        loadChildren: () => import('../consulta-pontuacao/consulta-pontuacao.module').then(m => m.ConsultaPontuacaoModule),
        canActivate: [RouteSgcpGuard]
      },
      { path: 'gravame', loadChildren: () => import('../gravame/gravame.module').then(m => m.GravameModule), canActivate: [RouteSgcpGuard] },
      { path: 'pregao', loadChildren: () => import('../pregao/pregao.module').then(m => m.PregaoModule), canActivate: [RouteSgcpGuard] },
      { path: 'telefones', loadChildren: () => import('../telefones/telefones.module').then(m => m.TelefonesModule), canActivate: [RouteSgcpGuard] },
      {
        path: 'legislacao-aplicavel',
        loadChildren: () => import('../legislacao-aplicavel/legislacao-aplicavel.module').then(m => m.LegislacaoAplicavelModule),
        canActivate: [RouteSgcpGuard]
      },
      { path: 'segunda-via-cnh', loadChildren: () => import('../segunda-via-cnh/segunda-via-cnh.module').then(m => m.SegundaViaCnhModule), canActivate: [RouteSgcpGuard] },
      {
        path: 'consulta-divida-ativa',
        loadChildren: () => import('../consulta-divida-ativa/consulta-divida-ativa.module').then(m => m.ConsultaDividaAtivaModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'detalhar-noticia/:codigo',
        loadChildren: () => import('../detalhar-noticia/detalhar-noticia.module').then(m => m.DetalharNoticiaModule)
      },
      {
        path: 'ver-mais-noticias',
        loadChildren: () => import('../ver-mais-noticias/ver-mais-noticias.module').then(m => m.VerMaisNoticiasModule)
      },
      {
        path: 'ver-mais-secao-noticias/:secao',
        loadChildren: () => import('../ver-mais-secao-noticia/ver-mais-secao-noticia.module').then(m => m.VerMaisSecaoNoticiasModule)
      },
      { path: 'concorrencia/:codigo', loadChildren: () => import('../concorrencia/concorrencia.module').then(m => m.ConcorrenciaModule), canActivate: [RouteSgcpGuard] },
      { path: 'tomada-preco', loadChildren: () => import('../tomada-preco/tomada-preco.module').then(m => m.TomadaPrecoModule), canActivate: [RouteSgcpGuard] },
      { path: 'concurso/:codigo', loadChildren: () => import('../concurso/concurso.module').then(m => m.ConcursoModule), canActivate: [RouteSgcpGuard] },
      { path: 'convite/:codigo', loadChildren: () => import('../convite/convite.module').then(m => m.ConviteModule), canActivate: [RouteSgcpGuard] },
      {
        path: 'credenciamento/:codigo',
        loadChildren: () => import('../credenciamento/credenciamento.module').then(m => m.CredenciamentoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'contratos-firmados/:codigo',
        loadChildren: () => import('../contratos-firmados/contratos-firmados.module').then(m => m.ContratosFirmadosModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'registro-preco/:codigo',
        loadChildren: () => import('../registro-preco/registro-preco.module').then(m => m.RegistroPrecoModule), canActivate: [RouteSgcpGuard]
      },
      { path: 'leilao', loadChildren: () => import('../leilao/leilao.module').then(m => m.LeilaoModule), canActivate: [RouteSgcpGuard] },
      {
        path: 'meus-veiculos',
        loadChildren: () => import('../meus-veiculos/meus-veiculos.module').then(m => m.MeusVeiculosModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'minhas-solicitacoes/:idRequisicao',
        loadChildren: () => import('../minhas-solicitacoes/minhas-solicitacoes.module').then(m => m.MinhasSolicitacoesModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'meus-processos',
        loadChildren: () => import('../meus-processos/meus-processos.module').then(m => m.MeusProcessosModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'alterar-endereco',
        loadChildren: () => import('../alterar-endereco/alterar-endereco.module').then(m => m.AlterarEnderecoModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'certidao-propriedade',
        loadChildren: () => import('../certidao-propriedade/certidao-propriedade.module').then(m => m.CertidaoPropriedadeModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'rastreamento-crv',
        loadChildren: () => import('../rastreamento-crv-crlv/rastreamento-crv-crlv.module').then(m => m.RastreamentoCrvCrlvModule),
        canActivate: [AdminGuard]
      },
      { path: 'primeira-cnh', loadChildren: () => import('../primeira-cnh/primeira-cnh.module').then(m => m.PrimeiraCnhModule), canActivate: [RouteSgcpGuard] },
      {
        path: 'consulta-renach',
        loadChildren: () => import('../consulta-renach/consulta-renach.module').then(m => m.ConsultaRenachModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-renach/:cpf/:renach',
        loadChildren: () => import('../consulta-renach/consulta-renach.module').then(m => m.ConsultaRenachModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'solicitar-reteste',
        loadChildren: () => import('../solicitar-reteste/solicitar-reteste.module').then(m => m.SolicitarRetesteModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'transporte-escolar/:codigo',
        loadChildren: () => import('../transporte-escolar/transporte-escolar.module').then(m => m.TransporteEscolarModule),
        canActivate: [RouteSgcpGuard]
      },
      // {
      //   path: 'cartilha-renovacao-cnh/:codigo',
      //   loadChildren: '../cartilha-renovacao-cnh/cartilha-renovacao-cnh.module#CartilhaRenovacaoCnhModule'
      // },
      {
        path: 'informacoes-servicos-procuracao/:codigo',
        loadChildren: () =>
          import('../informacoes-servicos-procuracao/informacoes-servicos-procuracao.module').then(
            m => m.InformacoesServicosProcuracaoModule
          ),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'agenda-autoridade',
        loadChildren: () => import('../agenda-autoridade/agenda-autoridade.module').then(m => m.AgendaAutoridadeModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'horario-atendimento/:codigo',
        loadChildren: () => import('../horario-atendimento/horario-atendimento.module').then(m => m.HorarioAtendimentoModule),
        canActivate: [RouteSgcpGuard]
      },
      // {
      //   path: 'transferencia-pontuacao/:codigo',
      //   loadChildren: '../transferencia-pontuacao/transferencia-pontuacao.module#TransferenciaPontuacaoModule'
      // },
      {
        path: 'transferencia-pontuacao',
        loadChildren: () => import('../transferencia-pontuacao/transferencia-pontuacao.module').then(m => m.TransferenciaPontuacaoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'informacoes-processo/:codigo',
        loadChildren: () => import('../informacoes-processo/informacoes-processo.module').then(m => m.InformacoesProcessoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'missao-visao-valores/:codigo',
        loadChildren: () => import('../missao-visao-valores/missao-visao-valores.module').then(m => m.MissaoVisaoValoresModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'informacoes-comprovante-endereco/:codigo',
        loadChildren: () =>
          import('../informacoes-comprovante-endereco/informacoes-comprovante-endereco.module').then(
            m => m.InformacoesComprovanteEnderecoModule
          ),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'cnh-definitiva',
        loadChildren: () =>
          import('../cnh-definitiva/cnh-definitiva.module').then(
            m => m.CnhDefinitivaModule
          ),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-divida-ativa',
        loadChildren: () => import('../consulta-divida-ativa/consulta-divida-ativa.module').then(m => m.ConsultaDividaAtivaModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'informacoes-taxas/:codigo',
        loadChildren: () => import('../informacoes-taxas/informacoes-taxas.module').then(m => m.InformacoesTaxasModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'informacoes-multas',
        loadChildren: () => import('../informacoes-multas/informacoes-multas.module').then(m => m.InformacoesMultasModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'download/:codigo',
        loadChildren: () => import('../download/download.module').then(m => m.DownloadModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'calendario-licenciamento-ipva',
        loadChildren: () =>
          import('../calendario-licenciamento-ipva/calendario-licenciamento-ipva.module').then(m => m.CalendarioLicenciamentoIpvaModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'registro-contrato',
        loadChildren: () => import('../registro-contrato/registro-contrato.module').then(m => m.RegistroContratoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'informacoes-sobre-servicos-disponiveis',
        loadChildren: () =>
          import('../informacoes-sobre-servicos-disponiveis/informacoes-sobre-servicos-disponiveis.module').then(
            m => m.InformacoesSobreServicosDisponiveisModule
          ),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-multas-renainf',
        loadChildren: () => import('../consulta-multas-renainf/consulta-multas-renainf.module').then(m => m.ConsultaMultasRenainfModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'notificacao-autuacao',
        loadChildren: () => import('../notificacao-autuacao/notificacao-autuacao.module').then(m => m.NotificacaoAutuacaoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'duvidas-frequentes',
        loadChildren: () => import('../duvidas-frequentes/duvidas-frequentes.module').then(m => m.DuvidasFrequentesModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'curso-reciclagem',
        loadChildren: () => import('../curso-reciclagem/curso-reciclagem.module').then(m => m.CursoReciclagemModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'agendar-atendimento',
        loadChildren: () => import('../agendar-atendimento/agendar-atendimento.module').then(m => m.AgendarAtendimentoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'agendar-atendimento/:etapa',
        loadChildren: () => import('../agendar-atendimento/agendar-atendimento.module').then(m => m.AgendarAtendimentoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'agendar-atendimento/:etapa/:cpf',
        loadChildren: () => import('../agendar-atendimento/agendar-atendimento.module').then(m => m.AgendarAtendimentoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'localizacao',
        loadChildren: () => import('../localizacao/localizacao.module').then(m => m.LocalizacaoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'autoridade-monitoramento',
        loadChildren: () => import('../comissao-examinadora/comissao-examinadora.module').then(m => m.ComissaoExaminadoraModule),
      },
      {
        path: 'localizacao-vapt-vupt',
        loadChildren: () => import('../localizacao-vapt-vupt/localizacao-vapt-vupt.module').then(m => m.LocalizacaoVaptVuptModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'localizacao-vapt-vupt-interior',
        loadChildren: () =>
          import('../localizacao-vapt-vupt-interior/localizacao-vapt-vupt-interior.module').then(m => m.LocalizacaoVaptVuptInteriorModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'localizacao-ciretrans',
        loadChildren: () => import('../localizacao-ciretrans/localizacao-ciretrans.module').then(m => m.LocalizacaoCiretransModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'prontuario-cnh',
        loadChildren: () => import('../prontuario-cnh/prontuario-cnh.module').then(m => m.ProntuarioCnhModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'prontuario-cnh/:cpf/:dataNascimento/:numeroCertidao',
        loadChildren: () => import('../prontuario-cnh/prontuario-cnh.module').then(m => m.ProntuarioCnhModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'agendamento-teorico',
        loadChildren: () => import('../agendar-exame-teorico/agendar-exame-teorico.module').then(m => m.AgendamentoExameTeoricoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'edital-notificacao',
        loadChildren: () => import('../edital-notificacao/edital-notificacao.module').then(m => m.EditalNotificacaoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'parcelamento-ipva/:codigo',
        loadChildren: () => import('../parcelamento-ipva/parcelamento-ipva.module').then(m => m.ParcelamentoIpvaModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'nova-gestao',
        loadChildren: () => import('../nova-gestao/nova-gestao.module').then(m => m.NovaGestaoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'acesso-informacao',
        loadChildren: () => import('../acesso-informacao/acesso-informacao.module').then(m => m.AcessoInformacaoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'competencias',
        loadChildren: () => import('../competencias/competencias.module').then(m => m.CompetenciasModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'convenios',
        loadChildren: () => import('../convenios/convenios.module').then(m => m.ConveniosModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'classificacao-informacoes-sigilosas/:tipo',
        loadChildren: () =>
          import('../classificacao-informacoes-sigilosas/classificacao-informacoes-sigilosas.module').then(
            m => m.ClassificacaoInformacoesSigilosasModule
          ),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-registro-contrato',
        loadChildren: () =>
          import('../consulta-registro-contrato/consulta-registro-contrato.module').then(m => m.ConsultaRegistroContratoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'acessibilidade',
        loadChildren: () => import('../acessibilidade/acessibilidade.module').then(m => m.AcessibilidadeModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'ouvidoria',
        loadChildren: () => import('../ouvidoria/ouvidoria.module').then(m => m.OuvidoriaModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'nota-tecnica',
        loadChildren: () => import('../nota-tecnica/nota-tecnica.module').then(m => m.NotaTecnicaModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'alterar-senha',
        loadChildren: () => import('../alterar-senha/alterar-senha.module').then(m => m.AlterarSenhaModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'configuracoes-acesso',
        loadChildren: () => import('../configuracoes-acesso/configuracoes-acesso.module').then(m => m.ConfiguracoesAcessoModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'dados-usuario',
        loadChildren: () => import('../dados-usuario/dados-usuario.module').then(m => m.DadosUsuarioModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'avaliacao-cnh',
        loadChildren: () =>
          import('../avaliacao-parceiros-processo-cnh/avaliacao-parceiros-processo-cnh.module').then(
            m => m.AvaliacaoParceirosProcessoCnhModule
          ),
        canActivate: [AdminGuard]
      },
      {
        path: 'empresas-parcelamento',
        loadChildren: () =>
          import('../consulta-empresas-parcelamento/consulta-empresas-parcelamento.module').then(m => m.ConsultaEmpresasParcelamentoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'estampador-credenciado',
        loadChildren: () => import('../estampador-credenciado/estampador-credenciado.module').then(m => m.EstampadorCredenciadoModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'consulta-empresa-de-vistoria',
        loadChildren: () => import('../consulta-empresa-de-vistoria/consulta-empresa-de-vistoria.module').then(m => m.ConsultaEmpresaDeVistoriaModule)
      },

      {
        path: 'cnh-social',
        loadChildren: () => import('../cnh-social/cnh-social.module').then(m => m.CnhSocialModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'acompanhar-cnh-social',
        loadChildren: () => import('../acompanhar-cnh-social/acompanhar-cnh-social.module').then(m => m.AcompanharCnhSocialModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'matricula-online',
        loadChildren: () =>
          import('../passaporte-cnh-social/passaporte-cnh-social.module').then(
            m => m.PassaporteCnhSocialModule
          ),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'laudo-medico',
        loadChildren: () => import('../laudo-medico-pericial/laudo-medico-pericial.module').then(m => m.LaudoMedicoPericialModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'estampador-municipio',
        loadChildren: () => import('../estampador-municipio/estampador-municipio.module').then(m => m.EstampadorMunicipioModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'solicitar-pid',
        loadChildren: () => import('../solicitar-pid/solicitar-pid.module').then(m => m.SolicitarPidModule),
        canActivate: [RouteSgcpGuard]
      },
      {
        path: 'solicitar-credenciamento',
        loadChildren: () => import('../solicitar-credenciamento/solicitar-credenciamento.module').then(m => m.SolicitarCredenciamentoModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'resultado-exame-teorico',
        loadChildren: () => import('../resultado-exame-teorico/resultado-exame-teorico.module').then(m => m.ResultadoExameTeoricoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConteudoRoutingModule { }
