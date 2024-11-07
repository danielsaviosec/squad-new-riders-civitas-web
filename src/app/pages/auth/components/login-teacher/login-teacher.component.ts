import { Component } from '@angular/core';

@Component({
  selector: 'app-login-teacher',
  templateUrl: './login-teacher.component.html',
  styleUrls: ['./login-teacher.component.scss'],
})
export class LoginTeacherComponent {
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
