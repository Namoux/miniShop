import { Component, OnInit } from '@angular/core';
import { Bracelet } from '../interfaces/bracelet';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  // injection de la dépendance ApiService par Angular
  constructor(private api : ApiService){}

  bracelets : Bracelet[] = [];

  ngOnInit(): void {
    this.api.getProducts().then(bracelets => {
      this.bracelets = bracelets
    });
  }
}
