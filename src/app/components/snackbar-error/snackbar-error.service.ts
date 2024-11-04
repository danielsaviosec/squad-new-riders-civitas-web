import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from './snackbar-error.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarErrorService {

  constructor(private snackBar: MatSnackBar) { }

  showErrorMessage(message: string, subMessage: string):void {
    this.snackBar.openFromComponent(SnackbarErrorComponent, {
      data: { message, subMessage },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
