import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { GreetingPipe } from '../pipes/greeting.pipe';
import { ProductsService } from '../services/products.service';
import { Product } from '../services/models/product';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [
    TitleCasePipe,
    CurrencyPipe,
    SlicePipe
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  products: Product[] = [];
  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }
}

// {
//   currency = 1984.54;
//   date = new Date();
//   items = of([
//     {
//       id: 1,
//       name: 'Item 1',
//     },
//     {
//       id: 2,
//       name: 'Item 2',
//     },
//   ]);
//   itemsJson = [
//     {
//       id: 1,
//       name: 'Item 1',
//     },
//     {
//       id: 2,
//       name: 'Item 2',
//     },
//   ];

//   title = 'BÜYÜK HARFLER';
//   subTitle = 'küçük harfler';

//   fullName = 'Kasım Yüksel';

//   constructor() {
//     console.log('', this.items);
//     console.log('', this.title);
//     console.log('', this.subTitle);
//   }
// }
