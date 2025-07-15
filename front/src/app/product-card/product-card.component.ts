import { Component, Input } from '@angular/core';
import { Bracelet } from '../interfaces/bracelet';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({required:true}) bracelet !: Bracelet;
}
