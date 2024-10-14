import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { InputComponent } from 'src/app/components/input/input.component';

@Component({
  selector: 'app-login-guardian',
  templateUrl: './login-guardian.component.html',
  styleUrls: ['./login-guardian.component.scss'],
  standalone: true,
  imports: [MatButtonModule, ButtonComponent, InputComponent, MatIconModule, BackButtonComponent]
})
export class LoginGuardianComponent {
  isInvalid: boolean = false;
  inputValue: string = '';

  onInputValueChange(value: string): void {
    this.inputValue = value;
  }

  validateInput(): void {
    // Lógica para validação do input, apenas um exemplo:
    this.isInvalid = this.inputValue !== '12345';

    if (!this.isInvalid)
      this.login();
  }

  isButtonDisabled(): boolean {
    return !this.inputValue;
  }

  login() {
    alert('login realizado');
  }
}
