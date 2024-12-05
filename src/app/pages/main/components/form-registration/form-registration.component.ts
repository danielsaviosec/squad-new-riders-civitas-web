import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { AdiService } from 'src/app/service/adi/adi.service';
import { finalize } from 'rxjs';

import { IQuestion, IQuestionOption } from 'src/app/interface/register/IFormRegistration.interface';
import { CreateResponse } from 'src/app/interface/response/CreateResponse.interface';
import { IAdiRegistrationData } from 'src/app/interface/register/IAdiRegistrationData.interface';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})

export class FormRegistrationComponent implements OnInit {
  form!: FormGroup;
  textTeacher: string = '';
  hasError: boolean = false;

  questions: IQuestion[] = [
    {
      id: 'autoconhecimento',
      title: 'Autoconhecimento',
      description: 'Habilidades como reconhecer e gerenciar emoções, lidar com frustrações, e desenvolver resiliência emocional são essenciais para o desenvolvimento de uma personalidade equilibrada.'
    },
    {
      id: 'empatia',
      title: 'Empatia',
      description: 'A capacidade de se colocar no lugar do outro, entender diferentes perspectivas e emoções é fundamental para a convivência em sociedade e para construir relacionamentos saudáveis.'
    },
    {
      id: 'comunicacao',
      title: 'Comunicação',
      description: 'Habilidades de expressão verbal e não-verbal, escuta ativa, e assertividade são indispensáveis para a construção de relacionamentos e a resolução de conflitos de forma pacífica.'
    },
    {
      id: 'trabalhoEquipe',
      title: 'Trabalho em equipe',
      description: 'Promover a cooperação e o espírito de equipe desde cedo ajuda a criança a entender a importância de trabalhar em conjunto para atingir objetivos comuns.'
    },
    {
      id: 'autonomia',
      title: 'Autonomia',
      description: 'Ensinar a importância de ser responsável por suas ações e decisões, além de promover a autossuficiência em tarefas adequadas à idade.'
    },
  ];

  options: IQuestionOption[] = [
    { value: 'discordoTotalmente', text: 'Discordo totalmente', grade: 1 },
    { value: 'discordo', text: 'Discordo', grade: 2 },
    { value: 'neutro', text: 'Neutro', grade: 3 },
    { value: 'concordo', text: 'Concordo', grade: 4 },
    { value: 'concordoTotalmente', text: 'Concordo totalmente', grade: 5 }
  ];

  private studentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarErrorService: SnackbarErrorService,
    private _snackBar: MatSnackBar,
    private adiService: AdiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['id'] || null;
    });

    const formControls: { [key: string]: any } = {};
    this.questions.forEach(question => {
      formControls[question.id] = ['', Validators.required];
    });
    formControls['textTeacher'] = ['', Validators.required];

    this.form = this.fb.group(formControls);
  }

  onSubmit(): void {

    // Validação de campos preenchidos
    if (this.form.invalid) {
        this.hasError = true;

        // Ocultar a mensagem após 5 segundos
        setTimeout(() => {
          this.hasError = false;
        }, 5000);

        return;
    }

    if (this.form.valid && this.studentId !== null) {
      this.form.markAsPending();
      const requestData: IAdiRegistrationData = this.mapFormToRequest();

      this.adiService.registerAdi(requestData)
      .pipe(
        finalize(() => {
          this.form.updateValueAndValidity();
        })
      )
      .subscribe({
        next: (response) => this.handleSuccess(response),
        error: (data) => this.handleError(data?.error)
      })
    }
  }

  private mapFormToRequest(): IAdiRegistrationData {
    const formValues = this.form.value;

    return {
      studentId: this.studentId!,
      selfAwareness: this.mapToGrade(formValues['autoconhecimento']),
      empathy: this.mapToGrade(formValues['empatia']),
      communication: this.mapToGrade(formValues['comunicacao']),
      teamwork: this.mapToGrade(formValues['trabalhoEquipe']),
      autonomy: this.mapToGrade(formValues['autonomia']),
      teacherComments: formValues['textTeacher'],
    };
  }

  private mapToGrade(value: string): number {
    const option = this.options.find(opt => opt.value === value);
    return option ? option.grade : 0;
  }

  private handleSuccess(response: CreateResponse) {
    this._snackBar.open('ADI registrado com sucesso!', '', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });

    setTimeout(() => {
      this.router.navigate([`/main/adi-details/${response?.id}`])
    }, 3500);
  }

  handleError(error: CreateResponse):void {
    const errorMessage: string = error?.message || "Erro ao atualizar turma. Tente novamente."
    this.snackbarErrorService.showErrorMessage(
      errorMessage,
      'Verifique as informações digitadas ou cadastre novos dados'
    );
  }

  goBack(): void {
    this.router.navigate(['/'])
  }
}
