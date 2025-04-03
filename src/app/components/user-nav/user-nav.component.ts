import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { UserDataService } from '../../core/service/user-data.service';
import { AuthService } from '../../core/service/auth.service';
import { CartService } from '../../core/service/cart.service';
@Component({
  selector: 'app-user-nav',
  imports:  [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule,RouterLink,RouterModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone:true
})
export class UserNavComponent {
constructor(private _userData:UserDataService,private _cart:CartService,private _auth:AuthService,private router:Router){}

  items: MenuItem[] | undefined;
  logOut:boolean = false;
  username:string=''
  cartCount:number=0;

  ngOnInit() {
    this.getUserName()
    this.getUserCartCount()
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Products',
        icon: 'pi pi-sparkles',
        routerLink: '/products'
      },
      {
        label: 'Categories',
        icon: 'pi pi-th-large',
        routerLink: '/categories'
      },
    ];
this._cart.countOfCart.subscribe((next)=>{
this.cartCount=next;
})
  }
getUserName():void{
  this._userData.userName.subscribe((next)=>this.username=next);
}

getUserCartCount(): void {
  const id = localStorage.getItem('token') ?? '';
  this._cart.countOfCart.subscribe((next) => (this.cartCount = next));
}

logout():void{
this._auth.logout().subscribe((next)=>{

localStorage.removeItem('token');
localStorage.removeItem('username');
this.router.navigate(['login']);

})
}
}