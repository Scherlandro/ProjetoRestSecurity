import { Injectable, Injector } from '@angular/core';
import { AbstractRestService } from '../@core/utils/abstract-rest.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';

const urlServico = 'estampadorCredenciado';

@Injectable()
export class EstampadorService extends AbstractRestService<any> {
  constructor(_http: HttpClient, injector: Injector) {
    super(_http, urlServico, injector);
  }

  getList(): Observable<any> {
    return this._http.get(this.route);
  }

  getListaMunicipios(categoria: string): Observable<string[]> {
    return this._http.get<string[]>(`${this.route}/municipios?categoria=${categoria}`)
      .pipe(map((res: string[]) => res));
  }
  /*
    buscarPorCod(id: string): Observable<UsuarioModel_T[]> {
    return this._http.get<UsuarioModel_T[]>(this.baseUrl + id)
      .pipe(map((res:UsuarioModel_T[])=> res));
  }
   */

  getListaEstampadores(municipio: string): Observable<any> {
    return this._http.get(`${this.route}/estampadores?municipio=${municipio}`)
      .pipe(map(res => res));
  }
}
