import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ILogo } from 'src/app/interface';
import { ISidebarIcons } from 'src/app/interface/ISidebarIcons.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  logoDesktop: ILogo[] = [
    { name: "Logo Civitas", image: 'assets/civitas-logos/logo_civitas_sem_fundo.webp' }
  ];

  logoMobile: ILogo[] = [
    { name: "Civitas - logo em azul com escrita em preto", image: 'assets/civitas-logos/logo_completo_horizontal_civitas.webp' }
  ]

  @Input() menuIcons: ISidebarIcons[] = [];

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/select-profile'])
  }
}
