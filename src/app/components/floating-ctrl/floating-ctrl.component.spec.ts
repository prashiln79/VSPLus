import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingCtrlComponent } from './floating-ctrl.component';

describe('FloatingCtrlComponent', () => {
  let component: FloatingCtrlComponent;
  let fixture: ComponentFixture<FloatingCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingCtrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
