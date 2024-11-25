import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question, QuestionOption } from 'src/app/interface/register/FormRegistration.interface';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})

export class FormRegistrationComponent implements OnInit {
  form!: FormGroup;
  textTeacher: string = '';

  questions: Question[] = [
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

  options: QuestionOption[] = [
    { value: 'discordoTotalmente', text: 'Discordo totalmente' },
    { value: 'discordo', text: 'Discordo' },
    { value: 'neutro', text: 'Neutro' },
    { value: 'concordo', text: 'Concordo' },
    { value: 'concordoTotalmente', text: 'Concordo totalmente' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const formControls: { [key: string]: any } = {};
    this.questions.forEach(question => {
      formControls[question.id] = ['', Validators.required];
    });
    formControls['textTeacher'] = ['', Validators.required];

    this.form = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        textTeacher: this.form.get('textTeacher')?.value
      };
      //lógica para enviar os dados para o back
    }
  }

  private handleSuccess(): void {
    this._snackBar.open('PDI registrado com sucesso!', '', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });

    setTimeout(() => {
      this.router.navigate(['/'])
    }, 3500);
  }

  goBack():void {
    this.router.navigate(['/'])
  }
}
