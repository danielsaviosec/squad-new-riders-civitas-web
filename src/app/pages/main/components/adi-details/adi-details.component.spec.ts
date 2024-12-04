import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdiDetailsComponent } from './adi-details.component';

describe('AdiDetailsComponent', () => {
  let component: AdiDetailsComponent;
  let fixture: ComponentFixture<AdiDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdiDetailsComponent]
    });
    fixture = TestBed.createComponent(AdiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
