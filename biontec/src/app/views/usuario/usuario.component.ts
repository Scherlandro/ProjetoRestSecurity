import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UsuarioService} from "../../service/usuario.service";
import {UsuarioModel_T} from "../../model/usuario-model";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DialogUsuarioComponent} from "../../shared/components/dialog-usuario/dialog-usuario.component";


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit  {
  displayedColumns: string[] = ['id_usuario','nome_usuario','email','senha','opicoes'];
  tbSourceUsuarios$ = new MatTableDataSource<UsuarioModel_T>();
  usuarioControl = new FormControl();
  usuariosFiltered: UsuarioModel_T[] = [];
  @ViewChild(MatTable)
  tableUser!: MatTable<any>;

  constructor(
    private userService: UsuarioService,
    public dialog: MatDialog,
    ) {  }

  ngOnInit(){
   // this.usuarioControl = new FormControl(null, [Validators.required]);
    this.verificaServicos();
  }

  verificaServicos(){
    this.userService.getUsuarios().subscribe(result => {
        this.usuariosFiltered = result;   } );
  }
  changeUsuario(value: any) {
       this.usuariosFiltered.filter(usuarios => usuarios.id.toString()
        .includes(value.toUpperCase()));
  }

  mostrarTodos(){
    this.userService.getTodosUsuarios().subscribe(
     (result: any) => {  this.tbSourceUsuarios$ = result;   })
  }

  pesquisarPorCod(codUser:string, event:any):void{
    event.preventDefault();
    if (this.usuarioControl.valid){
    this.userService.buscarPorCod(codUser.toString()).subscribe(
        (result: UsuarioModel_T[])=>{
          this.tbSourceUsuarios$.data = result;
          console.log('RETORNO PESQUISA', this.tbSourceUsuarios$.data)
        //  this.tbSourceUsuarios$.data = Object.entries(result).map( o => {
       //     return { id_usuario: o[1] }; });
        }
      )
    }
  }
  /*
  pesquisarPorCod(codUser:string, event:any):void{
    event.preventDefault();
    if (this.usuarioControl.valid){
      this.userService.getUsuarioPorCod(codUser)
          .subscribe((data: any) => {
            this.tbSourceUsuarios$ = Object.entries(data).map( o => {
             return { id_usuario: o[1] }; });
        this.tableUser.renderRows();
          });
    }
  }

  --------outra forma-----------------------
    pesquisaPorCod (cod:any){
    this.userService.buscarPorCod(cod).subscribe(res => {
     this.tbSourceUsuarios$.data = res as UsuarioModel_T[]; }) }
  ----------------------------------------
*/

  openDialogo(eventUser: UsuarioModel_T){
    console.log("Dados do elementoDialog", eventUser)
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      width: '300px',
      data: eventUser === null? {
        id: null,
        name: '',
        username: '',
        password: ''
      }: {
        id: eventUser.id,
        name: eventUser.name,
        username: eventUser.username,
        password: eventUser.password
      }
    });
/*
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.tbSourceUsuarios$
          .map(p => p.id_usuario).includes(result.id_usuario)) {
          this.userService.editarUsuario(result)
            .subscribe((data: UsuarioModel_T) => {
              const index = this.tbSourceUsuarios$
                .findIndex(p => p.id_usuario === data.id_usuario);
              this.tbSourceUsuarios$[index] = data;
              this.tableUser.renderRows();
            });
        } else {
          this.userService.createUsuario(result)
            .subscribe((data: UsuarioModel_T) => {
              this.tbSourceUsuarios$.push(result);
              this.tableUser.renderRows();
            });
        }}});
    */
  }

  editarElement(event: UsuarioModel_T){
    this.openDialogo(event);
  }

  deleteElement(id: number){
    this.userService.deleteUsuario(id)
      .subscribe((data: UsuarioModel_T) => {
        this.tableUser.renderRows();
      });
 //   this.tbSourceUsuarios$ = this.tbSourceUsuarios$.filter(p => p.id_usuario !== id);
  }

}



