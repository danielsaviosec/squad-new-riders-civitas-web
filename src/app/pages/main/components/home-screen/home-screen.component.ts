import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
  }
}
