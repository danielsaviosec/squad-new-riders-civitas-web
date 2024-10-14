import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrls: ['./tela-admin.component.scss']
})

export class TelaAdminComponent {
  icon = [
    { title: "logo", logo: 'assets/logo_civitas_sem_fundo.webp' }
  ];

  iconMobile = [
    { titleMobile: "Civitas - logo escrito em branco", logoMobile: 'assets/logo_civitas_azul_roxo.webp' }
  ]

  intro = [
    { first: 'Prazer, somos o Civitas!' },
    { second: 'Vamos juntos nessa missão de desenvolver nossos estudantes para que desenvolvam habilidades comportamentais importantes para o dia a dia da vida deles.' },
    { third: 'Nosso primeiro passo é o cadastro de informações necessárias para que os usuários sejam registrados para que acessem à plataforma.' },
    { fourth: 'Vamos lá?' }
  ]

  cardClass = [
    { title: 'Cadastrar Turmas', image: 'assets/cadastro.jpg' }
  ];

  constructor(private router: Router) { }

}
