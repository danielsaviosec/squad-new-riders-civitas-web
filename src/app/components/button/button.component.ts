import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label!: string; // Propriedade para definir o texto do botão
  @Input() customClass = ''; // Classe personalizada
  @Input() disabled = false;
  @Input() loading = false;
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clique

  onClick() {
    if(!this.disabled) {
      this.clickEvent.emit();
    }
  }
}
