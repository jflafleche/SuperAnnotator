import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasCtrlComponent } from './canvas-ctrl.component';

describe('CanvasCtrlComponent', () => {
  let component: CanvasCtrlComponent;
  let fixture: ComponentFixture<CanvasCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
