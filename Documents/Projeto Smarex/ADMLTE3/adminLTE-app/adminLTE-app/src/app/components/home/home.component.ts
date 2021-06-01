import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {Subscription} from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AddComponent } from '../add-component/add-component.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { DetailedOrderComponent } from '../detailed-order/detailed-order.component';
import {SocialAuthService,SocialUser} from 'angularx-social-login';
import {UserService,ResponseModel} from '../../services/user/user.service';
import {map} from 'rxjs/operators';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  orders_table: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  hasError = false;
  success = false;
  myUser:any;

  constructor(private ordersService: OrdersService, 
              private userService: UserService, 
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.hasError = false;
    var user = this.userService.userData$.getValue();
    var userId:any;
    console.log(user);
    if(user){
      if('user' in user){userId = user['user']['id'];}
      else if('id' in user){userId = user['id'];}
    }

    this.subs.push(this.ordersService.getAllOrdersShop(userId).subscribe((orders: any) => {
      this.orders = orders;
      console.log(this.orders);
      if(this.orders.length >0){
        this.orders_table = this.orders.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
          
        console.log(this.orders_table);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  openDetailedForm(id: number):void {
    var order: any[] =[];
    order = this.orders.filter(x => x.id == id);
    this.dialog.open(DetailedOrderComponent, {width: '500px', height: '530px', data:  order});
  }

  getPrice(id: number):number{
    var order: any[] =[];
    var price:number = 0;
    order = this.orders.filter(x => x.id == id);
    for (var o of order) {
      price = price+o.price;
    }
    return price;
  }


  
 
}
