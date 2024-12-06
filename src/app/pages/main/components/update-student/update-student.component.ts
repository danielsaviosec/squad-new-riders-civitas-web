import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../service/students/student.service';
import { ClassService } from 'src/app/service/classes/classes.service';
import { ClassesResponse } from 'src/app/interface/response/ClassesResponse.interface';

import { StudentRegistrationData } from 'src/app/interface/register/StudentRegistrationData.interface';
import { IStudentResponse } from 'src/app/interface/response/IStudentsResponse.interface';
import { finalize, switchMap } from 'rxjs';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {
  form!: FormGroup;
  students: IStudentResponse[] = [];
  turmaOptions: ClassesResponse[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private snackbarErrorService: SnackbarErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private classService: ClassService
  ) {}

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

  ngOnInit(): void {
    this.isLoading = true;

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      matricula: ['', [Validators.required, Validators.maxLength(20)]],
      turma: ['', Validators.required],
      cpfResponsavel: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), Validators.maxLength(14)]],
      cpfOrRg: ['', [Validators.required, this.cpfOrRgValidator, Validators.maxLength(14)]]
    });

    this.classService.getClasses()
      .pipe(
        switchMap((data: ClassesResponse[]) => {
          this.turmaOptions = data.map((turma: ClassesResponse) => ({
            ...turma,
            schoolYear: this.translateAnoLetivo(turma.schoolYear),
            schoolShift: this.translatePeriodoLetivo(turma.schoolShift),
            educationType: this.translateEnsino(turma.educationType)
          }));
          return this.studentService.getStudents();
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(
        (students: IStudentResponse[]) => {
          this.students = students;

          const studentId: number | null = Number(this.route.snapshot.paramMap.get('id'));
          const filterStudent: IStudentResponse | undefined = this.students.find(student => student.id === studentId);
          const filterClass = this.turmaOptions.find(turma => turma.name === filterStudent?.studentClass.name)

          if (filterStudent) {
            this.form.patchValue({
              nome: filterStudent.fullName,
              cpfOrRg: filterStudent.document,
              matricula: filterStudent.registrationNumber,
              turma: filterClass?.id,
              cpfResponsavel: filterStudent.cpfGuardian
            });
          }
        },
        (error) => {
          console.error('Erro ao carregar dados:', error);
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
    this.router.navigate(['/main']);
  }

  // Submissão do formulário
  onSubmit(): void {
    if (this.form.valid) {
      this.form.markAsPending();

      const studentData: StudentRegistrationData = {
        fullName: this.form.value.nome,
        document: this.form.value.cpfOrRg,
        registrationNumber: this.form.value.matricula,
        studentClass: this.form.value.turma,
        cpfGuardian: this.form.value.cpfResponsavel
      };

      const studentId: number | null = Number(this.route.snapshot.paramMap.get('id'));

      this.studentService.updateStudent(studentId, studentData)
      .pipe(
        finalize(() => {
          this.form.updateValueAndValidity();
        })
      )
      .subscribe(
        () => {
          this.showSuccessMessage();
        },
        (data) => {
          console.error('Erro ao atualizar dados do estudante:', data?.error);
          this.handleError(data?.error);
        }
      );
    } else {
      this.handleError({ message: "Erro ao atualizar dados do estudante. Tente novamente." });
    }
  }

  showSuccessMessage(): void {
    this.snackBar.open('Dados do estudante atualizado com sucesso!', '', {
      duration: 3500,
      panelClass: ['sucess-snackbar'],
      horizontalPosition: 'right',
    });

    setTimeout(() => {
      this.router.navigate(['/main/student-list']);
    }, 3500);
  }

  handleError(error: CreateResponse):void {
    const errorMessage: string = error.message || "Erro ao atualizar dados do estudante. Tente novamente."
    this.snackbarErrorService.showErrorMessage(
      errorMessage,
      'Verifique as informações digitadas ou cadastre novos dados'
    );
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
}
