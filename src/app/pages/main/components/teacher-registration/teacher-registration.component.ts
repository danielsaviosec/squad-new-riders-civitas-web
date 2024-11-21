import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/service/classes/classes.service';
import { TeacherService } from 'src/app/service/teachers/teachers.service';

import { TeacherRegistrationData } from 'src/app/interface/register/TeacherRegistrationData.interface';
import { ClassesResponse } from 'src/app/interface/response/ClassesResponse.interface';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.scss']
})
export class TeacherRegistrationComponent implements OnInit {
  form!: FormGroup;
  turmaOptions: ClassesResponse[] = []; // Variável para armazenar as turmas
  isLoading = true; // Variável para controlar o carregamento

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private snackbarErrorService: SnackbarErrorService,
    private router: Router,
    private classService: ClassService, // Injeta o serviço
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
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

    // Chama o serviço para buscar as turmas
    this.classService.getClasses().subscribe(
      (data: ClassesResponse[]) => {
        // Armazena o array de turmas para uso no template
        this.turmaOptions = data;
        this.isLoading = false; // Desativa o carregamento após receber os dados
      },
      (error) => {
        console.error('Erro ao buscar as turmas:', error);
        this.isLoading = false; // Desativa o carregamento após receber os dados
      }
    );
  }

  //=================================
  //Botão voltar
  goBack(): void {
    this.router.navigate(['/admin-screen'])
  }

  onSubmit(): void {
    if (this.form.valid) {
      const teacherData: TeacherRegistrationData = {
        fullName: this.form.value.nome,
        cpf: this.form.value.cpf,
        registrationNumber: this.form.value.matricula,
        classes: this.form.value.turma
      };

      this.teacherService.registerTeacher(teacherData).subscribe(
        () => {
          this.showSuccessMessage();
        },
        (error) => {
          console.error('Erro ao cadastrar professor:', error);
          this.errorMessage();
        }
      );
    } else {
      this.errorMessage();
    }
  }

  showSuccessMessage(): void {
    this.snackBar.open('Professor(a) cadastrado com sucesso!', '', {
      duration: 3000,
      panelClass: ['sucess-snackbar'],
      horizontalPosition: 'right',
    });

    setTimeout(() => {
      this.router.navigate(['/admin-screen'])
    }, 3500);
  }

  errorMessage(): void {
    this.snackbarErrorService.showErrorMessage(
      'Erro ao cadastrar professor',
      'Verifique os dados e tente novamente.'
    );
  }
}
