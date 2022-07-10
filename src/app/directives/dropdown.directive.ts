import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dropdownDirective]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { };

  @HostListener('click') toggle() {
    const dropdownMenu = this.renderer.nextSibling(this.elRef.nativeElement);

    if(dropdownMenu.classList.contains('show')) {
      this.renderer.removeClass(dropdownMenu, 'show');
    } else {
      this.renderer.addClass(dropdownMenu, 'show');
    };
  };
};