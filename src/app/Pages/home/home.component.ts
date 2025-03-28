import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from '../../Shared/card/card/card.component';
import { UserDataService } from '../../core/service/user-data.service';
import { IProducts } from '../../core/interfaces/http';
import { PopularPipe } from '../../core/pipes/popular.pipe';
import { ProductsService } from '../../core/service/products.service';
import { CartService } from '../../core/service/cart.service';
@Component({
  selector: 'app-home',
  imports: [GalleriaModule ,CardComponent,PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone:true
})
export class HomeComponent {
  constructor(private _cartServive:CartService,private _productsService:ProductsService){}
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
  const storedcart=localStorage.getItem('cartState');
  const cartState=storedcart?JSON.parse(storedcart):{};
  this._productsService.allProducts().subscribe((response:IProducts[])=>{
    this.smallProducts=response.slice(0,4);
    this.popularProducts=response.map((product)=>{
return{
... product,
isAddedToCart:cartState[product._id]||false
}
    });
console.log(this.popularProducts)
  });


}

}
