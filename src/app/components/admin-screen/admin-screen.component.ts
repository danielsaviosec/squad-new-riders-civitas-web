import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ISidebarIcons, IAdminScreenCard } from 'src/app/interface';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent {
  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
    { name: "Professores", image: 'assets/icons-sidebar/professores.svg', route: 'main/teacher-list' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route: 'main/student-list' }
  ];

  cardsAdmin: IAdminScreenCard[] = [
    { title: 'Cadastrar Turmas', image: 'assets/admin-screen-cards/cadastro.jpg', route: 'main/class-registration' },
    { title: 'Cadastrar Estudantes', image: 'assets/admin-screen-cards/cadastro.jpg', route: 'main/student-registration' },
    { title: 'Cadastrar Professores', image: 'assets/admin-screen-cards/cadastro.jpg', route: 'main/teacher-registration' },
  ];

  constructor(private router: Router) { }

  // ======================================
  //Direcionamento do botão de "Acesse aqui".
  intoToVideo(): void {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_self');
  }

  //Direcionamento do botão dos cards para as páginas de cadastros.
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