/*

pesquisarPorCod(codUsuario:string, event:any): void {
    event.preventDefault();
    if (this.usuarioControl.valid) {
     // this.blockUI.start();
      this.userService.getUsuarioPorCod(codUsuario).subscribe(
        (result: UsuarioModel_T[]) => {
          console.log('Resposta do getUserCOD', result);
         // this.tbSourceUsuarios$ = new MatTableDataSource(result);
          //this.etapa = 2;
       //   this.blockUI.stop();
        },
        error => {
          if (error.status === 404) {
            this.notificationService.toast.error('Erro', 'Usuario não encontrado.');
          } else {
            this.notificationService.toast.error('Erro', this.translate.instant('error.error-inesperado'));
          }
       //   this.blockUI.stop();
        }
      );
    }
  }


 mostrarTodos(){
   this.tbSourceUsuarios$ = this.userService.getTodosUsuarios()
     .pipe(
       catchError(error => {
         this.onError('Erro ao carregar usuarios.')
         return of([])
       }));
     }
      https://www.youtube.com/watch?v=gi0ZJ8-r6IM
     onError(errrorMsg: string) {
     this.dialog.open(ErrorDiologComponent, {
     data: errrorMsg
   });
 }

 consultarPorCod(codUser: string, event: any){
   event.preventDefault();
   this.tbSourceUsuarios$ = this.userService.getUsuarioPorID(codUser)
     .pipe( catchError(error => {  this.onError('Erro ao buscar usuario.')
         return of([])  }),
     tap(DebugarUser => console.log('RESUT USER por id',DebugarUser)) ); }


 searchForCod(codUser:string, event:any){
   event.preventDefault();
     https://www.youtube.com/watch?v=IrgKtm3e8Yc
   this.tbSourceUsuarios$ = this.usuarioControl.valueChanges
     .pipe(
       map(valor => valor.trim()),
       filter(valor => valor.length > 1),
       debounceTime(200),
       distinctUntilChanged(),
       switchMap(value => this.userService.getUsuarioPorCod(codUser)),
       tap((res:any)=>this.tableUser = res),
       map((res:any) => res.results)
     )
 }

 mostrarTodos(){
   this.tbSourceUsuarios$ = this.userService.getTodosUsuarios()
     .pipe(
       catchError(error => {
         this.onError('Erro ao carregar usuarios.')
         return of([])
       }));
     }
    //  https://www.youtube.com/watch?v=gi0ZJ8-r6IM
     onError(errrorMsg: string) {
     this.dialog.open(ErrorDiologComponent, {
     data: errrorMsg
   });
 }
*/







/*
  usuarios: Array<IUsuario> = new Array<IUsuario>();
  usuario: any;
  constructor(private usurioService: UsuarioServiceService) {}

  ngOnInit(): void {
    this.usuario = {};
    this.usurioService.listar().then(usuarios => console.log())
      .catch(erro => console.error(erro));
     // .subscribe(resposta => this.usuarios = resposta);
  }

  criar(frm: NgForm) {
    this.usurioService.criar(this.usuario).subscribe(resposta => {
      this.usuarios.push(resposta);

      frm.reset();
    });
  }

  //https://www.youtube.com/watch?v=ZhcYPXLGr_E
applyFilter(filterValue: string){
  console.log("1 VALOR NO FILTRO ", filterValue.toString())

  for (let i:number = 1; i <= filterValue.toUpperCase().length; i++){
    this.userService.getUsuarioPorCod(i.toString()).subscribe(
      res =>{
        console.log('VALOR NO FILTRO',res);
      }
    )
  }
}
filtrarBusca(value: any, arg: any):any{

  const reltPost = [];
  for (const post of value){
    if (post.title.indexOf(arg) > -1){
      reltPost.push(post);
    };
  };
  return reltPost;
}



*/



