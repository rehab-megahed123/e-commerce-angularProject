import { Component } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private _categoryService: CategoryService) {}
  allCategory: string[] = [];
  ngOnInit(): void {
    this.displayAllCategory();
  }
  displayAllCategory() {
    this._categoryService
      .getAllCategory()
      .subscribe((next) => (this.allCategory = next.categories));
  }
  getImageCategory(type: string): string {
    return `./${type}.jpg`;
  }
}
