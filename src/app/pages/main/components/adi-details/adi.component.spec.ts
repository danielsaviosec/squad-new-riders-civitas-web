import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdiComponent } from './adi.component';

describe('AdiComponent', () => {
  let component: AdiComponent;
  let fixture: ComponentFixture<AdiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdiComponent]
    });
    fixture = TestBed.createComponent(AdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
