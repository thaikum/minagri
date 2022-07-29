import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeatherDataComponent } from './add-weather-data.component';

describe('AddWeatherDataComponent', () => {
  let component: AddWeatherDataComponent;
  let fixture: ComponentFixture<AddWeatherDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWeatherDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeatherDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
