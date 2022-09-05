import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviterEmployeComponent } from './inviter-employe.component';

describe('InviterEmployeComponent', () => {
  let component: InviterEmployeComponent;
  let fixture: ComponentFixture<InviterEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviterEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviterEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
