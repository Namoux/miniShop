import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bracelet } from "./interfaces/bracelet"
import { ProductsListComponent } from "./products-list/products-list.component"
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
