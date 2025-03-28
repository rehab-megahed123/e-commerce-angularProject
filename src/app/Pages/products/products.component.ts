import { Component } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { IProducts } from '../../core/interfaces/http';
import { AuthFooterComponent } from "../../components/auth-footer/auth-footer.component";
import { CardComponent } from "../../Shared/card/card/card.component";
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchNamePipe } from '../../core/pipes/search-name.pipe';

@Component({
  selector: 'app-products',
  imports: [SearchNamePipe, CardComponent,InputIcon, IconField, InputTextModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
constructor(private _productsService:ProductsService){

}
ngOnInit():void{
this.getAllProducts();
}
allProducts:IProducts[]=[];
searchKey:string='';
getAllProducts():void{
this._productsService.allProducts().subscribe((next)=>
this.allProducts=next
)
}
}
