import { Routes } from '@angular/router';
import { authGuard } from './core/Guards/auth.guard';
import { registerGuard } from './core/Guards/register.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Layouts/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./Pages/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./Pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        canDeactivate: [registerGuard],
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./Layouts/user-layout/user-layout.component').then(
        (c) => c.UserLayoutComponent
      ),
    canActivate: [authGuard],
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',loadComponent:()=> import('./Pages/home/home.component').then((c)=>c.HomeComponent),},
      {path:'cart',loadComponent:()=>import('./Pages/cart/cart.component').then((c)=>c.CartComponent),},
      {path:'products',loadComponent:()=>import('./Pages/products/products.component').then((c)=>c.ProductsComponent),},
      {path:'details',loadComponent:()=>import('./Pages/details/details.component').then((c)=>c.DetailsComponent),},
      {path:'categories',loadComponent:()=>import('./Pages/category/category.component').then((c)=>c.CategoryComponent),}



    ]
  },
];
