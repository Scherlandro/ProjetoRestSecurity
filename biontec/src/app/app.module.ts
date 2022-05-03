import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import {AppMaterialModule} from "./shared/app-material/app-material.module";
import {SharedModule} from "./shared/shared.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AuthService} from "./service/auth.service";
import {ClientesComponent} from "./views/clientes/clientes.component";
import {CheckoutComponent} from "./views/checkout/checkout.component";
import {ShoppingCartComponent} from "./views/shopping-cart/shopping-cart.component";
import {UserDemoComponent} from "./views/usuario/user-demo/user-demo.component";
import {UsuarioComponent} from "./views/usuario/usuario.component";
import {ProductsComponent} from "./views/products/products.component";
import {AuthGuard} from "./guards/auth.guard.ts";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UserDemoComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ClientesComponent

  ],
    imports: [
        BrowserModule,
        AppRouting,
        HttpClientModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        /*
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
         */
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,

    ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
