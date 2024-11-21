import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.scss']
})
export class SelectProfileComponent {
  constructor(private router: Router) {}

  navigateTo(profile: string) {
    this.router.navigate([`/auth/${profile}`]);
  }
}
