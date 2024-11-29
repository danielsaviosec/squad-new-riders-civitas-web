import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecodedToken } from 'src/app/interface/auth/DecodedToken.interface';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  userRole: string | null = null;
  user!: DecodedToken;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("@civitas:user") || 'null');
    this.userRole = this.authService.getRole();

    if(this.userRole === 'guardian') {
      this.router.navigate([`/main/class/${this.user.classId}/student-adi/${this.user.studentId}`]);
    }
  }
}
