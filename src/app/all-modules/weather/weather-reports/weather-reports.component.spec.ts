import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherReportsComponent } from './weather-reports.component';

describe('WeatherReportsComponent', () => {
  let component: WeatherReportsComponent;
  let fixture: ComponentFixture<WeatherReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
