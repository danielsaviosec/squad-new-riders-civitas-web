import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AnoLetivoOption, PeriodoLetivoOption, EnsinoOption } from 'src/app/interface/IClassRegistration.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/service/classes/classes.service';
import { finalize } from 'rxjs';

import { ClassRegistrationData } from 'src/app/interface/register/ClassRegistrationData.interface';
import { ClassesResponse } from 'src/app/interface/response/ClassesResponse.interface';
import { IClassRegistrationData } from 'src/app/interface/register/IClassRegistrationData.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.scss']
})
export class UpdateClassComponent implements OnInit {
  form = new FormGroup({
    anoLetivo: new FormControl('', Validators.required),
    periodoLetivo: new FormControl('', Validators.required),
    ensino: new FormControl('', Validators.required),
    apelidoTurma: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  anoLetivo: AnoLetivoOption[] = [
    { value: '1-ano', label: '1º ano', backName: '1st year' },
    { value: '2-ano', label: '2º ano', backName: '2nd year' },
    { value: '3-ano', label: '3º ano', backName: '3rd year' },
    { value: '4-ano', label: '4º ano', backName: '4th year' },
    { value: '5-ano', label: '5º ano', backName: '5th year' },
    { value: '6-ano', label: '6º ano', backName: '6th year' }
  ];
  periodoLetivo: PeriodoLetivoOption[] = [
    { value: 'manha', label: 'Manhã', backName: 'Morning' },
    { value: 'tarde', label: 'Tarde', backName: 'Afternoon' },
    { value: 'noite', label: 'Noite', backName: 'Night' },
  ];
  ensino: EnsinoOption[] = [
    { value: 'maternal', label: 'Maternal', backName: 'Nursery' },
    { value: 'preEscola', label: 'Pré-escola', backName: 'Preschool' },
    { value: 'ensinoFundamental', label: 'Ensino Fundamental 1', backName: 'Elementary school 1' },
  ];

  turmaOptions: ClassesResponse[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private snackbarErrorService: SnackbarErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.form = this.fb.group({
      anoLetivo: ['', Validators.required],
      periodoLetivo: ['', Validators.required],
      ensino: ['', Validators.required],
      apelidoTurma: ['', [Validators.required, Validators.maxLength(20)]]
    });

    this.classService.getClasses().subscribe(
      (data: ClassesResponse[]) => {
        this.turmaOptions = data.map((turma: ClassesResponse) => {
          return {
            ...turma,
            schoolYear: this.translateAnoLetivo(turma.schoolYear),
            schoolShift: this.translatePeriodoLetivo(turma.schoolShift),
            educationType: this.translateEnsino(turma.educationType)
          };
        });


        const classId: number | null = Number(this.route.snapshot.paramMap.get('id'));
        const filterClass: IClassRegistrationData | undefined = this.turmaOptions.find(turma => turma.id === classId);

        if (filterClass) {
          this.form.patchValue({
            anoLetivo: filterClass.schoolYear,
            periodoLetivo: filterClass.schoolShift,
            ensino: filterClass.educationType,
            apelidoTurma: filterClass.name
          });
        }

        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar turmas:', error);
        this.isLoading = false;
      }
    );
  }

  //=================================
  //Botão voltar
  goBack(): void {
    this.router.navigate(['/main'])
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.form.markAsPending();

    const formValues = this.form.value;

    const selectedAnoLetivo = this.anoLetivo.find(option => option.value === formValues.anoLetivo)?.backName ?? '';
    const selectedPeriodoLetivo = this.periodoLetivo.find(option => option.value === formValues.periodoLetivo)?.backName ?? '';
    const selectedEnsino = this.ensino.find(option => option.value === formValues.ensino)?.backName ?? '';

    const classData: ClassRegistrationData = {
      name: formValues.apelidoTurma ?? '',
      schoolYear: selectedAnoLetivo,
      schoolShift: selectedPeriodoLetivo,
      educationType: selectedEnsino
    };

    const classId: number | null = Number(this.route.snapshot.paramMap.get('id'));

    this.classService.updateClass(classId, classData)
    .pipe(
      finalize(() => {
        this.form.updateValueAndValidity();
      })
    )
    .subscribe({
      next: () => this.handleSuccess(),
      error: (data) => this.handleError(data?.error)
    });
  }

  private handleSuccess() {
    this._snackBar.open('Turma atualizada com sucesso!', '', {
      duration: 3500,
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });

    setTimeout(() => {
      this.router.navigate(['/main/class-list'])
    }, 3500);
  }

  handleError(error: CreateResponse):void {
    const errorMessage: string = error?.message || "Erro ao atualizar turma. Tente novamente."
    this.snackbarErrorService.showErrorMessage(
      errorMessage,
      'Verifique as informações digitadas ou cadastre novos dados'
    );
  }

  translateAnoLetivo(backName: string): string {
    const option = this.anoLetivo.find(option => option.backName === backName);
    return option ? option.value : backName;
  }

  translatePeriodoLetivo(backName: string): string {
    const option = this.periodoLetivo.find(option => option.backName === backName);
    return option ? option.value : backName;
  }

  translateEnsino(backName: string): string {
    const option = this.ensino.find(option => option.backName === backName);
    return option ? option.value : backName;
  }
}
