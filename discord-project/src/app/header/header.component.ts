import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  translocoService = inject(TranslocoService);

  setLanguage(lang: string) {
    console.log(lang); 
    this.translocoService.setActiveLang(lang);
    localStorage.setItem("lang", lang);
  }
}
