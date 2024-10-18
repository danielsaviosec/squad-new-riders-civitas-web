import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label!: string; // Propriedade para definir o texto do botão
  @Input() customClass: string = ''; // Classe personalizada
  @Input() disabled: boolean = false;
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clique

  onClick() {
    if(!this.disabled) {
      this.clickEvent.emit();
    }
  }
}