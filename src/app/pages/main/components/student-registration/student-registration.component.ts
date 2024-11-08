import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorService } from 'src/app/components/snackbar-error/snackbar-error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private snackbarErrorService: SnackbarErrorService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required, Validators.maxLength(50)],
      matricula: ['', Validators.required, Validators.maxLength(20)],
      turma: ['', Validators.required],
      cpfResponsavel: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), Validators.maxLength(14)]],
      cpfOrRg: ['', [Validators.required, this.cpfOrRgValidator, Validators.maxLength(14)]]
    });
  }

  /** cpfOuRgValidator
 * Validador para verificar se o valor de entrada é CPF ou RG válido.
 * 
 * Esta função verifica se o valor de um campo corresponde ao formato esperado de um CPF ou de um RG (variando de 7 a 14 dígitos, com ou sem pontos e hífen).
 * Se o valor corresponder a um dos formatos, a função retorna "null", indicando que o valor é válido.
 * Caso contrário, ela retorna um objeto de erro { invalidCpfOrRg: true }.
 *
 * Estrutura dos Padrões de Regex
 * - CPF: O formato 000.000.000-00 é esperado, onde cada 0(zero) representa um dígito numérico.
 * - RG: Permite uma sequência de 7 a 14 dígitos, separada por pontos e/ou hífen, dependendo das variações regionais dos estados brasileiros.
 * 
 * @param control O controle do formulário a ser validado.
 * @returns "null" se o valor é um CPF ou RG válido; caso contrário, retorna { invalidCpfOrRg: true }.
 */

  cpfOrRgValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    const rgRegex = /^(\d{1,2}\.?\d{3}\.?\d{3}-?\d{1,2}|\d{7,14})$/;

    if (cpfRegex.test(value) || rgRegex.test(value)) {
      return null;
    }

    return { invalidCpfOrRg: true };
  }

  //=================================
  //Botão voltar 
  goBack(): void {
    this.router.navigate(['/admin-screen'])
  }

  //Snackbar de sucesso se tudo for válido, e Snackbar de erro caso informação for inválida
  onSubmit(): void {
    if (this.form.valid) {
      this.showSuccessMessage()
    } else {
      this.errorMessage();
    }
  }

  //Snackbar de sucesso
  showSuccessMessage(): void {
    this.snackBar.open('Estudante cadastrado com sucesso!', '', {
      duration: 3000,
      panelClass: ['sucess-snackbar'],
      horizontalPosition: 'right',
    });

    setTimeout(() => {
      this.router.navigate(['/admin-screen'])
    }, 3500);
  }

  //Snackbar de erro
  errorMessage(): void {
    this.snackbarErrorService.showErrorMessage(
      'Estudante já existe no cadastro',
      'Verifique as informações digitadas ou digite novas informações.'
    );
  }
}
