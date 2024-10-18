import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() errorMessage: string = '';
  @Input() hasError: boolean = false;
  @Output() inputValueChange = new EventEmitter<string>();

  value: string = '';

  onInput(event: Event):void {
    this.value = (event.target as HTMLInputElement).value;
    this.inputValueChange.emit(this.value);
  }
}
