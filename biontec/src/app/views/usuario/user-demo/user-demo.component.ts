import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-demo',
  templateUrl: './user-demo.component.html',
  styleUrls: ['./user-demo.component.css']
})
export class UserDemoComponent implements OnInit {

  id: string = "";
  inscricao: Subscription = new Subscription();

  constructor(private route_: ActivatedRoute) {
    //this.id = this.route_.snapshot.params['id'];

  }

  ngOnInit() {
   this.inscricao = this.route_.params.subscribe(
      (params:any) =>{
        this.id = params['id'];
      }
    );
  }

  ngOnDestroy(){
  this.inscricao.unsubscribe();
  }
}
