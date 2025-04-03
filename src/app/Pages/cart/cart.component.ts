
import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../core/interfaces/http';
import { ChangeDetectorRef } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';

import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, CommonModule,ButtonModule,DataView,
    Tag,
   
   
    
    ButtonModule,
    CommonModule,
    SelectButton,
    FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  allCartProducts: IProducts[] = [];
  layout: "grid" | "list" = "grid";
  options = [
    { label: 'List', value: 'grid' },
    { label: 'Grid', value: 'grid' }
  ];
  ngOnInit(): void {
    const cartState = localStorage.getItem('cartState');
    if (cartState) {
      this.allCartProducts = JSON.parse(cartState);
      this.cdr.detectChanges();
      console.log(this.allCartProducts);
    }
  }
  trackByFn(index: number, item: IProducts) {
    return item.id; // أو أي مفتاح فريد للمنتج
  }

  clearCart(): void {
    localStorage.removeItem('cartState');
    this.allCartProducts = [];
  }
}