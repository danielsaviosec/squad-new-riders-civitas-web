import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() errorMessage = '';
  @Input() hasError = false;
  @Output() inputValueChange = new EventEmitter<string>();

  value = '';

  onInput(event: Event):void {
    this.value = (event.target as HTMLInputElement).value;
    this.inputValueChange.emit(this.value);
  }
}
