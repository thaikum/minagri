import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMonitoringComponent } from './contract-monitoring.component';

describe('ContractMonitoringComponent', () => {
  let component: ContractMonitoringComponent;
  let fixture: ComponentFixture<ContractMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
