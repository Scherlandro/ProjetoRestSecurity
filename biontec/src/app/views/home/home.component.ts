import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Paises_T} from "../../model/country-model";
import {PaisesService} from "../../service/paises.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
/*
Usando @input e @output
https://www.youtube.com/watch?v=s99SViKkUZM

 */

export class HomeComponent implements OnInit, AfterViewInit  {
  homeControl = new FormControl();
  skills = new FormArray([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // MatPaginator Output
  pageEvent!: PageEvent;
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 7];
  countriesFilter: Paises_T[]=[];
  countries: Paises_T[] = [];
  codDoPais!:string;
  nomeDopais!: string;

  displayedColumns: string[] = ['Bandeiras', 'Pais', 'Area', 'Population'];
  tbHomeDataSource: MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public paisesService: PaisesService) { }

  ngOnInit(): void {
  /*
   this.paisesService.getTodosPaises()
      .subscribe((data: any) => {
       this.tbHomeDataSource = new MatTableDataSource(data);
        this.tbHomeDataSource.paginator = this.paginator;
     });

   */
  }
//     https://edupala.com/how-to-implement-angular-material-table-in-angular-12/

   expandedElement: any;

  ngAfterViewInit(): void {
    this.tbHomeDataSource.sort = this.sort;
  }

  filtrarPais(value:string) {
    // em teste -----------
    if (value != null && value != ""){
    // --------------
      this.paisesService.getTodosPaises()
      .subscribe((data: any) => {
        this.tbHomeDataSource = new MatTableDataSource(data);
        // em teste ------------
          this.tbHomeDataSource.filter = value.trim().toLocaleLowerCase();
       // ---------------
        });
    }
    /*
   if (value) {
      this.countriesFilter = this.countries.filter(countries => countries.name.toString()
        .includes(value.toUpperCase()));
       }else {
      this.countriesFilter = this.countries;
    }
     */
    this.nomeDopais = value;
    console.log('Nome do pais', this.nomeDopais);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onMatSortChange() {
    this.tbHomeDataSource.sort = this.sort;
  }

  pesquisarPais(valor:string, event:any):void{
    event.preventDefault();
    console.log('1º Valor digitado ', valor);
  //  console.log('Cod do País digitado ', this.homeControl.value);
   // if (this.countries.nome_pais == valor){
    //  this.paisesService.getPaisesPorCod(this.countries.id_paises.toString())
    if (this.homeControl.value == valor){
      console.log('País digitado ', valor);
      this.paisesService.getPaisesPorCod(valor)
        .subscribe((data: any) => {
           this.tbHomeDataSource = new MatTableDataSource(data);
          console.log('Resustado id do país ', data);
        });
    }
    /*
    else if(this.homeControl.value== this.nomeDopais){
      this.paisesService.getPaisesPorNome(valor)
        .subscribe((data:any)=>{
          this.tbHomeDataSource = new MatTableDataSource(data);
          console.log('Resultado nome do País ', data);
        })
    }
      */
  }

 addSkill() {
    this.skills.push(new FormControl(''));
  }
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  prepend() {
    this.skills.insert(0, new FormControl(''));
  }

  clear() {
    this.skills.clear();
  }
}
