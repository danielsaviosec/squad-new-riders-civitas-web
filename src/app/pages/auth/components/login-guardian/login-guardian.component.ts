import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth/auth.service';

import { LoginResponse } from 'src/app/interface/response/LoginResponse.interface';
import { ILoginRegistrationNumberCredentials } from 'src/app/interface/auth/ILoginRegistrationNumberCredentials.interface';

@Component({
  selector: 'app-login-guardian',
  templateUrl: './login-guardian.component.html',
  styleUrls: ['./login-guardian.component.scss']
})
export class LoginGuardianComponent {
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

  onSubmit($event: SubmitEvent): void {
    $event.preventDefault();
    this.authForm.markAsPending();

    const credentials = this.authForm.value as ILoginRegistrationNumberCredentials;

    this.authService.loginGuardian(credentials).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error: HttpErrorResponse) => this.handleLoginError(error),
    });
  }

  private handleLoginSuccess(response: LoginResponse): void {
    if (response.token) {
      this.router.navigate(['/main']);
    }
  }

  private handleLoginError(error: HttpErrorResponse): void {
    this.authForm.reset();

    switch (error.status) {
      case 401:
        this.isInvalid = true;
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

  resetError(): void {
    this.isInvalid = false;
  }
}
