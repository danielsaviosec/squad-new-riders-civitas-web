import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginGuardianComponent } from './login-guardian.component';

describe('LoginGuardianComponent', () => {
  let component: LoginGuardianComponent;
  let fixture: ComponentFixture<LoginGuardianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginGuardianComponent]
    });
    fixture = TestBed.createComponent(LoginGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
