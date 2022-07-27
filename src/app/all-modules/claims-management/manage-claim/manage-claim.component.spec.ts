import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClaimComponent } from './manage-claim.component';

describe('ManageClaimComponent', () => {
  let component: ManageClaimComponent;
  let fixture: ComponentFixture<ManageClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
