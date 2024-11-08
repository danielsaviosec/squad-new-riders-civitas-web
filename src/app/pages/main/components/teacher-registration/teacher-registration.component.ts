import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.scss']
})
export class TeacherRegistrationComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private snackbarErrorService: SnackbarErrorService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required, Validators.maxLength(50)],
      matricula: ['', Validators.required, Validators.maxLength(20)],
      turma: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), Validators.maxLength(14)]]
    });
  }

  //=================================
  //Botão voltar 
  goBack(): void {
    this.router.navigate(['/admin-screen'])
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.showSuccessMessage();
    } else {
      this.errorMessage();
    }
  }

  showSuccessMessage(): void {
    this.snackBar.open('Professor(a) cadastrado com sucesso!', '', {
      duration: 3000,
      panelClass: ['sucess-snackbar'],
      horizontalPosition: 'right',
    });

    setTimeout(() => {
      this.router.navigate(['/admin-screen'])
    }, 3500);
  }

  errorMessage(): void {
    this.snackbarErrorService.showErrorMessage(
      'Professor já existe no cadastro',
      'Cadastre um novo professor ou edite os professores cadastrados.'
    );
  }
}
