import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../../../core/interfaces/http';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/service/cart.service';
import { NotifecationsService } from '../../../core/service/notifecations.service';
import { EmptyComponent } from '../../empty/empty.component';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink, MessageModule, EmptyComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(private _cartService: CartService) {}
  isAddedToCart: boolean = false;
  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: IProducts[];
  @Input() searchKey: string = '';

  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}