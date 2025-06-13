import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appClasseVolColor]',
  standalone: true
})
export class ClasseVolColorDirective implements OnChanges {
  @Input() classeVol: string = '';

  constructor(private hostElement: ElementRef, private styleManager: Renderer2) { }

  ngOnChanges(propertyUpdates: SimpleChanges): void {
    if (propertyUpdates['classeVol']) {
      this.updateColor();
    }
  }

  private updateColor(): void {
    this.styleManager.setStyle(this.hostElement.nativeElement, 'color', null);

    switch (this.classeVol) {
      case 'STANDARD':
        this.styleManager.setStyle(this.hostElement.nativeElement, 'color', '#28a745');
        break;
      case 'BUSINESS':
        this.styleManager.setStyle(this.hostElement.nativeElement, 'color', '#dc3545');
        break;
      case 'PREMIUM':
        this.styleManager.setStyle(this.hostElement.nativeElement, 'color', '#007bff');
        break;
      default:
        this.styleManager.setStyle(this.hostElement.nativeElement, 'color', 'inherit');
        break;
    }
  }
}
