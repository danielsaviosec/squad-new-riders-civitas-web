import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ISidebarIconsMobile } from 'src/app/interface';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-menu-hamburguer',
  templateUrl: './menu-hamburguer.component.html',
  styleUrls: ['./menu-hamburguer.component.scss']
})

export class MenuHamburguerComponent {
  isMenuOpen = false;

  @Input() menuIconsMobile: ISidebarIconsMobile[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
  }
}
