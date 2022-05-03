import {Observable} from "rxjs/index";
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router
              ) { }

  canActivate(
    rota: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean{
    if (this.authService.usuarioEstaAutenticado()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
