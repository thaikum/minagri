import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropCutsComponent } from './crop-cuts.component';

describe('CropCutsComponent', () => {
  let component: CropCutsComponent;
  let fixture: ComponentFixture<CropCutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropCutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropCutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
