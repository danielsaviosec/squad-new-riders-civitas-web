import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/service/classes/classes.service';
import { TeacherService } from 'src/app/service/teachers/teachers.service';
import { forkJoin, finalize } from 'rxjs';

import { TeacherRegistrationData } from 'src/app/interface/register/TeacherRegistrationData.interface';
import { ClassesResponse } from 'src/app/interface/response/ClassesResponse.interface';
import { TeachersResponse } from 'src/app/interface/response/TeachersResponse.interface';
import { Class } from 'src/app/interface/register/Class.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {
  form!: FormGroup;
  turmaOptions: ClassesResponse[] = [];
  teachers: TeachersResponse[] = [];
  teacherClassesNames: { [key: string]: string[] } = {};
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private snackbarErrorService: SnackbarErrorService,
    private route: ActivatedRoute,
    private router: Router,
    private classService: ClassService, // Injeta o serviço
    private teacherService: TeacherService
  ) { }

  ngOnInit():void {
    this.isLoading = true;

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      matricula: ['', [Validators.required, Validators.maxLength(20)]],
      turma: [[], Validators.required], // Alterado para aceitar múltiplas classes
      cpf: ['', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        Validators.maxLength(14)
      ]]
    });

    forkJoin({
      classes: this.classService.getClasses(),
      teachers: this.teacherService.getTeachers()
    }).subscribe({
      next: ({ classes, teachers }) => {
        this.turmaOptions = classes;

        this.teachers = teachers;
        teachers.forEach(teacher => {
          this.teacherClassesNames[teacher.registrationNumber] = teacher.classes.map((classItem: Class) => classItem.name);
        });

        const teacherId: number | null = Number(this.route.snapshot.paramMap.get('id'));
        const filterTeacher: TeachersResponse | undefined = this.teachers.find(teacher => teacher.id === teacherId);

        if (filterTeacher) {
          this.form.patchValue({
            nome: filterTeacher.fullName,
            matricula: filterTeacher.registrationNumber,
            cpf: filterTeacher.cpf,
            turma: filterTeacher.classes.map((classItem: Class) => classItem.id)
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  //=================================
  //Botão voltar
  goBack(): void {
    this.router.navigate(['/main'])
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.form.markAsPending();

    const teacherData: TeacherRegistrationData = {
      fullName: this.form.value.nome,
      cpf: this.form.value.cpf,
      registrationNumber: this.form.value.matricula,
      classes: this.form.value.turma
    };

    const teacherId = Number(this.route.snapshot.paramMap.get('id'));

    this.teacherService.updateTeacher(teacherId, teacherData)
    .pipe(
      finalize(() => {
        this.form.updateValueAndValidity();
      })
    )
    .subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error?.data)
    });
  }

  private handleSuccess() {
    this._snackBar.open('Dados do professor atualizado atualizada com sucesso!', '', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });

    setTimeout(() => {
      this.router.navigate(['/main'])
    }, 3500);
  }

  handleError(error: CreateResponse):void {
    const errorMessage: string = error?.message || "Erro ao atualizar dados do professor. Tente novamente."
    this.snackbarErrorService.showErrorMessage(
      errorMessage,
      'Verifique as informações digitadas ou cadastre novos dados'
    );
  }
}
