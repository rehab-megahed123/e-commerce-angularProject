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
    path: 'user',
    loadComponent: () =>
      import('./Layouts/user-layout/user-layout.component').then(
        (c) => c.UserLayoutComponent
      ),
    canActivate: [authGuard],
  },
];
