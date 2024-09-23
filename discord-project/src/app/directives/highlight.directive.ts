import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective {
  constructor(private el: ElementRef<HTMLElement>,private renderer: Renderer2) {
  }

  @Input() set searchTerm(e: string) {
    this._searchTerm = e;
    this.highlight(this._searchTerm);
  }

  _searchTerm = '';

  private highlight(searchTerm: string) {
    const htmlContent = this.el.nativeElement.innerHTML;
    if (this._searchTerm) {
      this.el.nativeElement.style.color = "green";
      // this.el.nativeElement.innerHTML = htmlContent.replace(
      //   this._searchTerm,
      //   `<span>${this._searchTerm}</span>`
      // );
    }
  }
}
