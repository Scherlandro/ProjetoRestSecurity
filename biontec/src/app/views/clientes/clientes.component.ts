import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogEditorComponent} from "../../shared/components/dialog-cliente/dialog-editor.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable} from "@angular/material/table";
import {Cliente_T} from "../../model/cliente-model";
import {FormControl} from "@angular/forms";
import {ClienteService} from "../../service/cliente.service";


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
 @ViewChild(MatTable)
 tableCliente!: MatTable<any>;
  displayedColumns: string[] = ['id_cliente', 'nome_cliente', 'pessoa', 'estado', 'opicoes'];
  dataSourceCliente$ : Cliente_T[] = [];
  clienteControl = new FormControl();
  buscaDigitada: any;

  constructor(public dialog: MatDialog, private clienteSevice: ClienteService) { }
/*    https://youtu.be/aPU1YawBWN8
     https://youtu.be/aPU1YawBWN8?t=2467
  https://github.com/cassioabl/crud-angular-web/tree/main/src/app/views/home

  https://www.youtube.com/watch?v=ZL0d3M3uoRQ
  */
  ngOnInit(): void {
  this.verifiacaServicos();
  }

  verifiacaServicos(){
   this.clienteSevice.getTodosClientes().subscribe(
     (result: Cliente_T[]) => {
       this.dataSourceCliente$ = result;
     }) ;
  }

  buscar(){
    //   https://youtu.be/YnAn7cePiMI?t=441
    if(this.clienteControl.value == ""){
      this.ngOnInit();
    }else{
      this.dataSourceCliente$ = this.dataSourceCliente$.filter(
        res => {
          return res.estado.toLocaleLowerCase()
            .match(this.clienteControl.value.toLocaleLowerCase());
        }
      )
    }
  }

  openDialogo(eventCli: Cliente_T){
    console.log("Dados do elementoDialog", eventCli)
    const dialogRef = this.dialog.open(DialogEditorComponent, {
      width: '300px',
      data: eventCli === null? {
        id_cliente: null,
        nome_cliente: '',
        pessoa: '',
        estado: ''
      }: {
        id_cliente: eventCli.id_cliente,
        nome_cliente: eventCli.nome_cliente,
        pessoa: eventCli.pessoa,
        estado: eventCli.estado
    }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.dataSourceCliente$
          .map(p => p.id_cliente).includes(result.id_cliente)) {
          this.clienteSevice.editElement(result)
            .subscribe((data: Cliente_T) => {
              const index = this.dataSourceCliente$
                .findIndex(p => p.id_cliente === data.id_cliente);
              this.dataSourceCliente$[index] = data;
              this.tableCliente.renderRows();
            });
        } else {
          this.clienteSevice.createElements(result)
            .subscribe((data: Cliente_T) => {
        this.dataSourceCliente$.push(result);
        this.tableCliente.renderRows();
            });
        }}});
  }
  changeCliente(value: any){
   this.dataSourceCliente$.filter(clientes => clientes.id_cliente.toString()
     .includes(value.toUpperCase()));
  }

  editarElement(eventCli: Cliente_T){
    this.openDialogo(eventCli);
  }

  deleteElement(position: number){
    this.dataSourceCliente$ = this.dataSourceCliente$.filter(p => p.id_cliente !== position);
  }


}
/*
 openDialogo(eventCli: Cliente_T){
    console.log("Dados do elementoDialog", eventCli)
    const dialogRef = this.dialog.open(DialogEditorComponent, {
      width: '300px',
      data: eventCli === null? {
        id_cliente: null,
        name_cliente: '',
        pessoa: '',
        estado: ''
      }: {
        id_cliente: eventCli.id_cliente,
        name_cliente: eventCli.nome_cliente,
        pessoa: eventCli.pessoa,
        estado: eventCli.estado
    }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.dataSourceCliente$
        .map(p => p.id_cliente).includes(result.id_cliente)) {
          this.clienteSevice.editElement(result)
            .subscribe((data: Cliente_T) => {
              const index = this.dataSourceCliente$
              .findIndex(p => p.id_cliente === data.id_cliente);
              this.dataSourceCliente$[index] = data;
              this.tableCliente.renderRows();
              });
         } else {
         this.clienteSevice.createElements(result)
          .subscribe((data: Cliente_T) => {
          this.dataSourceCliente$.push(data);
           this.tableCliente.renderRows();
          });
        }}});
       }
 */
