import { Component, Injector, OnInit } from '@angular/core';
import { UtilComponent } from '../../@core/utils/util.component';
import { MenuModel } from '../../models/menu.model';
import { UsuarioLogadoService } from '../../service/usuario-logado.service';
import { MenuService } from '../../service/menu.service';
import { DialogLoginComponent } from '../../@core/components/login/dialog-login/dialog-login.component';

@Component({
  selector: 'psw-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss', './conteudo-phones.component.scss']
})
export class ConteudoComponent extends UtilComponent implements OnInit {
  constructor(
    injector: Injector,
    private usuarioLogadoService: UsuarioLogadoService,
    private menuService: MenuService,
  ) {
    super(injector);
  }

  menus: MenuModel[];
  cpfUsuarioLogado;

  ngOnInit(): void {
    // this.menuService.carregarMenuPorRota(this.router.url).subscribe(menu => {
    //   if (menu.isRestrito &&
    //     !this.usuarioLogadoService.isUsuarioLogado()) {
    //     const dialogRef = this.dialog.open(DialogLoginComponent, {
    //       width: '944px',
    //       height: '532px',
    //       data: { title: 'É necessário realizar o login para acessar esse serviço' }
    //     });
    //     dialogRef.afterClosed().subscribe(data => {
    //       this.navigate(['/pages/pagina-inicial']);
    //     });
    //   }
    // });
    if (this.usuarioLogadoService.getCpf()) {
      this.cpfUsuarioLogado = this.usuarioLogadoService.getCpf();
    }
    setTimeout(() => {
      this.menuService.getMenuPaiPorCodigoGrupoMenu('navone').subscribe((response: MenuModel[]) => {
        this.menus = response;
      });
    }, 1000);
  }
}
