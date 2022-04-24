import {Component, Injector, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, Validators} from "@angular/forms";
import {EstampadorService} from "../../service/estampador.service";
import {EstampadorCredenciado_T} from "../../model/estampador-credenciado.model";

//import {UtilComponent} from "../../@core/utils/util.component";

@Component({
  selector: 'app-estampador',
  templateUrl: './estampador.component.html',
  styleUrls: ['./estampador.component.css']
})
export class EstampadorComponent implements OnInit {    //extends UtilComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'telefone', 'endereco', 'cidade'];
  dataConsulta = new Date();
  municipios!: string[];
  municipiosFiltered!: string[];
  estampadorDataSourceTable!: MatTableDataSource<EstampadorCredenciado_T>;

  estampadorControl!: FormControl;

  etapa = 1;

  constructor(
  private estampadorSercice: EstampadorService
  ) {
  //  (injector: Injector,) super(injector);
  }

  ngOnInit(): void {
   // this.estampadorControl = new FormControl(null, [Validators.required]);
  //  this.verificaServicos();
  }

  pesquisar(municipio:string, event:any): void {
    event.preventDefault();
    if (this.estampadorControl.valid) {
      //  this.blockUI.start();

      this.estampadorSercice.getListaEstampadores(municipio.toUpperCase()).subscribe(
        (result: any[]) => {
          this.estampadorDataSourceTable = new MatTableDataSource(result);
          this.etapa = 2;

          // this.blockUI.stop();
        },
        error => {
          if (error.status === 404) {
            //  this.notificationService.toast.error('Erro', 'Município sem estampadores credenciados.');
          } else {
            // this.notificationService.toast.error('Erro', this.translate.instant('error.error-inesperado'));
          }
          //    this.blockUI.stop();
        }
      );


    }
  }

  voltar(): void {
    if (this.etapa === 2) {
      this.etapa = 1;
    } else {
      //this.onClickBack();
    }
  }

  verificaServicos(): void {
    // this.blockUI.start();

    this.estampadorSercice.getListaMunicipios('ESTAMPADOR').subscribe(
      (result: string[]) => {
        this.municipios = result;
        this.municipiosFiltered = result;
        this.estampadorSercice.getListaEstampadores(result[0]).subscribe(
          result => {},
          error => {
            //  this.blockUI.stop();
            if (error.status === 500) {
              // this.notificationService.toast.error('Erro', this.translate.instant('error.servico-indisponivel'));
            }
          }
        );
        //  this.blockUI.stop();
      },
      error => {
        // this.blockUI.stop();
      }
    );

  }

  changeMunicipio(value: any) {
    if (value) {
      this.municipiosFiltered = this.municipios.filter(municipio => municipio.toUpperCase().includes(value.toUpperCase()));
    } else {
      this.municipiosFiltered = this.municipios;
    }
  }

}
