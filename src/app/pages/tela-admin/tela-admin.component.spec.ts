import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAdminComponent } from './tela-admin.component';

describe('TelaAdminComponent', () => {
  let component: TelaAdminComponent;
  let fixture: ComponentFixture<TelaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaAdminComponent]
    });
    fixture = TestBed.createComponent(TelaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
