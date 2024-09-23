import { Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
        path: 'product-edit/:productId',
        component: ProductAddComponent,
    },
    {
        path: '',
        redirectTo: 'products-list',
        pathMatch: "full"
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
