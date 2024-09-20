import { Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductsListComponent } from './products-list/products-list.component';

export const routes: Routes = [
    {
        path: 'products-list',
        component: ProductsListComponent,
    },
    {
        path: 'product-add',
        component: ProductAddComponent,
    },
    {
        path: '',
        redirectTo: 'products-list',
        pathMatch: "full"
    },
    {
        path: '**',
        redirectTo: 'product-list'
    },
];
