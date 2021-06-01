import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { Product } from '../../shared/product';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private httpClient: HttpClient) { }

  getAllOrders(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.SERVER_URL}/orders`);
  }

  getAllOrdersShop(userId): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.SERVER_URL}/orders/shop/${userId}`);
  }

  editProduct(productId, product: Product): Observable<any> {
    let id = product._id;
    let title = product.title;
    let image = product.image;
    let description = product.description;
    let quantity = product.quantity;
    let price = product.price;
    let short_description = product.short_description;
    let cat_id = product.cat_id;

    const prod_set = { id, title, image, description, quantity, price, short_description, cat_id};

    return this.httpClient.patch<{ message?: string, status: string }>(`${this.SERVER_URL}/products/update/${productId}`, prod_set)
      .pipe(
        switchMap(async (data) => {
          const prods = await this.getAllOrders().toPromise();
          return {
            ...data,
            ...prods
          };
        })
      );
  }

  addProduct(product: Product): Observable<any> {
    let title = product.title;
    let image = product.image;
    let description = product.description;
    let quantity = product.quantity;
    let price = product.price;
    let short_description = product.short_description;
    let cat_id = product.cat_id;

    const prod_set = { title, image, description, quantity, price, short_description, cat_id};
    return this.httpClient.post<{ message?: string, status: string }>(`${this.SERVER_URL}/products/add`, prod_set)
      .pipe(
        switchMap(async (data) => {
          const prods = await this.getAllOrders().toPromise();
          return {
            ...data,
            ...prods
          };
        })
      );
  }
}
