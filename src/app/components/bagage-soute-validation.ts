import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBagageSouteValidation]',
  standalone: true
})
export class BagageSouteValidationDirective implements OnChanges {
  @Input() classe: string = 'Standard';
  @Input() nombreBagages: number = 0;

  getClasseMaxBagages(classeType: string): number {
    switch (classeType) {
      case 'STANDARD':
        return 1;
      case 'BUSINESS':
        return 2;
      case 'PREMIUM':
        return 3;
      default:
        return 0;
    }
  }

  constructor(private elementRef: ElementRef, private domRenderer: Renderer2) { }

  ngOnChanges(): void {
    this.validateBagages();
  }

  private validateBagages(): void {
    if (!this.classe || this.nombreBagages === undefined) {
      return;
    }

    const maxBagagesAutorises = this.getClasseMaxBagages(this.classe);
    if (this.nombreBagages > maxBagagesAutorises) {
      this.domRenderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    } else {
      this.domRenderer.removeStyle(this.elementRef.nativeElement, 'background-color');
    }
  }
}
