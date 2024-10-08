import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();

    const loginCredentials = {
      email: this.authForm.value.email || '',
      password: this.authForm.value.password || '',
    };

    this.authService.login(loginCredentials);
  }
}
