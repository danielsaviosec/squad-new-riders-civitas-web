import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeacherComponent } from './home-teacher.component';

describe('HomeTeacherComponent', () => {
  let component: HomeTeacherComponent;
  let fixture: ComponentFixture<HomeTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTeacherComponent]
    });
    fixture = TestBed.createComponent(HomeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
