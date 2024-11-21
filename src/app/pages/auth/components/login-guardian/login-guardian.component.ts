import { Component } from '@angular/core';

@Component({
  selector: 'app-login-guardian',
  templateUrl: './login-guardian.component.html',
  styleUrls: ['./login-guardian.component.scss']
})
export class LoginGuardianComponent {
  isInvalid = false;
  inputValue = '';

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
