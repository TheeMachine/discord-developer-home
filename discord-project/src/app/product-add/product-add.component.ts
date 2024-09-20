import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-add',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {
  formBuilder = inject(UntypedFormBuilder);
  productService = inject(ProductsService);
  router = inject(Router);
  

  form = this.formBuilder.group({
    name: ["", [Validators.required]],
    description: ["", []],
    price: [-1, [Validators.required, Validators.min(0)]],
    isActive: [true],
    tags: [[]]
  });


  save() {
    this.form.markAllAsTouched();
    console.log(this.form);
    console.log(this.form.value);
    
    if(this.form.valid) {
      this.productService.postProduct(this.form.value)
      .subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/products-list');
      })
    }
  }


  getError(controlName: string, errorType: string) {
    return (
      this.form.get(controlName)?.hasError(errorType) &&
      this.form.get(controlName)?.touched
    )
  }
  
}
