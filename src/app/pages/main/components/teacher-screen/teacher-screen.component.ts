import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ISidebarIcons } from 'src/app/interface';

@Component({
  selector: 'app-teacher-screen',
  templateUrl: './teacher-screen.component.html',
  styleUrls: ['./teacher-screen.component.scss']
})
export class TeacherScreenComponent {
  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main/teacher-screen' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
  ];

  constructor(private router: Router) { }

  /**greeting
   *
   * Retorna uma saudação apropriada com base no horário do dispositivo do usuário.
   *
   * Bom dia: entre as 5h até as 11h59
   * Boa tarde: entre 12h até as 17h59
   * Boa noite: entre 18h até as 4h59
   *
   * @returns string: uma saudação conforme o horário do usuário ao acessar a página.
   *
   */

  get greeting(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Bom dia"
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde"
    } else {
      return "Boa noite"
    }
  }

  //Direcionamento do botão de "Buscar Turmas" para a página de turmas.
  intoToListingClasses(): void {
    this.router.navigate(['main/class-list']);
  }
}
