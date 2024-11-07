import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (route.routeConfig?.path === 'auth' && isAuthenticated) {
      // Se autenticado e tentando acessar 'auth', redireciona para 'main'
      this.router.navigate(['/main']);
      return false;
    }

    if (route.routeConfig?.path === 'main' && !isAuthenticated) {
      // Se não autenticado e tentando acessar 'main', redireciona para 'auth'
      this.router.navigate(['/auth']);
      return false;
    }

    // Permite o acesso caso as condições acima não sejam atendidas
    return true;
  }
}
