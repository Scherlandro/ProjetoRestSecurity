import {Component, OnDestroy, OnInit} from '@angular/core';
import {CheckoutMessage} from "../../model/checkout-message";
import {map, take} from "rxjs/operators";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {EventSourceService} from "../../service/event-source.service";
import {Subscription} from "rxjs";
import {CheckoutMessageService} from "../../service/checkout-message.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy  {

/*
https://github.com/loiane/reactive-spring-angular/tree/388c4691e00988da301a524fd4ee474169f0ab92/angular-shopping-cart/src/app/shopping-cart/checkout
 */

  private sseStream: Subscription;
  messages: CheckoutMessage[] = [];

  private orders = [
    { id: '2facf25d-b1e1-4fd6-9829-d8c7f49e33c4', color: 'blue', description: 'Order Received' },
    { id: '18a1d2ea-3652-4ef0-bbdf-576593d0fd9a', color: 'purple', description: 'Order Confirmed' },
    {
      id: '872bbaad-c9ae-4d62-9de7-f9ff3188d56a',
      color: 'pink',
      description: 'Order Being Prepared'
    },
    { id: '7468b388-88d3-469c-9426-9c32b033e92b', color: 'green', description: 'Delivered' }
  ];

  constructor(private sseService: EventSourceService, private cartService: ShoppingCartService,
              private checkoutMessage: CheckoutMessageService) {
    this.sseStream = this.sseService
      .observeMessages(`${checkoutMessage.createMessage()}/orders/stream`)
      .pipe(
        map((message: any) => {
          message.date = new Date();
          return message;
        }),
        take(4)
      )
      .subscribe((message: CheckoutMessage) => {
        this.messages.push(message);
      });
  }

  ngOnInit(): void {
    this.cartService.checkout();
  }

  ngOnDestroy(): void {
    if (this.sseStream) {
      this.sseStream.unsubscribe();
    }
  }

}
