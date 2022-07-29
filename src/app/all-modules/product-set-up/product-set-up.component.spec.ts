import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSetUpComponent } from './product-set-up.component';

describe('ProductSetUpComponent', () => {
  let component: ProductSetUpComponent;
  let fixture: ComponentFixture<ProductSetUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSetUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
