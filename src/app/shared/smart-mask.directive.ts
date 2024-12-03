import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSmartMask]'
})
export class SmartMaskDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(): void {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 11) {
      // Máscara de CPF (###.###.###-##)
      value = value
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    input.value = value;
    this.previousValue = value;
  }
}
