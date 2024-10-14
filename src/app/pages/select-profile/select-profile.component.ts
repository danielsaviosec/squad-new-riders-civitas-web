import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from 'src/app/components/button/button.component';

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.scss'],
  standalone: true,
  imports: [MatButtonModule, ButtonComponent]
})
export class SelectProfileComponent {
  constructor(private router: Router) {}

  navigateTo(profile: string) {
    this.router.navigate([`/login/${profile}`]);
  }
}
