import {Component, HostListener, OnInit, ViewChild} from '@angular/core';

import {MatTable, MatTableDataSource} from "@angular/material/table";
import {FormControl, Validators} from "@angular/forms";
import {UsuarioService} from "../../service/usuario.service";
import {UsuarioModel_T} from "../../model/usuario-model";
import {Observable} from "rxjs/index";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
/*     https://mdbootstrap.com/docs/angular/tables/search/
*
*   https://www.youtube.com/watch?v=IrgKtm3e8Yc    (com Loiane)
*    */
 // @ViewChild(MdbTableDirective, {static: true}) tbShoppingCart$:MdbTableDirective;
  elements!: Observable<any>;
  shoppControl = new FormControl();
  headElements = ['ID', 'Nome', 'Email', 'Perfil'];
  searchText: string = '';
  previous!: string;

  constructor(private userService: UsuarioService){
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }
/*
  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.elements.push({
        id:i.toString(),
        first: 'Wpis' + (Math.floor(Math.random() * i * 10)).toString(),
        last: 'Last' + (Math.floor(Math.random() * i * 10)).toString(),
        handle: 'Handle' + (Math.floor(Math.random() * i * 10)).toString()
      });
    }
    this.tbShoppingCart$ = this.elements;
    this.previous = this.tbShoppingCart$;
  }
    */

  ngOnInit(){
    this.listarBusca();
   // this.verificaServicos();
  }

  verificaServicos(){
    this.userService.getUsuarios().subscribe(result => {
      this.elements.subscribe(result.values);   } );
  }
  listarBusca(){
    this.shoppControl.valueChanges
      .pipe(
        map(value => value.trim()),
    tap(value => console.log('Valor digitado',value)),
      ).subscribe();
  }

  searchItems() {
    const prev = this.elements;
    if (!this.searchText) {
      this.elements.subscribe(this.previous.toUpperCase);// = this.previous;
    }
    if (this.searchText) {
     // this.elements = this.searchText, ['id_usuario', 'nome_usuario'];
      this.elements = prev;
    }
  }
}
