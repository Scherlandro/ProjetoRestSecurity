import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDiologComponent } from './components/error-diolog/error-diolog.component';
import {AppMaterialModule} from "./app-material/app-material.module";
import { DialogEditorComponent } from './components/dialog-cliente/dialog-editor.component';
import {A11yModule} from "@angular/cdk/a11y";
import {FormsModule} from "@angular/forms";
import { DialogUsuarioComponent } from './components/dialog-usuario/dialog-usuario.component';
import { DialogLoginComponent } from './components/dialog-login/dialog-login.component';



@NgModule({
  declarations: [
    ErrorDiologComponent,
    DialogEditorComponent,
    DialogUsuarioComponent,
    DialogLoginComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    A11yModule,
    FormsModule
  ],
  exports:[ErrorDiologComponent]
})
export class SharedModule { }
