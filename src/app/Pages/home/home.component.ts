import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from '../../Shared/card/card/card.component';
import { UserDataService } from '../../core/service/user-data.service';
import { IProducts } from '../../core/interfaces/http';
import { PopularPipe } from '../../core/pipes/popular.pipe';
@Component({
  selector: 'app-home',
  imports: [GalleriaModule ,CardComponent,PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone:true
})
export class HomeComponent {
  constructor(private _userDate:UserDataService){}
  images : any[] |undefined;
  smallProducts!:IProducts[];
  popularProducts!:IProducts[];
  ngOnInit() {
this.images=[
  {
    itemImageSrc: '/product-1.jpg',
    alt: 'Description for product 1',
    title: 'product 1'
},
{
  itemImageSrc: '/product-2.jpg',
  alt: 'Description for product 1',
  title: 'product 1'
},
{
  itemImageSrc: '/product-3.jpg',
  alt: 'Description for product 1',
  title: 'product 1'
},
{
  itemImageSrc: '/product-4.jpg',
  alt: 'Description for product 1',
  title: 'product 1'
},
];
this.getAllProducts();
}

getAllProducts():void{
  this._userDate.allProducts().subscribe((next)=>{
    this.smallProducts=next.products.slice(0,4);
    this.popularProducts=next.products;
  });
}
}
