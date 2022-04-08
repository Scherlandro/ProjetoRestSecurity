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
import {EstampadorComponent} from "./views/estampador/estampador.component";

const routes: Routes = [
  {path: '',component: HomeComponent },
  { path:'page_usuarios', component: UsuarioComponent },
  { path:'user-demo/:id', component: UserDemoComponent },
  {path: 'clientes', component: ClientesComponent},
  {path: 'produtos', component: ProductsComponent},
  {path: 'vendas', component: CheckoutComponent},
  {path: 'busca', component: ShoppingCartComponent },
  {path: 'estampadores', component: EstampadorComponent },
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
