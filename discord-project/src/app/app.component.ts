import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { HeaderComponent } from "./header/header.component";
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsListComponent, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  translocoService = inject(TranslocoService);
  title = 'discord-project';

  constructor() {
    this.setLanguage();
  }

setLanguage() {
  let lang = localStorage.getItem('lang') ?? navigator.language;

  this.translocoService.setActiveLang(lang);
}
}
