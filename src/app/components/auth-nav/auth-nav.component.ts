import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-nav',
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.css',
  standalone: true,
})
export class AuthNavComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        path: 'login',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        path: 'register',
      },
    ];
  }
}
