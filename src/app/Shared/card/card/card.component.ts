import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../../../core/interfaces/http';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-card',
  imports: [NgClass,ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input({required:true}) isSmallCard:boolean=false;
@Input ({required:true}) Products!:IProducts[];
}
