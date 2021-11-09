import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[rs-number-only]',
})
export class DigitOnlyInputDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    if (initialValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
