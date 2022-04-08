import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProdutoModel_T} from "../model/produto-model";
import {Observable} from "rxjs";
import {CheckoutMessage} from "../model/checkout-message";

@Injectable({
  providedIn: 'root'
})
export class CheckoutMessageService {

  private baseUrl: string = environment.API_PATH+'/orders/stream';

  constructor(private http: HttpClient) {}

  createMessage(): string {
    return this.baseUrl;
  }
}
