import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SelectModel } from '../model/select.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ReCaptchaV3Service, ScriptService } from 'node_modules/ngx-captcha';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Injector, isDevMode, NgZone } from '@angular/core';
//import { MotivoExecucaoService } from '../../service/motivo-execucao.service';

export class AbstractRestService<T> {
  private select = new BehaviorSubject<SelectModel>(new SelectModel());
  protected reCaptchaV3Service?: ReCaptchaV3Service;
  protected localStorageService: LocalStorageService;
  protected scriptService: ScriptService;
  protected zone: NgZone;
 // protected motivoExecucaoService: MotivoExecucaoService;

  /**
   * @param {HttpClient} _http.
   * @param {string} route.
   * @param injector
   */
  constructor(protected readonly _http: HttpClient, protected readonly route: string, private injector: Injector) {
   // this.route = `${environment.URL_SERVER_API}` + '/' + route;
    this.route = `${environment.API_PATH}` + '/' + route;
    this.reCaptchaV3Service = injector.get(ReCaptchaV3Service);
    this.localStorageService = injector.get(LocalStorageService);
    this.zone = injector.get(NgZone);
    this.scriptService = injector.get(ScriptService);
   /// this.motivoExecucaoService = injector.get(MotivoExecucaoService);
  }

  /**
   * Função que permite alterar select model já em memoria na aplicação.
   */
  setSelectModel(select: SelectModel): void {
    this.select.next(select);
  }

  /**
   * Função que permite acessar select model já em memoria na aplicação.
   * @returns {Observable<SetorModel>}
   */
  getSelectModel(): SelectModel {
    return this.select.getValue();
  }

  /**
   * Chamada rest usada para trazer a lista de <T[]> para uma entidade, sem filtros adicionais, porém pode ser
   * levada apenas ativos nesta lista quando ha exclusão lógica.
   * @param {any} params.
   * @return Observable<T[]>
   */
  getList(params: any = {}): Observable<T[] | any[]> {
    return this._http
      .get(this.route, {
        params: params == null || params === undefined ? <any>{} : params
      })
      .pipe(
        map(resp => {
          return resp ? (resp as T[]) : ([] as T[]);
        })
      );
  }

  /**
   * Chamada rest usada para trazer a lista de <SelectModel> para uma entidade, sem filtros adicionais
   * @return Observable<SelectModel[]>
   */
  getListSelect(): Observable<SelectModel[]> {
    return this._http.get(`${this.route}/select`).pipe(map(resp => resp as SelectModel[]));
  }

  /**
   * Chamada rest usada para trazer <T> para uma entidade, apenas com id como filtro, porém pode ser
   * levada apenas ativos nesta lista quando ha exclusão lógica.
   * @param {number} id.
   * @return Observable<T>
   */
  get(id: number): Observable<T | any> {
    return this._http.get(this.route + '/' + id).pipe(map(resp => resp as T));
  }

  /**
   * Responsável por decidir se o recurso será persistido ou será uma alteração do existente
   * @param {any} resource.
   * @return Observable<T> com referencia do objeto persistido/alterado
   */
  save(resource: any): Observable<T | any> {
    return resource.id ? this.update(resource) : this.create(resource);
  }

  /**
   * Chamada rest usada para alterar <T>,
   * @param {any} updatedResource.
   * @return Observable<T> com referencia do objeto alterado
   */
  update(updatedResource: any): Observable<T | any> {
    return this._http.put(this.route + '/', updatedResource).pipe(map(resp => resp as T));
  }

  /**
   * Chamada rest usada para persistir <T>,
   * @param {any} newResource.
   * @return Observable<T> com referencia do objeto persistido
   */
  create(newResource: any): Observable<T | any> {
    return this._http.post(this.route + '/', newResource).pipe(map(resp => resp as T));
  }

  /**
   * Chamada rest usada para deletar <T>, passa o id do recurso como parâmetro, porém pode ser
   * usado para inativar determinado recurso(exclusao logica) ou realizar o delete real do objeto;
   * @param {any} resource.
   */
  remove(resource: any) {
    return this._http.delete(this.route, resource.id).pipe(map(resp => resp));
  }

  /**
   * Chamada rest usada para deletar <T[]>, passa a lista de ids dos recursos como parâmetro, porém podem seren
   * usados para inativar determinados recursos(exclusao logica) ou realizar o delete real dos objetos;
   * @param {number[]} listIds.
   */
  removeAll(listIds: number[]) {
    return this._http.post(this.route + '/removeAll', listIds).pipe(map(resp => resp as T[]));
  }

  /**
   * Executa reCaptcha v3 with given action and passes token via callback. You need to verify
   * this callback in your backend to get meaningful results.
   *
   * For more information see https://developers.google.com/recaptcha/docs/v3
   *
   * @param action Action to log
   * @param callback
   * @param config
   */
 /*
  execute(
    action: string,
    callback: () => void,
    config?: {
      useGlobalDomain: boolean;
    }
  ): void {
    const siteKey = environment.RECAPTCHA_PUBLIC_KEY;

    const useGlobalDomain = config && config.useGlobalDomain ? true : false;

    // clean script to make sure siteKey is set correctly (because previous script could be incorrect)
    this.scriptService.cleanup();

    this.scriptService.registerCaptchaScript(useGlobalDomain, siteKey, grecaptcha => {
      this.zone.runOutsideAngular(() => {
        grecaptcha
          .execute(siteKey, {
            action: action
          })
          .then((token: any) => {
            this.zone.run(() => {
              if (isDevMode()) {
              }
              this.localStorageService.setItem('CAPTCHA', { token: token, action: action });
              return callback();
            });
          });
      });
    });
  }

  addHeaderCaptchaV2() {
    return {
      headers: new HttpHeaders({
        'Recaptcha-Version': 'V2'
      })
    };
  }

  */
}
