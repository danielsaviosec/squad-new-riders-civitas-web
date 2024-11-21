import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AnoLetivoOption, PeriodoLetivoOption, EnsinoOption } from 'src/app/interface/IClassRegistration.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/service/classes/classes.service';

import { ClassRegistrationData } from 'src/app/interface/register/ClassRegistrationData.interface';

@Component({
  selector: 'app-class-registration',
  templateUrl: './class-registration.component.html',
  styleUrls: ['./class-registration.component.scss']
})
export class ClassRegistrationComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private snackbarErrorService: SnackbarErrorService,
    private router: Router,
    private classService: ClassService
  ) { }

  ngOnInit():void {
    this.form = this.fb.group({
      anoLetivo: ['', Validators.required],
      periodoLetivo: ['', Validators.required],
      ensino: ['', Validators.required],
      apelidoTurma: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  //=================================
  //Botão voltar
  goBack():void {
    this.router.navigate(['/admin-screen'])
  }

  //===================
  //Lógicas do cadastro enviado ou repetição de nomes
  onSubmit():void {
    if (this.form.invalid) return;

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

    this.classService.registerClass(classData).subscribe({
      next: () => this.handleSuccess(),
      error: () => this.handleError()
    });
  }

  private handleSuccess() {
    this._snackBar.open('Turma cadastrada com sucesso!', '', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });

    setTimeout(() => {
      this.router.navigate(['/admin-screen'])
    }, 3500);
  }

  handleError():void {
    this.snackbarErrorService.showErrorMessage(
      'Erro ao cadastrar turma. Tente novamente.',
      'Verifique as informações digitadas ou cadastre novos dados'
    );
  }
}
