import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyagesSimilairesComponent } from './voyages-similaires.component';

describe('VoyagesSimilairesComponent', () => {
  let component: VoyagesSimilairesComponent;
  let fixture: ComponentFixture<VoyagesSimilairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyagesSimilairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyagesSimilairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
