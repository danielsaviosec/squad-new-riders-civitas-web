import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISidebarIcons } from 'src/app/interface';
import { ITeacherResponse } from 'src/app/interface/response/ITeacherResponse.interface';
import { TeacherService } from 'src/app/service/teachers/teachers.service';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.scss']
})
export class HomeTeacherComponent implements OnInit {
  teacher!: ITeacherResponse;
  isLoading: boolean = false;

  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main/teacher-screen' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
  ];

  constructor(private router: Router, private teacherService: TeacherService) { }

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

  ngOnInit(): void {
    this.isLoading = true;

    this.teacherService.getTeacherByToken().subscribe(
      (data) => {
        this.teacher = data;
        this.isLoading = false;
      },
      (error) => {
        console.error("Erro ao carregar professor:", error);
        this.isLoading = false;
      }
    );
  }

  //Direcionamento do botão de "Buscar Turmas" para a página de turmas.
  intoToListingClasses(): void {
    this.router.navigate(['main/class-list']);
  }
}
