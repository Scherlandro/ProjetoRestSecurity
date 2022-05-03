import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuarioComponent} from "./views/usuario/usuario.component";
import {HomeComponent} from "./views/home/home.component";
import {LoginComponent} from "./views/login/login.component";
import {UserDemoComponent} from "./views/usuario/user-demo/user-demo.component";
import {ProductsComponent} from "./views/products/products.component";
import {CheckoutComponent} from "./views/checkout/checkout.component";
import {ClientesComponent} from "./views/clientes/clientes.component";
import {ShoppingCartComponent} from "./views/shopping-cart/shopping-cart.component";
import {AuthGuard} from "./guards/auth.guard.ts";

const routes: Routes = [
  {path: '',component: HomeComponent },
  { path:'page_usuarios', canActivate:[AuthGuard],
    component: UsuarioComponent },
  { path:'user-demo/:id', component: UserDemoComponent },
  {path: 'clientes', canActivate:[AuthGuard],
  component: ClientesComponent},
  {path: 'produtos', canActivate:[AuthGuard],
    component: ProductsComponent},
  {path: 'vendas', canActivate:[AuthGuard],
    component: CheckoutComponent},
  {path: 'busca', canActivate:[AuthGuard],
    component: ShoppingCartComponent },
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
