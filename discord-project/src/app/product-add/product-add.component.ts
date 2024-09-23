import { JsonPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../services/models/product';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'product-add',
  standalone: true,
  imports: [JsonPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent implements OnInit {
  formBuilder = inject(UntypedFormBuilder);
  productService = inject(ProductsService);
  router = inject(Router);
  globalService = inject(GlobalService);
  @Input() productId: string = '';
  product: Product = new Product();

  ngOnInit(): void {
    this.getProductDetail();
  }

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', []],
    price: [0, [Validators.required, Validators.min(0)]],
    isActive: [true],
    tags: [[]],
  });

  getProductDetail() {
    if (this.productId) {
      console.log('Product Id var :', this.productId);
      this.productService.getProductById(this.productId).subscribe(
        (response) => {
          console.log(response);
          this.product = response;
          this.form.patchValue(response);
        },
        (error) => {
          console.log('Hatayı biz yakaladık');
          this.router.navigate(['/not-found']);
        }
      );
    }
  }

  send() {
    this.form.markAllAsTouched();
    console.log(this.form);
    console.log(this.form.value);

    if (this.form.valid) {
      let subscribeObj: Observable<any>;
      if (this.product.id) {
        subscribeObj = this.update();
      } else {
        subscribeObj = this.save();
      }

      subscribeObj!.subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/products-list');
      });
    }
  }

  save() {
    return this.productService.postProduct(this.form.value);
  }

  update() {
    return this.productService.patchProduct(this.product.id, this.form.value);
  }

}
