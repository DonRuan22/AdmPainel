import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {Subscription} from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AddComponent } from '../add-component/add-component.component';
import {UserService,ResponseModel} from '../../services/user/user.service';

declare var $: any;

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  hasError = false;
  success = false;
  userId:any;

  constructor(private productService: ProductService,
              private userService: UserService, 
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.hasError = false;
    var user = this.userService.userData$.getValue();
    var userId:any;
    if(user){
      if('user' in user){userId = user['user']['id'];}
      else if('id' in user){userId = user['id'];}
    }
    this.userId = userId;
    this.subs.push(this.productService.getAllProductsUser(userId).subscribe((prods: any) => {
      this.products = prods.products;
      // console.log(this.products);
    }));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  deleteProduct(id: number): void {
    this.subs.push(this.productService.deleteProduct(id).subscribe(
      res => {
        if (res.status === 'failure') {
          this.hasError = true;
          this.errorMessage = res.message;
          console.log(this.errorMessage)
        }

        if (res.status === 'success') {
          this.success = true;
          this.errorMessage = res.message;
        }

        this.products = res.products;
        console.log(this.products);
        $('.alert').delay(1000).slideUp(1500);
      }
    ));
  }

  openEditForm(id: number):void {
    this.dialog.open(EditProductComponent, {width: '500px', height: '450px', data: { id_product: id },});
    this.dialog.afterAllClosed.subscribe((error:any) => { 
      this.subs.push(this.productService.getAllProductsUser(this.userId).subscribe((prods: any) => {
        if(!error){
          this.products = prods.products;
          this.success = true;
          this.errorMessage = "Produto editado com sucesso";
          $('.alert').delay(1000).slideUp(1500);
        }
        else{
          this.hasError = true;
          this.errorMessage = "Erro";
          $('.alert').delay(1000).slideUp(1500);
        }
      }));
     } );
  }

  openAddForm():void {
    this.dialog.open(AddComponent, {width: '500px', height: '450px'});
    this.dialog.afterAllClosed.subscribe((error:any) => { 
      this.subs.push(this.productService.getAllProductsUser(this.userId).subscribe((prods: any) => {
        if(!error){
          this.products = prods.products;
          this.success = true;
          this.errorMessage = "Produto adicionado com sucesso";
          $('.alert').delay(1000).slideUp(1500);
        }
        else{
          this.hasError = true;
          this.errorMessage = "Erro";
          $('.alert').delay(1000).slideUp(1500);
        }
      }));
     } );
  }

  
 
}
