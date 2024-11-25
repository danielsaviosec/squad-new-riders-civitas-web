import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { Router } from '@angular/router';
import { StudentService } from '../../../../service/students/student.service';
import { ClassService } from 'src/app/service/classes/classes.service';

import { StudentRegistrationData } from 'src/app/interface/register/StudentRegistrationData.interface';
import { ClassesResponse } from 'src/app/interface/response/ClassesResponse.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  form!: FormGroup;
  turmaOptions: ClassesResponse[] = [];
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private snackbarErrorService: SnackbarErrorService,
    private router: Router,
    private studentService: StudentService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      matricula: ['', [Validators.required, Validators.maxLength(20)]],
      turma: ['', Validators.required],
      cpfResponsavel: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), Validators.maxLength(14)]],
      cpfOrRg: ['', [Validators.required, this.cpfOrRgValidator, Validators.maxLength(14)]]
    });

    this.classService.getClasses().subscribe(
      (data: ClassesResponse[]) => {
        this.turmaOptions = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar turmas:', error);
        this.isLoading = false;
      }
    );
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
    this.router.navigate(['/main/admin-screen']);
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
        (data) => {
          console.error('Erro ao cadastrar estudante:', data?.error);
          this.handleError(data?.error);
        }
      );
    } else {
      this.handleError({ message: "Erro ao cadastrar estudante. Tente novamente." });
    }
  }

  showSuccessMessage(): void {
    this.snackBar.open('Estudante cadastrado com sucesso!', '', {
      duration: 3000,
      panelClass: ['sucess-snackbar'],
      horizontalPosition: 'right',
    });

    setTimeout(() => {
      this.router.navigate(['/main/admin-screen']);
    }, 3500);
  }

  handleError(error: CreateResponse):void {
    const errorMessage: string = error.message || "Erro ao cadastrar professor. Tente novamente."
    this.snackbarErrorService.showErrorMessage(
      errorMessage,
      'Verifique as informações digitadas ou cadastre novos dados'
    );
  }
}
