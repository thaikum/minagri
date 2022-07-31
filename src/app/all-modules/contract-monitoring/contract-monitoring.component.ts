import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-contract-monitoring',
  templateUrl: './contract-monitoring.component.html',
  styleUrls: ['./contract-monitoring.component.css']
})
export class ContractMonitoringComponent implements OnInit {

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

}
