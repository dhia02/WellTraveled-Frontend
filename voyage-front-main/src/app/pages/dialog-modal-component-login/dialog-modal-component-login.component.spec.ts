import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalComponentLoginComponent } from './dialog-modal-component-login.component';

describe('DialogModalComponentLoginComponent', () => {
  let component: DialogModalComponentLoginComponent;
  let fixture: ComponentFixture<DialogModalComponentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModalComponentLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalComponentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
