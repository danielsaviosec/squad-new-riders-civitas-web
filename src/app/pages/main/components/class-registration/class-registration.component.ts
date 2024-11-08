import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnoLetivoOption, PeriodoLetivoOption, EnsinoOption } from 'src/app/interface/IClassRegistration.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-registration',
  templateUrl: './class-registration.component.html',
  styleUrls: ['./class-registration.component.scss']
})
export class ClassRegistrationComponent implements OnInit {
  form!: FormGroup;

  anoLetivo: AnoLetivoOption[] = [
    { value: '1-ano', label: '1º ano' },
    { value: '2-ano', label: '2º ano' },
    { value: '3-ano', label: '3º ano' },
    { value: '4-ano', label: '4º ano' },
    { value: '5-ano', label: '5º ano' },
    { value: '6-ano', label: '6º ano' },
    { value: '7-ano', label: '7º ano' },
  ];
  periodoLetivo: PeriodoLetivoOption[] = [
    { value: 'manha', label: 'Manhã' },
    { value: 'tarde', label: 'Tarde' },
    { value: 'noite', label: 'Noite' },
  ];
  ensino: EnsinoOption[] = [
    { value: 'maternal', label: 'Maternal' },
    { value: 'preEscola', label: 'Pré-escola' },
    { value: 'ensinoFundamental', label: 'Ensino Fundamental 1' },
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private snackbarErrorService: SnackbarErrorService, private router: Router) { }

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
    if (this.form.valid) {
      this.showSuccessMessage();
    } else {
      this.errorMessage();
    }
  }

  showSuccessMessage():void {
    this.snackBar.open('Turma cadastrada com sucesso!', '', {
      duration: 3000,
      panelClass: ['sucess-snackbar'],
      horizontalPosition: 'right',
    });

    setTimeout(() => {
      this.router.navigate(['/admin-screen'])
    }, 3500);
  }

  errorMessage():void {
    this.snackbarErrorService.showErrorMessage(
      'Turma já existe',
      'Verifique as informações digitadas ou cadastre novos dados'
    );
  }
}
