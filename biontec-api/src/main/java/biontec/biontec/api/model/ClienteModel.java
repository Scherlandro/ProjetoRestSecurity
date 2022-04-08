package biontec.biontec.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "cliente")
public class ClienteModel {

 @Id
 private Integer id_cliente;

 @Column(nullable = false, length = 50)
 private String nome_cliente;

 @Column(nullable = false, length = 50)
 private String inscricaoest;

 @Column(nullable = false, length = 25)
 private String pessoa;

 @Column(nullable = false, length = 20)
 private String cpf;
 @Column(nullable = false, length = 45)
 private String cnpj;

 @Column(nullable = false, length = 35)
 private String cep;

 @Column(nullable = false, length = 60)
 private String logradouro;

 @Column(nullable = false, length = 15)
 private Integer numero;

 @Column(nullable = false, length = 50)
 private String bairro;

 @Column(nullable = false, length = 45)
 private String cidade;

 @Column(nullable = false, length = 35)
 private String estado;

 @Column(nullable = false, length = 30)
 private String telefone;

 @Column(nullable = false, length = 30)
 private String celular;

 @Column(nullable = false, length = 30)
 private String zap;

 public Integer getId_cliente() {
  return id_cliente;
 }

 public void setId_cliente(Integer id_cliente) {
  this.id_cliente = id_cliente;
 }

 public String getNome_cliente() {
  return nome_cliente;
 }

 public void setNome_cliente(String nome_cliente) {
  this.nome_cliente = nome_cliente;
 }

 public String getInscricaoest() {
  return inscricaoest;
 }

 public void setInscricaoest(String inscricaoest) {
  this.inscricaoest = inscricaoest;
 }

 public String getPessoa() {
  return pessoa;
 }

 public void setPessoa(String pessoa) {
  this.pessoa = pessoa;
 }

 public String getCpf() {
  return cpf;
 }

 public void setCpf(String cpf) {
  this.cpf = cpf;
 }

 public String getCnpj() {
  return cnpj;
 }

 public void setCnpj(String cnpj) {
  this.cnpj = cnpj;
 }

 public String getCep() {
  return cep;
 }

 public void setCep(String cep) {
  this.cep = cep;
 }

 public String getLogradouro() {
  return logradouro;
 }

 public void setLogradouro(String logradouro) {
  this.logradouro = logradouro;
 }

 public Integer getNumero() {
  return numero;
 }

 public void setNumero(Integer numero) {
  this.numero = numero;
 }

 public String getBairro() {
  return bairro;
 }

 public void setBairro(String bairro) {
  this.bairro = bairro;
 }

 public String getCidade() {
  return cidade;
 }

 public void setCidade(String cidade) {
  this.cidade = cidade;
 }

 public String getEstado() {
  return estado;
 }

 public void setEstado(String estado) {
  this.estado = estado;
 }

 public String getTelefone() {
  return telefone;
 }

 public void setTelefone(String telefone) {
  this.telefone = telefone;
 }

 public String getCelular() {
  return celular;
 }

 public void setCelular(String celular) {
  this.celular = celular;
 }

 public String getZap() {
  return zap;
 }

 public void setZap(String zap) {
  this.zap = zap;
 }
}