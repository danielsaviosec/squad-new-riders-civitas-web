import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginCredentials } from '../../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  loginFailed = false;
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();

    const credentials = this.authForm.value as LoginCredentials;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        // TODO: fazer o redirecionamento baseado no token
        if (res) this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.authForm.reset();
        // TODO: alterar esse codigo quando backend estiver pronto
        if (error.status === 404) this.loginFailed = true;
      },
    });
  }

  isInvalidEmailFormat(): boolean {
    return (
      !this.authForm.controls.email.hasError('required') &&
      this.authForm.controls.email.hasError('email') &&
      this.authForm.controls.email.touched
    );
  }

  isLoginErrorVisible(): boolean {
    return this.loginFailed && this.authForm.pristine;
  }
}
