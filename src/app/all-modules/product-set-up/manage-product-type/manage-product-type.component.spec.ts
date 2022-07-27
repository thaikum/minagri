import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductTypeComponent } from './manage-product-type.component';

describe('ManageProductTypeComponent', () => {
  let component: ManageProductTypeComponent;
  let fixture: ComponentFixture<ManageProductTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
