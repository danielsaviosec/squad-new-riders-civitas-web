import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { Router } from '@angular/router';
import { StudentService, StudentRegistrationData } from '../../../../service/students/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private snackbarErrorService: SnackbarErrorService,
    private router: Router,
    private studentService: StudentService // Adiciona o serviço StudentService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      matricula: ['', [Validators.required, Validators.maxLength(20)]],
      turma: ['', Validators.required],
      cpfResponsavel: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), Validators.maxLength(14)]],
      cpfOrRg: ['', [Validators.required, this.cpfOrRgValidator, Validators.maxLength(14)]]
    });
  }

  cpfOrRgValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const rgRegex = /^(\d{1,2}\.?\d{3}\.?\d{3}-?\d{1,2}|\d{7,14})$/;

    if (cpfRegex.test(value) || rgRegex.test(value)) {
      return null;
    }

    return { invalidCpfOrRg: true };
  }

  goBack(): void {
    this.router.navigate(['/admin-screen']);
  }

  // Submissão do formulário
  onSubmit(): void {
    if (this.form.valid) {
      const studentData: StudentRegistrationData = {
        fullName: this.form.value.nome,
        document: this.form.value.cpfOrRg,
        registrationNumber: this.form.value.matricula,
        studentClass: this.form.value.turma,
        cpfGuardian: this.form.value.cpfResponsavel
      };

      this.studentService.registerStudent(studentData).subscribe(
        () => {
          this.showSuccessMessage();
        },
        (error) => {
          console.error('Erro ao cadastrar estudante:', error);
          this.errorMessage();
        }
      );
    } else {
      this.errorMessage();
    }
  }

  showSuccessMessage(): void {
    this.snackBar.open('Dados do estudante atualizado!', '', {
      duration: 3000,
      panelClass: ['sucess-snackbar'],
      horizontalPosition: 'right',
    });

    setTimeout(() => {
      this.router.navigate(['/admin-screen']);
    }, 3500);
  }

  errorMessage(): void {
    this.snackbarErrorService.showErrorMessage(
      'Erro ao cadastrar estudante',
      'Verifique os dados e tente novamente.'
    );
  }

}
