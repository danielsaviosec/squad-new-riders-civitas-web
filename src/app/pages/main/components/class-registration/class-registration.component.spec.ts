import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRegistrationComponent } from './class-registration.component';

describe('ClassRegistrationComponent', () => {
  let component: ClassRegistrationComponent;
  let fixture: ComponentFixture<ClassRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassRegistrationComponent]
    });
    fixture = TestBed.createComponent(ClassRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
