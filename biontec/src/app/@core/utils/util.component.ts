//import { DataService } from '../services/data.service';
//import { TranslateService } from '@ngx-translate/core';
import { Injectable, Injector, isDevMode, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { ExceptionErrorProccess } from './exception.error.proccess';
import { HttpErrorResponse } from '@angular/common/http';
//import { ErrorStateMatcher, MatDialog } from '@angular/material';
//import { NotificationService } from '../../@theme/services/notification/notification.service';
import { NavigationExtras } from '@angular/router/router';
//import { AmazingTimePickerService } from 'amazing-time-picker';
//import { UtilFunction } from './util.function';
//import * as FileSaver from 'file-saver';
//import { DocumentoService } from '../services/documento.service';
//import { BlockUI, NgBlockUI } from 'ng-block-ui';
//import * as StringMask from 'string-mask';
import { BreakpointObserver } from '@angular/cdk/layout';
//import { TracerService } from '../services/tracer.service';

/** Error when invalid control is dirty, touched, or submitted. */
/*
export class CoreErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
*/
@Injectable()
export abstract class UtilComponent {
  public router: Router;
 // public fb: FormBuilder;
//  public formulario: FormGroup;
 // public dataService: DataService;
 // public utilFunction: UtilFunction;
 // public translate: TranslateService;
 // public tracerService: TracerService;
  public activatedRoute: ActivatedRoute;
 // public documentoService: DocumentoService;
 // public timePicker: AmazingTimePickerService;
//  public notificationService: NotificationService;
  private breakpointObserver: BreakpointObserver;

 // private exceptionErrorProccess: ExceptionErrorProccess;
//  public dialog: MatDialog;
 // matcher = new CoreErrorStateMatcher();
  public smallScreen = false;
  /*
  @BlockUI('blockUiContainer')
  blockUI: NgBlockUI;
*/
 // public menuPrincipalService: MenuPrincipalService;

  /**
   * @param {Injector} injector, recupera uma instância do injetor com base no token fornecido.
   */
  constructor(private injector: Injector) {
   // this.dataService = this.injector.get(DataService);
  //  this.translate = this.injector.get(TranslateService);
    this.router = this.injector.get(Router);
    this.activatedRoute = this.injector.get(ActivatedRoute);
   // this.notificationService = this.injector.get(NotificationService);
   // this.dialog = this.injector.get(MatDialog);
   // this.timePicker = this.injector.get(AmazingTimePickerService);
   // this.utilFunction = this.injector.get(UtilFunction);
  //  this.dataService.setLang(this.translate, 'pt-br');
  //  this.exceptionErrorProccess = new ExceptionErrorProccess(this.notificationService, this.translate);
   // this.documentoService = this.injector.get(DocumentoService);
    this.breakpointObserver = this.injector.get(BreakpointObserver);
  //  this.tracerService = this.injector.get(TracerService);
   // this.menuPrincipalService = this.injector.get(MenuPrincipalService);

    this.breakpointObserver.observe(['(max-width: 1000px)']).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

/*
  protected setTitle(title: string = ''): void {
    this.dataService.setTitle(this.translate, title);
  }

  protected getService<T>(obj: any): T {
    return <T>this.injector.get(obj);
  }

  openTimePicker() {
    return this.timePicker.open({
      theme: 'material-orange',
      changeToMinutes: true
    });
  }
  getParamSubscribe(fn_: (params) => any): void {
    this.activatedRoute.params.subscribe(params => {
      Promise.resolve(null).then(() => {
        fn_(params);
      });
    });
  }
  exceptionHandler(err: HttpErrorResponse | any, fn: (error) => any = null): void {
    this.exceptionErrorProccess.proccess(err, fn);
  }

  navigateHidden(commands: any[]): Promise<boolean> {
    return this.router.navigate(commands, {
      skipLocationChange: !isDevMode()
    });
  }

  navigate(commands: any[], extras: NavigationExtras = {}): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }
*/

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // https://stackoverflow.com/questions/46488078/angular-4-remove-required-validator-conditionally
  /*
  conditionalValidator(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!condition()) {
        return null;
      }
      return validator(control);
    };
  }
  showErrorMessage(error, title: string, message404: string, messageOthers: string): void {
    if (error.status === 404) {
      this.notificationService.toast.warning(title, message404);
    } else {
      this.notificationService.toast.error(title, messageOthers);
    }
  }
*/

  /**
   * @param idDocFlow : numero do idDocFlow de PRODUCAO
   * @param nomeDocumento : nome que o arquivo vai ficar ao fazer download, NAO colocar extensao no nome
   * */
 /*
  getDocumento(idDocFlow: number, nomeDocumento: string): void {
    this.blockUI.start();

    this.documentoService.getDocumentoDocFlow(idDocFlow).subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        FileSaver.saveAs(blob, `${nomeDocumento}.pdf`);

        this.blockUI.stop();
      },
      error => {
        this.showErrorMessage(
          error,
          this.translate.instant('Documento DocFlow'),
          'Nenhum documento encontrado.',
          'Serviço recuperar documento docflow indisponível.'
        );
        this.blockUI.stop();
      }
    );
  }
*/
  /**
   * @param nomeArquivo : nome que o arquivo vai ficar ao fazer download, é NECESSARIO colocar a EXTENSAO do arquivo
   * */
  /*
  getArquivo(nomeArquivo: string): void {
    this.blockUI.start();

    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/docs/' + nomeArquivo;
    link.download = nomeArquivo;
    document.body.appendChild(link);

    link.click();
    link.remove();

    this.blockUI.stop();
  }

  downloadBase64pdf(base64: string, nomeDocumento: string): void {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }

    const file = new Blob([bytes], { type: 'application/pdf' });
    FileSaver.saveAs(file, `${nomeDocumento}.pdf`);
  }

  downloadBlob(blob, nomeDocumento): void {
    FileSaver.saveAs(blob, `${nomeDocumento}.pdf`)
  }

  onKeyPressDate(event: any): void {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKeyUpDate(event: any): void {
    const cleanValue: string = this.cleanDate(event.currentTarget.value);
    const dateMask = new StringMask('00/00/0000');
    event.currentTarget.value = (dateMask.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '');
  }
  cleanDate(viewValue): string {
    if (viewValue) {
      return viewValue.replace(/[^\d]/g, '').slice(0, 8);
    } else {
      return '';
    }
  }

*/
  onClickBack(): void {
    window.history.back();
  }
/*
  verificarAcessoMobile(): boolean {
    let userAgent = navigator.userAgent || navigator.vendor || window['opera'];

    if (/windows phone/i.test(userAgent)) {
      return true;
    }

    if (/android/i.test(userAgent)) {
      return true;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window['MSStream']) {
      return true;
    }

    return false;
  }
*/
/*
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const viewportmeta = document.querySelector('meta[name=viewport]');
    viewportmeta.setAttribute('content', 'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0');
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  isStatusPreconditionFailed(error): boolean {
    return error.status === 412;
  }

  removeSpecialCharacters(param: string): string {
    return param.replace(/\'|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/g, '');
  }

  formatCpfCnpj(cpfCnpj): string {
    let cpfCnpjFormat = '';

    if (cpfCnpj.length > 11) {
      cpfCnpjFormat = cpfCnpj.replace(/([\d]{2})([\d]{3})([\d]{3})([\d]{4})([\d]{2})/g, '$1.$2.$3/$4-$5')
    } else {
      cpfCnpjFormat = cpfCnpj.replace(/([\d]{3})([\d]{3})([\d]{3})([\d]{2})/g, '$1.$2.$3-$4')
    }

    return cpfCnpjFormat;
  }

  */

}
