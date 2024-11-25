import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassListComponent } from './student-class-list.component';

describe('StudentClassListComponent', () => {
  let component: StudentClassListComponent;
  let fixture: ComponentFixture<StudentClassListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentClassListComponent]
    });
    fixture = TestBed.createComponent(StudentClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
