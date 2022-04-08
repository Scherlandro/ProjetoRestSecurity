import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProdutoModel_T} from "../model/produto-model";
import {Observable, of} from "rxjs/index";
import {environment} from "../../environments/environment";
import {UsuarioModel_T} from "../model/usuario-model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = environment.API_PATH + 'produtos/';
  //private readonly BASE_URL = environment.baseUrl;
  //private readonly API = `${this.BASE_URL}/products`;
  private readonly isLocal = true; //environment.isLocal;

  constructor(private _http: HttpClient) {
  }

  getTodosProdutos(): Observable<ProdutoModel_T[]> {
    return this._http.get<ProdutoModel_T[]>(this.baseUrl);
  }

  getmostrarTodos(){
    return this._http.get<ProdutoModel_T[]>(this.baseUrl);
  }
  getListarTodos(): Observable<any> {
    return this._http.get(this.baseUrl)
      .pipe(map(response => response));
  }

  getProdutoPorCod(id: string): Observable<any> {
    //return this._http.get<ProdutoModel_T[]>(`${this.baseUrl}/${id}`);
    // return this._http.get<ProdutoModel_T[]>(this.baseUrl + id)
    return this._http.get(this.baseUrl + id)
      .pipe(map(response => response));
    /*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
        .pipe(map((res: ProdutoModel_T[]) => res)) ;
     */
  }
  /*
  https://github.com/oopcoders/Bootstrap-Search-Module

   */
  search(valor: string): Observable<ProdutoModel_T[]> {
    return this._http.get<ProdutoModel_T[]>(
      this.baseUrl + valor);
    /* this.baseUrl + 'products?name_like=' + valor);   */
  }

}
  /*
   load(): Observable<ProdutoModel_T[]> {
     if (this.isLocal) {
       for (let num = 1; num <= 10; num++) {
         this.addProducts(num);
       }
       return of(this.products);
     }
     return this._http.get<ProdutoModel_T[]>(this.baseUrl);
   }

   create(record: ProdutoModel_T): Observable<ProdutoModel_T> {
     return this._http.post<ProdutoModel_T>(this.baseUrl, record);
   }

   update(record: ProdutoModel_T): Observable<ProdutoModel_T> {
     return this._http.put<ProdutoModel_T>(`${this.baseUrl}/${record.id_produto}`, record);
   }

   remove(id: string): Observable<ProdutoModel_T> {
     return this._http.delete<ProdutoModel_T>(`${this.baseUrl}/${id}`);
   }

   private addProducts(i: number): void {
     this.products.push()

     https://github.com/loiane/reactive-spring-angular/blob/388c4691e00988da301a524fd4ee474169f0ab92/angular-shopping-cart/src/app/products/services/product.service.ts

     this.products.push({
       id_produto: `${i}`,
       price: parseFloat((Math.random() * (0.0 - 10.0) + 10.0).toFixed(2)),
       status: ['', '', '', 'sale'][Math.floor(Math.random() * 4)],
       discounted: ['', '', '', 'discounted'][Math.floor(Math.random() * 4)],
       discount: parseFloat((Math.random() * (0.0 - 10.0) + 10.0).toFixed(2)),
       name: ['Coffee'][Math.floor(Math.random() * 1)],
       description: ['B & W', 'Grey', 'Black', 'Green', 'Black'][Math.floor(Math.random() * 5)],
       image: `${i}`
     });

  }

}
  */
