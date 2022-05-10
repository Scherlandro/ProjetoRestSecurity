import { Injectable, EventEmitter } from '@angular/core';
import {LoginModel_T} from "../model/login-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {UsuarioModel_T} from "../model/usuario-model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

  @Injectable({
    providedIn:'root'
  })
  export class AuthService {

  list: LoginModel_T[]=[];

  private baseUrl: string = environment.API_PATH+'autenticar/login';


    private currentUserSubject: BehaviorSubject<LoginModel_T>;
    public currentUser: Observable<LoginModel_T>;

  constructor(private _http: HttpClient,
            private router: Router)

   {
    this.currentUserSubject = new BehaviorSubject<LoginModel_T>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    // console.log("CAMINHO DA URL", this.baseUrl);
  }

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();


    fazerLogin1(user: LoginModel_T): boolean {
      console.log("ObjetoLogin chegou no service", user)
      if (this._http.put<UsuarioModel_T[]>(this.baseUrl , user)!== null){
        this.router.navigate(['/user-demo/ ' + '' + user.nome_usuario + '']) ;
        return true;
      }else {
        return false;
      }
    }

    logEntrar(user: LoginModel_T):any {
      return this._http.put<any>(this.baseUrl , user)
        .pipe(map(user  => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log("Retorno do novo login", user);
          return user;
        }));
    }


    message:any;

    fazerLogin(login: LoginModel_T): any{
    const headers = new HttpHeaders({Authorization: 'Basic'
    + btoa(login.nome_usuario + ':' + login.senha)  })


     let resp =  this._http.get<LoginModel_T>(this.baseUrl, {
       headers, responseType: 'text' as 'json'})
      // .pipe(map((rest:LoginModel_T)=>rest));

      resp.subscribe(data => {
        this.message = data;
        console.log(data);
      });

      if(resp){
        this.usuarioAutenticado = true;

        this.mostrarMenuEmitter.emit(true);

        //this.baseUrl.concat('/');
        this.router.navigate(['/']);

      } else {
        this.usuarioAutenticado = false;

        this.mostrarMenuEmitter.emit(false);
      }

    }



  fazerLogin2(usuario: LoginModel_T) {

    if (usuario.nome_usuario === 'Scherlandro' &&
      usuario.senha === '1') {

      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      //this.baseUrl.concat('/');
      this.router.navigate(['/']);

    } else {
      this.usuarioAutenticado = false;

      this.mostrarMenuEmitter.emit(false);
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }



    public get currentUserValue(): LoginModel_T {
      return this.currentUserSubject.value;
    }

    login(username:string, password:string) {
      return this._http.put<any>(this.baseUrl , { username, password })
        .pipe(map(user  => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log("Retorno do novo login", user);
          return user;
        }));
    }

    logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
     // this.currentUserSubject.next(null);
    }

}
