import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ProductService} from "../../service/product.service";
import {ProdutoModel_T} from "../../model/produto-model";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {ErrorDiologComponent} from "../../shared/components/error-diolog/error-diolog.component";
import {MatDialog} from "@angular/material/dialog";
import {FormArray, FormControl, NgForm, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id_produto','codigo','nome','preco','val-custo',
    'qtd', 'percentual','dt_cadastro','opicoes'];
  produtosFiltered: ProdutoModel_T[] = [];
  products: ProdutoModel_T[] = [];
  tbSourceProdutosL$ :ProdutoModel_T[]=[];
  produtoControl = new FormControl();
  searchTerm !: string;

  constructor(private prodService: ProductService,
              private cartService: ShoppingCartService,
              public dialog: MatDialog,
              private router: Router
              ) {
  }

  ngOnInit(): void {
  //  this.produtoControl = new FormControl(null,[Validators.required]);
   this.verificarServico();
   }

  listarTodosProd(){
    this.prodService.getTodosProdutos()
      .pipe(catchError(error => {
        this.onError('Erro ao buscar produto.')
        return of([])
      }))
      .subscribe((res: ProdutoModel_T[]) => {
       // this.productsList = res;
        console.log('Todos os Prod',res)
        this.tbSourceProdutosL$ = res;
      });
  }
  verificarServicos(){
    this.prodService.getTodosProdutos()
      .pipe(catchError(error => {
          this.onError('Erro ao carregar usuarios.')
          return of([])
        })
      ).subscribe( result => {
        this.produtosFiltered = result;
      }
    );
  }
  verificarServico(){
    this.prodService.getTodosProdutos().subscribe(
      (rest: ProdutoModel_T[])=>  {
        this.tbSourceProdutosL$ = rest;
      } );
  }

  consultarPorCod(codProd: string){
   // event.preventDefault();
    if (this.produtoControl.valid) {
      this.prodService.getProdutoPorCod(codProd)
        .pipe(catchError(error => {
          this.onError('Erro ao buscar produto.')
          return of([]) }))
        .subscribe((result:ProdutoModel_T[]) => {
      this.tbSourceProdutosL$ = result;
          console.log("Retorno da MatTableDat ", result )
    } )
    }
  }

  buscar(){
    //   https://youtu.be/YnAn7cePiMI?t=441
    if(this.produtoControl.value == ""){
      this.ngOnInit();
    }else{
      this.tbSourceProdutosL$ = this.tbSourceProdutosL$.filter(
        res => {
          return res.nome_produto.toLocaleLowerCase()
            .match(this.produtoControl.value.toLocaleLowerCase());
        }
      )
    }
  }

  changeProdutos(value: any){
    if (value) {
      // https://www.youtube.com/watch?v=ZhcYPXLGr_E
      this.produtosFiltered = this.products.filter(products => products.id_produto.toString()
        .includes(value.toUpperCase()));
    } else {
      this.produtosFiltered = this.products;
    }
  }

  onError(errrorMsg: string) {
    this.dialog.open(ErrorDiologComponent, {
      data: errrorMsg
    });
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }


  onSubmit(valor: string) {
    console.log('Entrada de busca' , valor)
     this.prodService.search(valor).subscribe(
      (result:ProdutoModel_T[]) => {
        this.tbSourceProdutosL$ = result;
        console.log('Retorno Search ', result);
      }
    );

   //  this.prodService.getTodosProdutos().pipe(
   //   map((options) => (options.length == 0 ? true : false))
  //  );

   // this.router.navigate(['/search-results-list']);
    //valor.resetForm();
  }





}
/*
https://youtu.be/aPU1YawBWN8
https://youtu.be/jcpS5d4yz2w
 */


/*
   addProductCart(product: ProdutoModel_T): void {
    this.cartService.addProduct();
  }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.produtoControl.value;
    if (value && (value = value.trim()) !== '') {
    const params_ = {
        search: value,
        fields: fields
      };
      let params = this.prodService.getProdutoPorCod(value.toString());
      params = params;
      params = params;
      this.tbSourceProdutos$ = this.prodService.getProdutoPorCod(value.toString())
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
      console.log('Valor cod Produto ->', this.tbSourceProdutos$);

}
}

 */
/*
  ngOnInit(): void {
    this.tbSourceProdutos$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        tap(value => console.log(value)),
        switchMap((value:string) => this.prodService.getProdutoPorCod(value.toString())) ,
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
  );
}
 */
