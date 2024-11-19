import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, LoginProfessorCredentials, LoginResponse } from '../../../../service/auth/auth.service';


@Component({
  selector: 'app-login-teacher',
  templateUrl: './login-teacher.component.html',
  styleUrls: ['./login-teacher.component.scss'],
})
export class LoginTeacherComponent {
  isInvalid = false;
  inputValue = '';


  authForm = new FormGroup({
    registrationNumber: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    this.authForm.markAsPending();

    const credentials = this.authForm.value as LoginProfessorCredentials;

    this.authService.loginProfessor(credentials).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error: HttpErrorResponse) => this.handleLoginError(error),
    });
  }

  isInvalidRequired(): boolean {
    const control = this.authForm.get('registrationNumber');
    return control?.hasError('required') && control.touched ? true : false;
  }

  private handleLoginSuccess(response: LoginResponse) {
    if (response.token) {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/main']);
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
          panelClass: 'snackbar-error',
        });
        break;

      default:
        this._snackBar.open('Erro inesperado do servidor.', '', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: 'snackbar-error',
        });
    }
  }
}
