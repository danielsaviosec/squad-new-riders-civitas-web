import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/service/classes/classes.service';
import { TeacherService } from 'src/app/service/teachers/teachers.service';
import { forkJoin, finalize } from 'rxjs';

import { TeacherRegistrationData } from 'src/app/interface/register/TeacherRegistrationData.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';
import { ITeacherResponse, teacherClasses } from 'src/app/interface/response/ITeacherResponse.interface';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {
  form!: FormGroup;
  turmaOptions: teacherClasses[] = [];
  teacher!: ITeacherResponse;
  teacherClassesNames: { [key: string]: string[] } = {};
  isLoading = true;
  teacherId!: number | null;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private snackbarErrorService: SnackbarErrorService,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private classService: ClassService
  ) { }

  ngOnInit():void {
    this.isLoading = true;
    this.teacherId =  Number(this.route.snapshot.paramMap.get('id'));

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
      teacher: this.teacherService.getTeacher(this.teacherId)
    }).subscribe({
      next: ({ classes, teacher }) => {
        this.turmaOptions = classes;

        console.log(this.turmaOptions);

        this.teacher = teacher;

        if (this.teacher) {
          this.form.patchValue({
            nome: this.teacher.fullName,
            matricula: this.teacher.registrationNumber,
            cpf: this.teacher.cpf,
            turma: this.turmaOptions.map((classItem: teacherClasses) => classItem.id)
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

    const teacherId: number | null = Number(this.route.snapshot.paramMap.get('id'));

    this.teacherService.updateTeacher(teacherId, teacherData)
    .pipe(
      finalize(() => {
        this.form.updateValueAndValidity();
      })
    )
    .subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error?.error)
    });
  }

  private handleSuccess() {
    this._snackBar.open('Dados do psicólogo atualizado com sucesso!', '', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });

    setTimeout(() => {
      this.router.navigate(['/main/teacher-list'])
    }, 3500);
  }

  handleError(error: CreateResponse):void {
    const errorMessage: string = error?.message || "Erro ao atualizar dados do psicólogo. Tente novamente."
    this.snackbarErrorService.showErrorMessage(
      errorMessage,
      'Verifique as informações digitadas ou cadastre novos dados'
    );
  }
}
