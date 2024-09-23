import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);
  apiUrl = 'http://localhost:3001';
  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl + '/products');
  }

  postProduct(product: Product) {
    return this.httpClient.post<Product>(this.apiUrl + '/products', product);
  }

  getProductById(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/products/${productId}`);
  }

  patchProduct(productId: string,product: Product) {
    return this.httpClient.patch<Product>(`${this.apiUrl}/products/${productId}`, product);
  }

  deleteProductById(productId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/products/${productId}`);
  }
}
