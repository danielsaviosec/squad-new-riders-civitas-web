import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  AuthService,
  LoginCredentials,
  LoginResponse,
} from '../../../../service/auth/auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    this.authForm.markAsPending();

    const credentials = this.authForm.value as LoginCredentials;

    this.authService.login(credentials).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error: HttpErrorResponse) => this.handleLoginError(error),
    });
  }

  isInvalidRequired(controlName: string): boolean {
    const control = this.authForm.get(controlName);
    return control?.hasError('required') && control.touched ? true : false;
  }

  isInvalidEmailFormat(): boolean {
    const control = this.authForm.get('email');
    return (
      control != null &&
      !control.hasError('required') &&
      (control.hasError('email') ?? false) &&
      control.touched
    );
  }

  isLoginErrorVisible(): boolean {
    return this.authForm.errors?.['unauthorized'] && this.authForm.pristine;
  }

  private handleLoginSuccess(response: LoginResponse) {
    if (response.token) {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    }
  }

  private handleLoginError(error: HttpErrorResponse) {
    this.authForm.reset();

    switch (error.status) {
      case 401:
        this.authForm.setErrors({ unauthorized: true });
        break;

      case 0:
        this._snackBar.open('Sem conexão com a internet.', '', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: 'snackbar-error'
        });
        break;

      // outros casos de erro...

      default:
        this._snackBar.open('Erro inesperado do servidor.', '', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: 'snackbar-error'
        });
    }
  }
}
