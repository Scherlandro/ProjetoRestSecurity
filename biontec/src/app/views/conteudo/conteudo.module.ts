import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ConteudoRoutingModule } from './conteudo-routing.module';
import { ConteudoComponent } from './conteudo.component';
import { HeaderModule } from '../header/header.module';
import { BlockUIModule, HttpSettings } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { LoginModule } from '../../@core/components/login/login.module';
import { MenuService } from '../../service/menu.service';

@NgModule({
  imports: [
    SharedModule,
    BlockUIModule.forRoot({
      message: 'Carregando',
      delayStop: 1000
    }),
    BlockUIHttpModule.forRoot(<HttpSettings>{
      url: 'psw/rest/'
    }),
    ConteudoRoutingModule,
    HeaderModule,
    LoginModule
  ],
  declarations: [ConteudoComponent],
  providers: [MenuService]
})
export class ConteudoModule {}
