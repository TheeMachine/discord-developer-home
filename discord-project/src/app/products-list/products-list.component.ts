import {
  AsyncPipe,
  CommonModule,
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
import { RouterLink } from '@angular/router';
import { HighlightDirective } from '../directives/highlight.directive';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [
    TitleCasePipe,
    CurrencyPipe,
    SlicePipe,
    CommonModule,
    RouterLink,
    HighlightDirective,
    TranslocoPipe,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(private productsService: ProductsService) {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  onSearching(event: any) {
    let searchKey = event.target.value;
    if (searchKey) {
      this.filteredProducts = this.products.filter((product) =>
        product.name
          .toLocaleLowerCase('tr')
          .includes(searchKey.toLocaleLowerCase('tr'))
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  deleteProduct(productId: string) {
    this.productsService.deleteProductById(productId).subscribe((response) => {
      this.getProducts();
      console.log(response);
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
