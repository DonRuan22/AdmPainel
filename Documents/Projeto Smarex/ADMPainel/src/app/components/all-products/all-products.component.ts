import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {Subscription} from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';

declare var $: any;

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  hasError = false;
  success = false;

  constructor(private productService: ProductService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.hasError = false;
    this.subs.push(this.productService.getAllProducts().subscribe((prods: any) => {
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
  }
 /*
  editProduct(id: number): void {
    this.subs.push(this.productService.editProduct(id).subscribe(
      res => {
        if (res.status === 'failure') {
          this.hasError = true;
          this.errorMessage = res.message;
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
    
*/
}
