import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Cliente_T} from "../model/cliente-model";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl: string = environment.API_PATH + 'clientes/';

  constructor(private _http: HttpClient) { }

  public getTodosClientes(): Observable<Cliente_T[]>{
    return this._http.get<Cliente_T[]>(this.baseUrl);
  }

  public getClientePorID(id: number): Observable<Cliente_T[]>{
    return this._http.get<Cliente_T[]>(this.baseUrl + id);
  }
  /*
  getClientePorID(id: string): Observable<any> {
    return this._http.get(this.baseUrl + id)
      .pipe(map(response => response));
}
   */

  createElements(element: Cliente_T): Observable<Cliente_T> {
    return this._http.post<Cliente_T>(this.baseUrl, element);
  }

  editElement(element: Cliente_T): Observable<Cliente_T> {
    console.log("Evento chegou no service", element)
    return this._http.put<Cliente_T>(this.baseUrl, element);
  }

  deleteElement(id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}?id=${id}`);
  }

}
