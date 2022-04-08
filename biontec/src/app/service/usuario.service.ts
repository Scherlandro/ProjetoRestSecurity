import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioModel_T} from "../model/usuario-model";
import {Observable} from "rxjs/index";
import {delay, first, map, tap} from "rxjs/operators";
import { ApiResponse } from '../model/api.response';
import { environment } from 'src/environments/environment';
import {MatListItem} from "@angular/material/list";

@Injectable({
  providedIn:'root'
})
export class UsuarioService {

 list: UsuarioModel_T[]=[];

  private baseUrl: string = environment.API_PATH+'usuarios/';

  constructor(private _http: HttpClient) {
   // console.log("CAMINHO DA URL", this.baseUrl);
  }

   getUsers(){
     return this._http.get(this.baseUrl).toPromise()
       .then(res => this.list = res as UsuarioModel_T[]);
   }

  getUsuarios() : Observable<UsuarioModel_T[]> {
    return this._http.get<UsuarioModel_T[]>(this.baseUrl);
  }

  getTodosUsuarios(): Observable<UsuarioModel_T[]> {
    return this._http.get<UsuarioModel_T[]>(this.baseUrl);
  }

  buscarPorCod(id: string): Observable<UsuarioModel_T[]> {
    return this._http.get<UsuarioModel_T[]>(this.baseUrl + id)
      .pipe(map((res:UsuarioModel_T[])=> res));
  }

  getUsuarioPorID(id:string){
    return this._http.get<UsuarioModel_T[]>(this.baseUrl + id)
      .pipe(
        first(),
        delay(2000),
        // https://www.youtube.com/watch?v=gi0ZJ8-r6IM
        tap(DebugarUser => console.log(DebugarUser))
      );
  }

  editarUsuario(user: UsuarioModel_T): Observable<UsuarioModel_T> {
    console.log("Evento chegou no service", user)
    return this._http.put<UsuarioModel_T>(this.baseUrl + '/editar/', user);
  }

  createUsuario(user: UsuarioModel_T): Observable<UsuarioModel_T> {
    return this._http.post<UsuarioModel_T>(this.baseUrl + '/salvar/', user);
  }

  deleteUsuario(id: number): Observable<UsuarioModel_T> {
    console.log("ID p/ deletar chegou no service", id)
    return this._http.delete<UsuarioModel_T>(this.baseUrl +'delete/'+ id);
  }

  updateUsuario(id: number, user: UsuarioModel_T): Observable<ApiResponse> {
    return this._http.put<ApiResponse>(this.baseUrl + user.id_usuario, user);
  }



  getListar():Observable<any> {
    return this._http.get<UsuarioModel_T[]>('${API_PATH} Usuarios').pipe(map((res: any) => res));
  }

  /*
 // https://www.youtube.com/watch?v=76fUSr1nSDM
  private readonly API_EX = '/assets/usuarios.json';
  listaTeste(){
    return this._http.get<UsuarioModel_T[]>(this.API_EX)
      .pipe(
        first(),
        delay(2000),
       // https://www.youtube.com/watch?v=gi0ZJ8-r6IM
        tap(DebugarUser => console.log(DebugarUser))
      );
  }
   */

  /*       Gson gson = new Gson();
           return gson.to
      https://www.tutorialsteacher.com/typescript/for-loop
       }*/


}
