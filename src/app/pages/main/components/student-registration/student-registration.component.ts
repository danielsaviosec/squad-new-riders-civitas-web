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

  anoLetivo = [
    { value: '1-ano', label: '1º ano', backName: '1st year' },
    { value: '2-ano', label: '2º ano', backName: '2nd year' },
    { value: '3-ano', label: '3º ano', backName: '3rd year' },
    { value: '4-ano', label: '4º ano', backName: '4th year' },
    { value: '5-ano', label: '5º ano', backName: '5th year' },
    { value: '6-ano', label: '6º ano', backName: '6th year' }
  ];

  periodoLetivo = [
    { value: 'manha', label: 'Manhã', backName: 'Morning' },
    { value: 'tarde', label: 'Tarde', backName: 'Afternoon' },
    { value: 'noite', label: 'Noite', backName: 'Night' },
  ];

  ensino = [
    { value: 'maternal', label: 'Maternal', backName: 'Nursery' },
    { value: 'preEscola', label: 'Pré-escola', backName: 'Preschool' },
    { value: 'ensinoFundamental', label: 'Ensino Fundamental 1', backName: 'Elementary school 1' },
  ];

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
        // Traduzir os campos antes de atribuir a `turmaOptions`
        this.turmaOptions = data.map((turma: ClassesResponse) => ({
          ...turma,
          schoolYear: this.translateAnoLetivo(turma.schoolYear),
          schoolShift: this.translatePeriodoLetivo(turma.schoolShift),
          educationType: this.translateEnsino(turma.educationType)
        }));
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

  translateAnoLetivo(backName: string): string {
    const option = this.anoLetivo.find(option => option.backName === backName);
    return option ? option.label : backName;
  }

  translatePeriodoLetivo(backName: string): string {
    const option = this.periodoLetivo.find(option => option.backName === backName);
    return option ? option.label : backName;
  }

  translateEnsino(backName: string): string {
    const option = this.ensino.find(option => option.backName === backName);
    return option ? option.label : backName;
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
      this.router.navigate(['/main']);
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
