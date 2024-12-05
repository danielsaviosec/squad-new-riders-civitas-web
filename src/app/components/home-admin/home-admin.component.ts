import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISidebarIcons, IAdminScreenCard, ISidebarIconsMobile } from 'src/app/interface';
import { DecodedToken } from 'src/app/interface/auth/DecodedToken.interface';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  user!: DecodedToken;

  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
    { name: "Psicólogos", image: 'assets/icons-sidebar/professores.svg', route: 'main/teacher-list' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route: 'main/student-list' }
  ];

  menuIconsMobile: ISidebarIconsMobile[] = [
    { name: "Início", route: 'main' },
    { name: "Turmas", route: 'main/class-list' },
    { name: "Psicólogos", route: 'main/teacher-list' },
    { name: "Estudantes", route: 'main/student-list' }
  ]

  cardsAdmin: IAdminScreenCard[] = [
    { title: 'Cadastrar Turmas', image: 'assets/admin-screen-cards/cadastro-turmas.png', route: 'main/class-registration' },
    { title: 'Cadastrar Estudantes', image: 'assets/admin-screen-cards/cadastro-estudantes.png', route: 'main/student-registration' },
    { title: 'Cadastrar Psicólogos', image: 'assets/admin-screen-cards/cadastro-professores.png', route: 'main/teacher-registration' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("@civitas:user") || 'null');
  }

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
