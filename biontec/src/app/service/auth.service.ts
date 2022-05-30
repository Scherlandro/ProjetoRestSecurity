import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {UsuarioModel_T} from "../model/usuario-model";
import {BehaviorSubject, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn:'root'
  })
  export class AuthService {

  private baseUrl: string = environment.API_PATH+'autenticar/';


    private currentUserSubject: BehaviorSubject<UsuarioModel_T>;
    public currentUser: Observable<UsuarioModel_T>;
    private usuarioAutenticado: boolean = false;
    mostrarMenuEmitter = new EventEmitter<boolean>();

    constructor(private _http: HttpClient,
            private router: Router)
   {
    this.currentUserSubject = new BehaviorSubject<UsuarioModel_T>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  fazerLogin(login: UsuarioModel_T){
    this._http.post<UsuarioModel_T>(this.baseUrl+'logar', login.username + login.password)
      .pipe( map(user =>{
        /*
           this._http.post<boolean>(this.baseUrl,login.username + login.password)
      .subscribe((res:boolean) =>
      this.usuarioAutenticado =  res

      );
         */

        /*
        .subscribe( res=>{
        const user = res.find((a:any)=>{
          return a.username === login.username && a.password === login.password
          });
          https://youtu.be/eMJ5spB3P1c?t=2011
         */
        if (user){
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //   localStorage.setItem('currentUser',JSON.stringify(user));
          alert("Logado com sucesso");
          this.usuarioAutenticado = true;
          this.mostrarMenuEmitter.emit(true);
          // this.router.navigate(['/user-demo/ ' + '' + user.username + '']) ;
          this.router.navigate(['/'+ '' + user.username + '']);

        } else {
          this.usuarioAutenticado = false;
          this.mostrarMenuEmitter.emit(false);
          alert("Usuario ou senha inválido");
        }
        // return user;
      }));

    }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
  public get currentUserValue(): UsuarioModel_T {
    return this.currentUserSubject.value;
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }

  login(login: UsuarioModel_T):Observable<UsuarioModel_T>{
      //return this._http.put<UsuarioModel_T>(this.baseUrl+'logar',login);
    console.log('Entrando no auth.service---> ',  `${login.username} , ${login.password}`);
    return this._http.get<UsuarioModel_T>(this.baseUrl+'logar/'+ `${login.username}, ${login.password}`)
      .pipe(map((res:UsuarioModel_T)=> res));
  }





/*

  loginExemplo(user: UsuarioModel_T):any {
      return this._http.put<any>(this.baseUrl , user)
        .pipe(map(user  => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log("Retorno do novo login", user);
          return user;
        }));
    }

    createBasicAuthToken(login: UsuarioModel_T) {
      return 'Basic ' + window.btoa(login.username + ':' + login.password);
    }




*/


}
