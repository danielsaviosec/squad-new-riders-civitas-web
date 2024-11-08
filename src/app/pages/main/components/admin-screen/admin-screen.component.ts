import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IAdminScreenCard, ILogo } from 'src/app/interface';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})

export class AdminScreenComponent {

  logoDesktop: ILogo[] = [
    { name: "Logo Civitas", image: 'assets/civitas-logos/logo_civitas_sem_fundo.webp' }
  ];

  logoMobile: ILogo[] = [
    { name: "Civitas - logo em azul com escrita em preto", image: 'assets/civitas-logos/logo_completo_horizontal_civitas.webp' }
  ]

  cardsAdmin: IAdminScreenCard[] = [
    { title: 'Cadastrar Turmas', image: 'assets/admin-screen-cards/cadastro.jpg' }
  ];

  constructor(private router: Router) { }

// ======================================
//Direcionamento do botão de "Cadastrar Turmas" para a página de cadastro.
  intoToClassRegistration():void {
    this.router.navigate(['/main/class-registration']);
  }
}
