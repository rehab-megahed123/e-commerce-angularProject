import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../../../core/interfaces/http';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/service/cart.service';
import { NotifecationsService } from '../../../core/service/notifecations.service';
import { EmptyComponent } from '../../empty/empty.component';
@Component({
  selector: 'app-card',
  imports: [NgClass,ButtonModule,RouterLink,EmptyComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input({required:true}) isSmallCard:boolean=false;
isAddedToCart:boolean=false;
@Input ({required:true}) Products!:IProducts[];
@Input() searchKey:string=''
constructor(private _cartService:CartService,private _notifecationsService:NotifecationsService){}
addToCart(productId:string){
  const userId=localStorage.getItem('token')??''
  this._cartService.addToCart({userId,productId}).subscribe((next)=>{
this._notifecationsService.showSuccess('success',next.message)
this._cartService.countOfCart.next(next.cart.length)
this.isAddedToCart=true;
const storedcart=localStorage.getItem('cartState');
const cartState=storedcart?JSON.parse(storedcart):{};
cartState[productId]=true;
localStorage.setItem('cartState',JSON.stringify(cartState));
})}
}
