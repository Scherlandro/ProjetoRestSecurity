import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { HomeComponent } from './views/home/home.component';
import {UsuarioComponent} from "./views/usuario/usuario.component";
import { LoginComponent } from './views/login/login.component';
import { UserDemoComponent } from './views/usuario/user-demo/user-demo.component';
import {AppMaterialModule} from "./shared/app-material/app-material.module";
import {SharedModule} from "./shared/shared.module";
import { ProductsComponent } from './views/products/products.component';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ClientesComponent } from './views/clientes/clientes.component';
import {MatSortModule} from "@angular/material/sort";
import { EstampadorComponent } from './views/estampador/estampador.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioComponent,
    LoginComponent,
    UserDemoComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ClientesComponent,
    EstampadorComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
