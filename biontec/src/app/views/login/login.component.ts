import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {UsuarioModel_T} from "../../model/usuario-model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   userModel: UsuarioModel_T = new UsuarioModel_T();
  loginControl = new FormControl();

  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;


  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';


  //login um pouco avançado
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
             // private alertService: AlertService

              ) {  // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  /*
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // obter url de retorno dos parâmetros da rota ou para '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

   */
  }



  // Login simples
  logar1(){
     this.authService.fazerLogin(this.userModel);
  }

  logar() {
    try {
      this.authService.login(this.userModel).subscribe((resp:UsuarioModel_T) => {
             alert('Jesus ---> ' + resp.username)
      });
    } catch (error) {
      console.log(error)

    }
  }

/*
  // getter para o acesso facil aos campos de formulário
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // resetando alertas
   // this.alertService.clear();

    //Se o formulário estir errado vai parar aqui
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
         // this.alertService.error(error);
          this.loading = false;
        });
  }
 */

// https://github.com/cc-cobracode/loginapp-frontend/blob/master/src/app/services/AuthService.ts

}
